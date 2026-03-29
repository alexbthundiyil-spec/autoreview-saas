import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Retrieve metadata passed during checkout creation
        const installationId = session.metadata?.github_installation_id;
        const planTier = session.metadata?.plan_tier as 'pro' | 'team';
        
        if (installationId && planTier) {
          // Update the organization in Supabase to their new paid tier
          const { error } = await supabase
            .from("organizations")
            .update({
              plan_tier: planTier,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
            })
            .eq("github_installation_id", parseInt(installationId));
            
          if (error) throw new Error(`Failed to update organization tier: ${error.message}`);
          console.log(`Successfully upgraded installation ${installationId} to ${planTier}`);
        }
        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Downgrade the user back to the free tier
        const { error } = await supabase
          .from("organizations")
          .update({
            plan_tier: 'free',
            stripe_subscription_id: null,
          })
          .eq("stripe_subscription_id", subscription.id);
          
        if (error) throw new Error(`Failed to downgrade organization: ${error.message}`);
        console.log(`Successfully downgraded subscription ${subscription.id} to free tier`);
        break;
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error(`Webhook processing failed:`, error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

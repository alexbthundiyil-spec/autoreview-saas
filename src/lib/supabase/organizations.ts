import { supabase } from './client';

export type PlanTier = 'free' | 'pro' | 'team';

export interface Organization {
  id: string;
  github_installation_id: number;
  github_account_login: string;
  plan_tier: PlanTier;
  reviews_used_this_month: number;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
}

const LIMITS = {
  free: 5,
  pro: 100,
  team: 999999, // Unlimited essentially
};

export async function getOrCreateOrganization(installationId: number, login: string): Promise<Organization> {
  // Try to fetch existing
  const { data: existing, error: fetchError } = await supabase
    .from('organizations')
    .select('*')
    .eq('github_installation_id', installationId)
    .single();

  if (existing && !fetchError) return existing as Organization;

  // Create new if it doesn't exist
  const { data: newOrg, error: insertError } = await supabase
    .from('organizations')
    .insert({
      github_installation_id: installationId,
      github_account_login: login,
      plan_tier: 'free',
      reviews_used_this_month: 0,
    })
    .select()
    .single();

  if (insertError) throw new Error(`Failed to create organization: ${insertError.message}`);
  return newOrg as Organization;
}

export async function canReviewPR(organization: Organization): Promise<boolean> {
  const limit = LIMITS[organization.plan_tier] || LIMITS.free;
  return organization.reviews_used_this_month < limit;
}

export async function incrementReviewCount(organizationId: string): Promise<void> {
  // Execute an RPC or direct update to atomically increment the counter
  const { error } = await supabase.rpc('increment_review_count', { org_id: organizationId });
  
  if (error) {
    // Fallback if RPC isn't configured
    const { data } = await supabase.from('organizations').select('reviews_used_this_month').eq('id', organizationId).single();
    if (data) {
      await supabase
        .from('organizations')
        .update({ reviews_used_this_month: data.reviews_used_this_month + 1 })
        .eq('id', organizationId);
    }
  }
}

export async function logReview(organizationId: string, repo: string, prNumber: number, status: string, tokens: number = 0): Promise<void> {
  await supabase.from('review_logs').insert({
    organization_id: organizationId,
    repo_full_name: repo,
    pull_request_number: prNumber,
    review_status: status,
    token_usage: tokens
  });
}

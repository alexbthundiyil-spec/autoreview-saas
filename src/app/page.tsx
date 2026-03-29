import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navigation */}
      <header className="w-full px-8 py-6 flex justify-between items-center bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="font-bold text-xl text-gray-900">AutoReview</span>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</Link>
          <Link href="#docs" className="text-gray-600 hover:text-gray-900 font-medium">Docs</Link>
        </nav>
        <Link 
          href="/dashboard" 
          className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          Go to Dashboard
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight max-w-4xl leading-tight">
          Your Senior Engineer, <span className="text-blue-600">Automated.</span>
        </h1>
        <p className="mt-8 text-xl text-gray-600 max-w-2xl leading-relaxed">
          Stop rubber-stamping PRs. AutoReview automatically analyzes your GitHub Pull Requests using Claude 3.7 Sonnet to catch security flaws, N+1 queries, and logic bugs before human review.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link 
            href="/install" 
            className="px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all text-lg shadow-xl hover:shadow-2xl"
          >
            Install GitHub App
          </Link>
          <Link 
            href="#demo" 
            className="px-8 py-4 bg-white text-gray-900 border border-gray-300 font-bold rounded-lg hover:bg-gray-50 transition-all text-lg"
          >
            View Live Demo
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500 font-medium">
          Free for open-source. Install in 2 minutes.
        </p>
      </main>

      {/* Value Prop Section */}
      <section className="bg-white py-24 px-8 border-t border-gray-200" id="features">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold">⚡</div>
            <h3 className="text-xl font-bold text-gray-900">Instant Feedback</h3>
            <p className="text-gray-600 leading-relaxed">Reviews are posted directly to your PR thread within seconds of opening. No more waiting days for a colleague to find the time.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl font-bold">🛡️</div>
            <h3 className="text-xl font-bold text-gray-900">Security First</h3>
            <p className="text-gray-600 leading-relaxed">Trained to specifically hunt for SQL injections, XSS vulnerabilities, and exposed secrets that standard linters miss.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl font-bold">📈</div>
            <h3 className="text-xl font-bold text-gray-900">Zero Configuration</h3>
            <p className="text-gray-600 leading-relaxed">Just install the GitHub app. No complex YAML files, no CI/CD pipeline modifications required. It just works.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-24 px-8" id="pricing">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, predictable pricing</h2>
          <p className="text-gray-600 mb-12 text-lg">Pay only for the reviews you use. Scale up when you need to.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            {/* Free Tier */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Starter</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-500 font-medium">/ month</span>
              </div>
              <ul className="mt-8 space-y-4 text-gray-600">
                <li className="flex items-center gap-3">✅ 5 PR reviews per month</li>
                <li className="flex items-center gap-3">✅ Public repositories only</li>
                <li className="flex items-center gap-3">✅ Basic Markdown output</li>
              </ul>
              <Link href="/install" className="mt-8 block w-full py-3 px-4 bg-gray-100 text-gray-900 text-center font-bold rounded-lg hover:bg-gray-200 transition-colors">
                Start for Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-blue-600 p-8 rounded-2xl shadow-xl border border-blue-500 relative transform md:-translate-y-4">
              <div className="absolute top-0 right-8 transform -translate-y-1/2">
                <span className="bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Pro</h3>
              <div className="mt-4 flex items-baseline gap-2 text-white">
                <span className="text-4xl font-extrabold">$19</span>
                <span className="text-blue-200 font-medium">/ month</span>
              </div>
              <ul className="mt-8 space-y-4 text-blue-50">
                <li className="flex items-center gap-3">✅ 100 PR reviews per month</li>
                <li className="flex items-center gap-3">✅ Private & Public repositories</li>
                <li className="flex items-center gap-3">✅ Deep logic analysis</li>
                <li className="flex items-center gap-3">✅ Priority email support</li>
              </ul>
              <Link href="/checkout/pro" className="mt-8 block w-full py-3 px-4 bg-white text-blue-600 text-center font-bold rounded-lg hover:bg-gray-50 transition-colors">
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-center text-gray-400 border-t border-gray-800 mt-auto">
        <p>© 2026 AutoReview. Built by AI.</p>
      </footer>
    </div>
  );
}

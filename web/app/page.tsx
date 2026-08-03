import Link from "next/link";
import Footer from "@/components/footer";
import ThemeToggle from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 border-b bg-card flex items-center justify-between px-6">
        <Link href="/" className="font-heading font-bold text-lg text-primary flex items-center gap-2">
          <img src="/logo-light.svg" className="h-8 w-8 block dark:hidden rounded-md" alt="GeneScope AI" />
          <img src="/logo-dark.svg" className="h-8 w-8 hidden dark:block rounded-md" alt="GeneScope AI" />
          GeneScope AI
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/screening"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started &rarr;
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="px-6 py-20 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <img src="/logo-light.svg" className="block dark:hidden h-10" alt="GeneScope AI" />
            <img src="/logo-dark.svg" className="hidden dark:block h-10" alt="GeneScope AI" />
          </div>
          <h1 className="text-4xl font-bold font-heading text-foreground">
            Understand your genetic risk, explained clearly
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Private, explainable AI screening — never a replacement for your doctor.
          </p>
          <div className="mt-8">
            <Link
              href="/screening"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 text-base font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              Start Free Screening
            </Link>
          </div>
        </section>

        <section className="px-6 py-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-card border transition-all hover:shadow-md hover:-translate-y-0.5">
            <h3 className="font-semibold font-heading">1. Answer</h3>
            <p className="text-sm text-muted-foreground mt-2">A few quick questions about your health.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border transition-all hover:shadow-md hover:-translate-y-0.5">
            <h3 className="font-semibold font-heading">2. AI Analyzes</h3>
            <p className="text-sm text-muted-foreground mt-2">A trained model screens for risk patterns.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border transition-all hover:shadow-md hover:-translate-y-0.5">
            <h3 className="font-semibold font-heading">3. Understand Why</h3>
            <p className="text-sm text-muted-foreground mt-2">See exactly which factors mattered most.</p>
          </div>
        </section>

        <section className="px-6 py-4 text-center flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/assistant"
            className="inline-flex items-center justify-center rounded-lg border bg-background hover:bg-muted px-4 py-2 text-sm font-medium transition-colors"
          >
            Try the AI Assistant
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg border bg-background hover:bg-muted px-4 py-2 text-sm font-medium transition-colors"
          >
            View Dashboard
          </Link>
        </section>

        <section className="px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            GeneScope AI is a screening demonstration, not a diagnostic tool. Always consult a doctor for medical advice.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
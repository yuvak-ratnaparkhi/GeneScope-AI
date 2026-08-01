export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 py-24 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold font-heading text-foreground">
          Understand your genetic risk, explained clearly
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Private, explainable AI screening — never a replacement for your doctor.
        </p>
      </section>

      <section className="px-6 py-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-card border transition-all hover:shadow-md hover:-translate-y-0.5">
          <h3 className="font-semibold font-heading">1. Answer</h3>
          <p className="text-sm text-muted-foreground mt-2">A few quick questions about your health.</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border transition-all hover:shadow-md hover:-translate-y-0.5">
          <h3 className="font-semibold font-heading">2. AI Analyzes</h3>
          <p className="text-sm text-muted-foreground mt-2">A trained model screens for risk patterns.</p>
        </div>
        <div className="p-6 rounded-2 xl bg-card border transition-all hover:shadow-md hover:-translate-y-0.5">
          <h3 className="font-semibold font-heading">3. Understand Why</h3>
          <p className="text-sm text-muted-foreground mt-2">See exactly which factors mattered most.</p>
        </div>
      </section>

      <section className="px-6 py-10 text-center">
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          GeneScope AI is a screening demonstration, not a diagnostic tool. Always consult a doctor for medical advice.
        </p>
      </section>
    </main>
  );
}
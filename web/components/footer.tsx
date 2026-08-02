import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-card text-muted-foreground py-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 text-sm">
        {/* Left section */}
        <div className="max-w-sm">
          <h3 className="font-heading font-bold text-foreground text-base">GeneScope AI</h3>
          <p className="mt-2 text-xs leading-relaxed">
            Explainable AI screening for genetic disorder risk.
          </p>
        </div>

        {/* Right section columns */}
        <div className="flex flex-wrap gap-12 sm:gap-16">
          {/* Product column */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">Product</h4>
            <Link href="/screening" className="hover:text-foreground transition-colors text-xs">
              Screening
            </Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors text-xs">
              Dashboard
            </Link>
            <Link href="/assistant" className="hover:text-foreground transition-colors text-xs">
              AI Assistant
            </Link>
          </div>

          {/* Connect column */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">Connect</h4>
            <a
              href="https://github.com/yuvak-ratnaparkhi/GeneScope-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-2 text-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Repository
            </a>
            <a
              href="https://www.linkedin.com/in/yuvak-ratnaparkhi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-2 text-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              Yuvak Ratnaparkhi
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
        <p>© 2026 GeneScope AI · Educational project · Not a medical device</p>
      </div>
    </footer>
  );
}

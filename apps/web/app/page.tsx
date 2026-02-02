import type { Metadata } from "next"
import Link from "next/link"
import { GradientBackground } from "./components/GradientBackground"
import { AuthHeader } from "./components/AuthHeader"
import { FeatureCard } from "./components/FeatureCard"
import { CTASection } from "./components/CTASection"
import styles from "./styles/landing.module.css"

/**
 * Landing Page - Server Component
 *
 * Main landing page showcasing the microfrontend platform
 * with Neo-Brutalist design and Technical Stack focus.
 */
export default function HomePage() {
  return (
    <>
      <GradientBackground />
      <AuthHeader />

      <main className={styles.landingPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.badgeText}>v1.0 Now Available</span>
              </div>

              <h1 className={styles.heroTitle}>
                Build Scalable
                <br />
                <span className={styles.heroTitleGradient}>
                  Microfrontends
                </span>
              </h1>

              <p className={styles.heroSubtitle}>
                Modern platform built with{" "}
                <span className={styles.highlight}>Turborepo</span>,{" "}
                <span className={styles.highlight}>Better-Auth</span>, and{" "}
                <span className={styles.highlight}>Next.js 16</span>.
                Deploy independently, compose seamlessly.
              </p>

              <div className={styles.heroCTA}>
                <Link href="/signup" className={styles.btnPrimary}>
                  Get Started
                </Link>
                <Link href="/login" className={styles.btnSecondary}>
                  Sign In
                </Link>
              </div>

              {/* Decorative Code Block */}
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <span className={styles.codeDot} />
                  <span className={styles.codeDot} />
                  <span className={styles.codeDot} />
                </div>
                <pre className={styles.codeContent}>
                  <code>
                    {`# Create new microfrontend
bun run turbo gen mfe my-app

# Start all apps
bun run dev

# Access at localhost:3024
✓ Independent deployments
✓ Type-safe APIs
✓ Monorepo efficiency`}
                  </code>
                </pre>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className={styles.heroDecoration}>
              <div className={styles.decorationLine} />
              <div className={styles.decorationGrid}>
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={styles.gridCell} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Powered by Modern Tech
              </h2>
              <p className={styles.sectionSubtitle}>
                Built with the latest tools for maximum performance and developer experience
              </p>
            </div>

            <div className={styles.featuresGrid}>
              <FeatureCard
                icon={
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                title="Turborepo & Microfrontends"
                description="Monorepo efficiency with independent deployments. Each microfrontend can be developed, tested, and deployed independently while sharing code and configurations."
              />

              <FeatureCard
                icon={
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                title="Better-Auth Authentication"
                description="Type-safe, secure, modern authentication solution. Built specifically for TypeScript with excellent developer experience, session management, and OAuth support."
              />

              <FeatureCard
                icon={
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                title="Next.js 16 & React 19"
                description="Latest framework with App Router and Server Components. Enjoy superior performance, SEO optimization, and built-in data fetching with React Server Components."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.container}>
            <div className={styles.footerContent}>
              <div className={styles.footerBrand}>
                <span className={styles.footerLogo}>MFE.</span>
                <p className={styles.footerTagline}>
                  Modern microfrontend platform
                </p>
              </div>

              <div className={styles.footerLinks}>
                <div className={styles.footerSection}>
                  <h4 className={styles.footerSectionTitle}>Product</h4>
                  <Link href="/features" className={styles.footerLink}>
                    Features
                  </Link>
                  <Link href="/pricing" className={styles.footerLink}>
                    Pricing
                  </Link>
                  <Link href="/docs" className={styles.footerLink}>
                    Documentation
                  </Link>
                </div>

                <div className={styles.footerSection}>
                  <h4 className={styles.footerSectionTitle}>Company</h4>
                  <Link href="/about" className={styles.footerLink}>
                    About
                  </Link>
                  <Link href="/blog" className={styles.footerLink}>
                    Blog
                  </Link>
                  <Link href="/careers" className={styles.footerLink}>
                    Careers
                  </Link>
                </div>

                <div className={styles.footerSection}>
                  <h4 className={styles.footerSectionTitle}>Legal</h4>
                  <Link href="/privacy" className={styles.footerLink}>
                    Privacy
                  </Link>
                  <Link href="/terms" className={styles.footerLink}>
                    Terms
                  </Link>
                  <Link href="/license" className={styles.footerLink}>
                    License
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <p className={styles.footerCopyright}>
                © 2025 Microfrontend Platform. Built with Turborepo.
              </p>
              <div className={styles.footerSocial}>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="GitHub"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Twitter"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

export const metadata: Metadata = {
  title: "Microfrontend Platform - Build Scalable Apps with Turborepo",
  description: "Modern microfrontend platform built with Turborepo, Better-Auth authentication, and Next.js 16. Deploy independently, compose seamlessly.",
  keywords: ["microfrontends", "turborepo", "nextjs", "react", "monorepo"],
}

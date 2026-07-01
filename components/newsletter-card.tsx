import { getCtaLabel, hasAccess } from "@/lib/newsletters"
import type { Newsletter, User } from "@/lib/types"
import { cn } from "@/lib/utils"

interface NewsletterCardProps {
  newsletter: Newsletter
  user: User
}

export function NewsletterCard({ newsletter, user }: NewsletterCardProps) {
  const accessible = hasAccess(newsletter, user)
  const ctaLabel = getCtaLabel(newsletter, user)

  return (
    <article className="flex flex-col">
      <div className="flex aspect-[16/10] items-center justify-center bg-shade px-6 text-center">
        <h3 className="text-balance font-serif text-2xl font-bold leading-tight text-shade-foreground drop-shadow-md">
          {newsletter.title}
        </h3>
      </div>

      <p className="mt-5 text-pretty text-center text-sm leading-relaxed text-foreground">
        {newsletter.description}
      </p>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          aria-label={`${ctaLabel} à la newsletter ${newsletter.title}`}
          className={cn(
            "rounded-full px-6 py-2 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            accessible
              ? "bg-brand-red text-brand-red-foreground"
              : "bg-brand-yellow text-brand-yellow-foreground",
          )}
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  )
}

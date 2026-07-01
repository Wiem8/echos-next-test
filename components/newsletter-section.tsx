import { NewsletterCard } from "@/components/newsletter-card"
import type { NewsletterGroup, User } from "@/lib/types"

interface NewsletterSectionProps {
  group: NewsletterGroup
  user: User
}

export function NewsletterSection({ group, user }: NewsletterSectionProps) {
  return (
    <section aria-labelledby={`site-${group.site}`} className="mt-12 first:mt-0">
      <div className="mb-8">
        <h2
          id={`site-${group.site}`}
          className="text-lg font-bold uppercase tracking-wide text-foreground"
        >
          {group.label}
        </h2>
        <span aria-hidden className="mt-2 block h-1 w-12 rounded-full bg-brand-red" />
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {group.newsletters.map((newsletter) => (
          <NewsletterCard key={newsletter.id} newsletter={newsletter} user={user} />
        ))}
      </div>
    </section>
  )
}

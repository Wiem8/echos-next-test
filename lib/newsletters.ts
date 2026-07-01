import { NEWSLETTER_ITEMS } from "@/lib/mocks/newsletters"
import type { Newsletter, NewsletterGroup, SiteCode, User } from "@/lib/types"

// ************* site code → displayed label ***************// 
const SITE_LABELS: Record<string, string> = {
  DEN: "Les Echos",
  DAN: "Investir",
  LAN: "Les Echos Start",
  SAN: "Capital Finance",
}

// ************* Display order of sections on the page *************//
const SITE_ORDER: SiteCode[] = ["DEN", "DAN", "LAN", "SAN"]
export function getSiteLabel(site: SiteCode): string {
  return SITE_LABELS[site] ?? site
}

// ************* Simulate API call *************//
export async function fetchNewsletters(): Promise<Newsletter[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return structuredClone(NEWSLETTER_ITEMS)
}

// ************* Checks if the user has access to a newsletter *************//
export function hasAccess(newsletter: Newsletter, user: User): boolean {
  if (newsletter.subscriptions.length === 0) return true
  return newsletter.subscriptions.some((right) => user.subscriptions.includes(right))
}

//************* Returns the button label based on the user's access level *************//
export function getCtaLabel(newsletter: Newsletter, user: User): "S'inscrire" | "S'abonner" {
  return hasAccess(newsletter, user) ? "S'inscrire" : "S'abonner"
}

//************* Groups newsletters by site, in the order defined by SITE_ORDER *************//
export function groupBySite(newsletters: Newsletter[]): NewsletterGroup[] {
  const bySite = new Map<SiteCode, Newsletter[]>()

  for (const newsletter of newsletters) {
    const group = bySite.get(newsletter.site) ?? []
    bySite.set(newsletter.site, [...group, newsletter])
  }

  const orderedSites = [
    ...SITE_ORDER.filter((site) => bySite.has(site)),
    ...[...bySite.keys()].filter((site) => !SITE_ORDER.includes(site)),
  ]

  return orderedSites.map((site) => ({
    site,
    label: getSiteLabel(site),
    newsletters: bySite.get(site) ?? [],
  }))
}
import { NewslettersIntro } from "@/components/newsletters-intro";
import { NewsletterSection } from "@/components/newsletter-section";
import { getUserByProfile } from "@/lib/mocks/user";
import { fetchNewsletters, groupBySite } from "@/lib/newsletters";

interface PageProps {
  searchParams: Promise<{ profile?: string }>;
}

export default async function NewslettersPage({ searchParams }: PageProps) {
  const { profile } = await searchParams;
  const { user } = getUserByProfile(profile);

  const newsletters = await fetchNewsletters();
  const groups = groupBySite(newsletters);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <NewslettersIntro />    
      <div className="mt-12">
        {groups.map((group) => (
          <NewsletterSection key={group.site} group={group} user={user} />
        ))}
      </div>
    </main>
  );
}

import { education, profile, skills, summary } from "@/content/data";
import { siteUrl } from "@/lib/site";

const [addressLocality, addressCountry] = profile.location
  .split(",")
  .map((part) => part.trim());

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: profile.name,
  jobTitle: profile.role,
  description: summary,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality,
    addressCountry,
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: education[0]?.institution,
  },
  knowsAbout: skills.flatMap((group) => group.items),
  sameAs: [profile.github, profile.linkedin],
};

export function JsonLd() {
  const json = JSON.stringify(person).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

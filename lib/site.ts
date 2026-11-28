const fallback = "http://localhost:3000";

function normalizeSiteUrl(value: string | undefined): string {
  if (!value?.trim()) return fallback;

  try {
    return new URL(value).origin;
  } catch {
    return fallback;
  }
}

// Vercel provides VERCEL_URL automatically; no user-defined env var is needed.
function vercelSiteUrl(): string | undefined {
  const value = process.env.VERCEL_URL?.trim();
  if (!value) return undefined;
  return /^https?:\/\//.test(value) ? value : `https://${value}`;
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? vercelSiteUrl(),
);

import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  BRANDS_QUERY,
  CAREERS_REASONS_QUERY,
  TEAM_QUERY,
  WORK_BY_SLUG_QUERY,
  WORK_SLUGS_QUERY,
  WORKS_QUERY,
} from "@/sanity/lib/queries";

/**
 * Sanity image references are resolved to plain CDN URLs here so the section
 * components keep taking `image: string` exactly as they did when the content
 * lived in app/data.
 *
 * `width` matters a lot. Without it `urlFor().fit("max")` hands back the URL of
 * the *original* upload — routinely 4000-6000px and several MB. Every one of
 * those then had to be pulled and transcoded by the Next image optimizer before
 * a single byte reached the browser, which is why images arrived seconds late.
 * Capping the origin keeps that server-side step cheap; next/image still emits a
 * full srcset and downscales per breakpoint from here.
 */
const toUrl = (
  source: SanityImageSource | null | undefined,
  width = 1920
): string => (source ? urlFor(source).width(width).url() : "");

/**
 * Low-quality image placeholder Sanity generates for every asset — a ~20 byte
 * base64 data URI. Fed to next/image's `placeholder="blur"` so images resolve
 * out of a colour wash instead of popping in against pure black.
 */
const toBlur = (lqip: string | null | undefined): string | undefined =>
  lqip ?? undefined;

export type Work = {
  id: string;
  title: string;
  slug: string;
  description: string;
  client: string;
  services: string[];
  image: string;
  image2: string;
  /** Base64 LQIP for next/image `placeholder="blur"`. */
  blurDataURL?: string;
  blurDataURL2?: string;
};

export type WorkDetail = Work & {
  goal: string;
  problemStatement: string;
  approach: string;
  whatWeDid: string[];
  mediumsUsed: string[];
  results: string;
};

export type TeamMember = {
  id: string;
  name: string;
  designation?: string;
  image: string;
  description: string;
  featured: boolean;
  /** Base64 LQIP for next/image `placeholder="blur"`. */
  blurDataURL?: string;
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
};

type RawWork = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  client: string;
  services: string[] | null;
  image: SanityImageSource;
  image2: SanityImageSource | null;
  lqip: string | null;
  lqip2: string | null;
};

type RawWorkDetail = RawWork & {
  goal: string | null;
  problemStatement: string | null;
  approach: string | null;
  whatWeDid: string[] | null;
  mediumsUsed: string[] | null;
  results: string | null;
};

const mapWork = (raw: RawWork): Work => ({
  id: raw._id,
  title: raw.title,
  slug: raw.slug,
  description: raw.description,
  client: raw.client,
  services: raw.services ?? [],
  image: toUrl(raw.image),
  // Falls back to the cover image so hover overlays never render an empty src.
  image2: toUrl(raw.image2) || toUrl(raw.image),
  ...(toBlur(raw.lqip) ? { blurDataURL: toBlur(raw.lqip) } : {}),
  ...(toBlur(raw.lqip2 ?? raw.lqip)
    ? { blurDataURL2: toBlur(raw.lqip2 ?? raw.lqip) }
    : {}),
});

export async function getWorks(): Promise<Work[]> {
  const raw = await sanityFetch<RawWork[]>({
    query: WORKS_QUERY,
    tags: ["work"],
  });
  return raw.map(mapWork);
}

export async function getWorkSlugs(): Promise<string[]> {
  return sanityFetch<string[]>({
    query: WORK_SLUGS_QUERY,
    tags: ["work"],
  });
}

export async function getWork(slug: string): Promise<WorkDetail | null> {
  const raw = await sanityFetch<RawWorkDetail | null>({
    query: WORK_BY_SLUG_QUERY,
    params: { slug },
    tags: ["work"],
  });

  if (!raw) return null;

  return {
    ...mapWork(raw),
    goal: raw.goal ?? "",
    problemStatement: raw.problemStatement ?? "",
    approach: raw.approach ?? "",
    whatWeDid: raw.whatWeDid ?? [],
    mediumsUsed: raw.mediumsUsed ?? [],
    results: raw.results ?? "",
  };
}

export async function getTeam(): Promise<TeamMember[]> {
  const raw = await sanityFetch<
    {
      _id: string;
      name: string;
      designation: string | null;
      image: SanityImageSource;
      lqip: string | null;
      description: string;
      featured: boolean | null;
    }[]
  >({ query: TEAM_QUERY, tags: ["teamMember"] });

  return raw.map((member) => ({
    id: member._id,
    name: member.name,
    ...(member.designation ? { designation: member.designation } : {}),
    // Featured portraits render at ~50vw; the roster thumbnails at ~10vw. 1200 is
    // ample for the largest use and keeps the optimizer's origin fetch small.
    image: toUrl(member.image, 1200),
    description: member.description,
    featured: member.featured ?? false,
    ...(toBlur(member.lqip) ? { blurDataURL: toBlur(member.lqip) } : {}),
  }));
}

export async function getBrands(): Promise<Brand[]> {
  const raw = await sanityFetch<
    { _id: string; name: string; logo: SanityImageSource }[]
  >({ query: BRANDS_QUERY, tags: ["brand"] });

  return raw.map((brand) => ({
    id: brand._id,
    name: brand.name,
    // Marquee logos are small — no reason to pull a full-resolution original.
    logo: toUrl(brand.logo, 480),
  }));
}

export async function getReasons(): Promise<string[]> {
  const reasons = await sanityFetch<string[] | null>({
    query: CAREERS_REASONS_QUERY,
    tags: ["careers"],
  });
  return reasons ?? [];
}

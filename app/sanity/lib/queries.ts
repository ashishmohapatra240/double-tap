import { defineQuery } from "next-sanity";

export const WORKS_QUERY = defineQuery(`
  *[_type == "work" && defined(slug.current)] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    client,
    services,
    image,
    image2,
    "lqip": image.asset->metadata.lqip,
    "lqip2": image2.asset->metadata.lqip
  }
`);

export const WORK_SLUGS_QUERY = defineQuery(`
  *[_type == "work" && defined(slug.current)].slug.current
`);

export const WORK_BY_SLUG_QUERY = defineQuery(`
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    client,
    services,
    image,
    image2,
    "lqip": image.asset->metadata.lqip,
    "lqip2": image2.asset->metadata.lqip,
    goal,
    problemStatement,
    approach,
    whatWeDid,
    mediumsUsed,
    results
  }
`);

export const TEAM_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    designation,
    image,
    "lqip": image.asset->metadata.lqip,
    description,
    featured
  }
`);

export const BRANDS_QUERY = defineQuery(`
  *[_type == "brand"] | order(order asc) {
    _id,
    name,
    logo
  }
`);

export const CAREERS_REASONS_QUERY = defineQuery(`
  *[_type == "careers"][0].reasons
`);

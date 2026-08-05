import { createClient, type QueryParams } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

const isDev = process.env.NODE_ENV === "development";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // In production, content updates arrive via the revalidation webhook, so
  // reading from Sanity's edge cache is fine. In dev we want an edit in the
  // Studio to show up on the next reload, so bypass the CDN entirely.
  useCdn: !isDev,
});

/**
 * Fetches published content, tagged by document type.
 *
 * Production: cached indefinitely so pages stay statically rendered; the webhook
 * in app/api/revalidate busts the matching tag when an editor publishes.
 *
 * Development: uncached, because there is no webhook pointing at localhost — with
 * force-cache here, Studio edits would never appear locally no matter how many
 * times you reload.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<T> {
  if (isDev) {
    return client.fetch<T>(query, params, { cache: "no-store" });
  }

  return client.fetch<T>(query, params, {
    // Next 15 defaults fetch to `no-store`, which would opt every one of these
    // routes into dynamic rendering. force-cache keeps them prerendered; the
    // tags below are what the revalidate webhook busts on publish.
    cache: "force-cache",
    next: { tags },
  });
}

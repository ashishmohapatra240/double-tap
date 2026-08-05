/**
 * One-off migration: moves the hardcoded content in app/data/* into Sanity and
 * uploads the matching images out of public/images.
 *
 * Run with:
 *   npx sanity exec scripts/migrate-to-sanity.ts --with-user-token
 *
 * Safe to re-run — every document gets a deterministic _id and is written with
 * createOrReplace, and each image file is only uploaded once per run.
 */
import fs from "node:fs";
import path from "node:path";

import { getCliClient } from "sanity/cli";

import { brands } from "../app/data/brands";
import { reasons } from "../app/data/reasons";
import { featuredMembers, teamMembers } from "../app/data/team";
import { works } from "../app/data/works";

const client = getCliClient();

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const uploadCache = new Map<string, string>();

async function uploadImage(publicPath: string): Promise<string> {
  const cached = uploadCache.get(publicPath);
  if (cached) return cached;

  const absolute = path.join(process.cwd(), "public", publicPath);
  if (!fs.existsSync(absolute)) {
    throw new Error(`Image not found on disk: ${absolute}`);
  }

  const asset = await client.assets.upload(
    "image",
    fs.createReadStream(absolute),
    { filename: path.basename(absolute) }
  );

  uploadCache.set(publicPath, asset._id);
  console.log(`  uploaded ${publicPath} -> ${asset._id}`);
  return asset._id;
}

const imageField = (assetId: string) => ({
  _type: "image",
  asset: { _type: "reference", _ref: assetId },
});

async function migrateWorks() {
  console.log(`\nWorks (${works.length})`);
  for (const [index, work] of works.entries()) {
    const imageId = await uploadImage(work.image);
    const image2Id = work.image2 ? await uploadImage(work.image2) : null;

    await client.createOrReplace({
      _id: `work-${work.slug}`,
      _type: "work",
      title: work.title,
      slug: { _type: "slug", current: work.slug },
      description: work.description,
      client: work.client,
      services: work.services,
      image: imageField(imageId),
      ...(image2Id ? { image2: imageField(image2Id) } : {}),
      goal: work.goal,
      problemStatement: work.problemStatement,
      approach: work.approach,
      whatWeDid: work.whatWeDid,
      mediumsUsed: work.mediumsUsed,
      results: work.results,
      order: index + 1,
    });
    console.log(`  ✓ ${work.title}`);
  }
}

async function migrateTeam() {
  const all = [
    ...featuredMembers.map((m, i) => ({ ...m, featured: true, order: i + 1 })),
    ...teamMembers.map((m, i) => ({ ...m, featured: false, order: i + 1 })),
  ];

  console.log(`\nTeam (${all.length})`);
  for (const member of all) {
    const imageId = await uploadImage(member.image);

    await client.createOrReplace({
      _id: `team-${slugify(member.name)}`,
      _type: "teamMember",
      name: member.name,
      ...(member.designation ? { designation: member.designation } : {}),
      image: imageField(imageId),
      description: member.description,
      featured: member.featured,
      order: member.order,
    });
    console.log(`  ✓ ${member.name}${member.featured ? " (featured)" : ""}`);
  }
}

async function migrateBrands() {
  console.log(`\nBrands (${brands.length})`);
  for (const [index, brand] of brands.entries()) {
    const logoId = await uploadImage(brand.logo);

    await client.createOrReplace({
      _id: `brand-${slugify(brand.name)}`,
      _type: "brand",
      name: brand.name,
      logo: imageField(logoId),
      order: index + 1,
    });
    console.log(`  ✓ ${brand.name}`);
  }
}

async function migrateCareers() {
  console.log(`\nCareers (${reasons.length} reasons)`);
  await client.createOrReplace({
    _id: "careers",
    _type: "careers",
    reasons,
  });
  console.log("  ✓ careers singleton");
}

async function main() {
  console.log(
    `Migrating into projectId=${client.config().projectId} dataset=${client.config().dataset}`
  );

  await migrateWorks();
  await migrateTeam();
  await migrateBrands();
  await migrateCareers();

  console.log(
    `\nDone. ${uploadCache.size} images uploaded, ` +
      `${works.length + featuredMembers.length + teamMembers.length + brands.length + 1} documents written.`
  );
}

main().catch((error) => {
  console.error("\nMigration failed:", error);
  process.exit(1);
});

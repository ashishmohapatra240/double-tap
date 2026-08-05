import type { StructureResolver } from "sanity/structure";

/**
 * Careers is a singleton — there is only ever one list of reasons, so it opens
 * straight into the document instead of showing a list with one item in it.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("work").title("Work"),
      S.documentTypeListItem("teamMember").title("Team"),
      S.documentTypeListItem("brand").title("Brands"),
      S.divider(),
      S.listItem()
        .title("Careers")
        .id("careers")
        .child(S.document().schemaType("careers").documentId("careers")),
    ]);

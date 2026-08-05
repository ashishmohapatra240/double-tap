"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./app/sanity/env";
import { schemaTypes } from "./app/sanity/schemaTypes";
import { structure } from "./app/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure })],
  document: {
    // Careers is a singleton — keep it out of the global "create new" menu.
    newDocumentOptions: (prev) =>
      prev.filter((item) => item.templateId !== "careers"),
  },
});

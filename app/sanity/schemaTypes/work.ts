import { defineField, defineType } from "sanity";

export const work = defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The URL for this project, e.g. /projects/your-slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Tagline",
      type: "string",
      description: "Short line shown under the title, e.g. 'Designing Time Through Tradition'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image2",
      title: "Second image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "goal",
      title: "Goal",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "problemStatement",
      title: "Problem statement",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "whatWeDid",
      title: "What we did",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "One entry per bullet point",
    }),
    defineField({
      name: "mediumsUsed",
      title: "Mediums used",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "image" },
  },
});

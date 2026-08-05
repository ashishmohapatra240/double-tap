import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "designation",
      title: "Designation",
      type: "string",
      description: "Leave blank for founders — they show without a job title",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description:
        "Featured members appear in the larger founders block at the top of the Team section",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first (ordered separately within featured and non-featured)",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      designation: "designation",
      featured: "featured",
      media: "image",
    },
    prepare({ title, designation, featured, media }) {
      return {
        title,
        subtitle: [designation, featured ? "Featured" : null]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});

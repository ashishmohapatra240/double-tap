import { defineField, defineType } from "sanity";

export const careers = defineType({
  name: "careers",
  title: "Careers",
  type: "document",
  fields: [
    defineField({
      name: "reasons",
      title: "Reasons to join",
      type: "array",
      of: [{ type: "string" }],
      description:
        "One is picked at random each time someone taps the button in the Careers section",
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { reasons: "reasons" },
    prepare({ reasons }) {
      const count = Array.isArray(reasons) ? reasons.length : 0;
      return {
        title: "Careers",
        subtitle: `${count} reason${count === 1 ? "" : "s"} to join`,
      };
    },
  },
});

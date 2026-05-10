import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          "Personal MVP",
          "Freelance Project",
          "Company / Collaborative Project",
          "Concept Project",
        ],
      },
    }),
    defineField({
      name: "projectLabel",
      title: "Project Label",
      type: "string",
      description: "Short product/category label shown on project cards, e.g. Flight booking product or Learning platform.",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "role",
      title: "My Role (Deprecated)",
      type: "string",
      deprecated: {
        reason: 'Use "Project Label" instead. This field is no longer shown on the website.',
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "stack",
      title: "Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "contribution",
      title: "Contribution",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "seoTitle",
          title: "SEO Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "seoDescription",
          title: "SEO Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: "focusKeyphrase",
          title: "Focus Keyphrase",
          type: "string",
        }),
        defineField({
          name: "relatedKeyphrases",
          title: "Related Keyphrases",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
        }),
        defineField({
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
        }),
        defineField({
          name: "noIndex",
          title: "No Index",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "ogImage",
          title: "Social Share Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
});

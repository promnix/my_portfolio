import { defineArrayMember, defineField, defineType } from "sanity";

export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Project Breakdown", value: "Project Breakdown" },
          { title: "Web Development", value: "Web Development" },
          { title: "SEO & Performance", value: "SEO & Performance" },
          { title: "Product Thinking", value: "Product Thinking" },
          { title: "Backend Notes", value: "Backend Notes" },
          { title: "WordPress & CMS", value: "WordPress & CMS" },
          { title: "Business Websites", value: "Business Websites" },
          { title: "Website Performance", value: "Website Performance" },
          { title: "Web Design", value: "Web Design" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt / Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(120).max(160),
      description:
        "Use this for the article preview and SEO meta description. Aim for 120–160 characters.",
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    }),

    defineField({
      name: "readingTime",
      title: "Reading Time",
      type: "string",
      description: "Example: 5 min read",
    }),

    defineField({
      name: "isFeatured",
      title: "Featured Article",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as { asset?: unknown };
              if (parent?.asset && !value) {
                return "Alt text is required when an image is used.";
              }
              return true;
            }),
        },
      ],
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "seoTitle",
          title: "SEO Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "seoDescription",
          title: "SEO Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: "focusKeyphrase",
          title: "Focus Keyphrase",
          type: "string",
        },
        {
          name: "relatedKeyphrases",
          title: "Related Keyphrases",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
        },
        {
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
        },
        {
          name: "noIndex",
          title: "No Index",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "ogImage",
          title: "Social Share Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "internalLink",
                title: "Internal Link",
                type: "object",
                fields: [
                  {
                    name: "reference",
                    title: "Reference",
                    type: "reference",
                    to: [{ type: "blogPost" }, { type: "project" }],
                  },
                ],
              },
              {
                name: "externalLink",
                title: "External Link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) => Rule.required(),
                  },
                  {
                    name: "openInNewTab",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },

        {
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },

        {
          name: "callout",
          title: "Callout",
          type: "object",
          fields: [
            {
              name: "tone",
              title: "Tone",
              type: "string",
              options: {
                list: ["note", "tip", "warning"],
              },
              initialValue: "note",
            },
            {
              name: "text",
              title: "Text",
              type: "text",
            },
          ],
        },

        {
          name: "codeBlock",
          title: "Code Block",
          type: "object",
          fields: [
            {
              name: "language",
              title: "Language",
              type: "string",
              initialValue: "tsx",
            },
            {
              name: "code",
              title: "Code",
              type: "text",
            },
          ],
        },

        defineArrayMember({
          name: "table",
          title: "Table",
          type: "object",
          fields: [
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional label shown below the table.",
            }),
            defineField({
              name: "headers",
              title: "Column Headers",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              description: "One entry per column, in order (e.g. Score, Performance, SEO…).",
              validation: (Rule) => Rule.min(1).warning("Add at least one column header."),
            }),
            defineField({
              name: "rows",
              title: "Rows",
              type: "array",
              of: [
                defineArrayMember({
                  name: "tableRow",
                  title: "Row",
                  type: "object",
                  fields: [
                    defineField({
                      name: "cells",
                      title: "Cells",
                      type: "array",
                      of: [defineArrayMember({ type: "string" })],
                      description: "One entry per cell, matching the column order above.",
                    }),
                  ],
                  preview: {
                    select: { cells: "cells" },
                    prepare({ cells }: { cells?: string[] }) {
                      return {
                        title: cells?.join(" | ") ?? "Empty row",
                      };
                    },
                  },
                }),
              ],
              validation: (Rule) =>
                Rule.min(1)
                  .warning("Add at least one table row.")
                  .custom((rows, context) => {
                    const parent = context.parent as {
                      headers?: string[];
                    };
                    const headerCount = parent.headers?.length ?? 0;

                    if (!headerCount || !rows?.length) return true;

                    const mismatchIndex = rows.findIndex((row) => {
                      const tableRow = row as { cells?: string[] };
                      return (tableRow.cells?.length ?? 0) !== headerCount;
                    });

                    if (mismatchIndex === -1) return true;

                    return `Row ${mismatchIndex + 1} should have ${headerCount} cells to match the table headers.`;
                  }),
            }),
          ],
          preview: {
            select: { caption: "caption", headers: "headers" },
            prepare({
              caption,
              headers,
            }: {
              caption?: string;
              headers?: string[];
            }) {
              return {
                title: caption ?? "Table",
                subtitle: headers?.join(", "),
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "callToAction",
      title: "Call to Action",
      description:
        "Optional CTA shown after the article body. Leave empty when this post should not show a CTA.",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Next step",
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.max(90),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(220),
        }),
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: "href",
          title: "Button Link",
          type: "url",
          description: "Use a relative path like /contact or a full URL.",
          validation: (Rule) =>
            Rule.uri({
              allowRelative: true,
              scheme: ["http", "https", "mailto", "tel"],
            }),
        }),
        defineField({
          name: "openInNewTab",
          title: "Open in new tab",
          type: "boolean",
          initialValue: false,
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;

          const cta = value as {
            title?: string;
            label?: string;
            href?: string;
          };
          const hasAnyValue = Boolean(cta.title || cta.label || cta.href);

          if (!hasAnyValue) return true;

          if (!cta.title || !cta.label || !cta.href) {
            return "Add a title, button label, and button link, or leave the CTA empty.";
          }

          return true;
        }),
    }),

    defineField({
      name: "faqs",
      title: "FAQs",
      description:
        "Optional questions and answers shown below the article and included in FAQ structured data.",
      type: "array",
      of: [defineArrayMember({ type: "blogFaq" })],
      validation: (Rule) => Rule.max(8),
    }),
  ],
});

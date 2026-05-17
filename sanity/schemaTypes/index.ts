import { type SchemaTypeDefinition } from 'sanity'
import { blogFaqSchema } from './blogFaqSchema'
import { blogPostSchema } from './blogPostSchema'
import { projectSchema } from './projectSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogFaqSchema, projectSchema, blogPostSchema],
}

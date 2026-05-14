import { type SchemaTypeDefinition } from 'sanity'
import { blogPostSchema } from './blogPostSchema'
import { projectSchema } from './projectSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectSchema, blogPostSchema],
}

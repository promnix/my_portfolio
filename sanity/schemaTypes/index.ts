import { type SchemaTypeDefinition } from 'sanity'
import { projectSchema } from './projectSchema'
import { blogPostSchema } from './blogPostSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectSchema, blogPostSchema],
}

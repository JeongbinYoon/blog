import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'lyvfm7vk',
  dataset: 'production',
  useCdn: false,
  withCredentials: true,
})

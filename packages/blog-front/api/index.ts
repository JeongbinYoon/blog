import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'lyvfm7vk',
  dataset: 'production',
  useCdn: false,
  withCredentials: true,
  apiVersion: '2023-04-25',
})

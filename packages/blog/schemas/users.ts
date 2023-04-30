import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'users',
  title: 'Users',
  type: 'document',
  fields: [
    defineField({
      name: 'userEmail',
      title: 'UserEmail',
      type: 'string',
    }),
    defineField({
      name: 'userName',
      title: 'UserPName',
      type: 'string',
    }),
    defineField({
      name: 'userPassword',
      title: 'UserPassword',
      type: 'string',
    }),
  ],
})

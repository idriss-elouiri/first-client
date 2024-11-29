import { CollectionConfig } from 'payload/types'

export const ProductFiles: CollectionConfig = {
  slug: 'product_files',
  upload: {
    staticDir: 'product_files',
    mimeTypes: [
      'image/*', // الصور
      'application/pdf', // مستندات PDF
      'application/zip', // ملفات ZIP
      'application/x-rar-compressed', // ملفات RAR
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // مستندات Word
    ],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
      admin: {
        condition: () => false,
      },
    },
  ],
}

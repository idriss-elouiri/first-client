import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    hidden: ({ user }) => user.role !== 'admin', // إخفاء المجموعة عن غير الإداريين
  },
  upload: {
    staticDir: 'media', // مجلد تخزين الملفات
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
        height: 150,
      },
      {
        name: 'card',
        width: 300,
        height: 300,
      },
    ],
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif'], // السماح برفع الصور فقط
  },
  access: {
    create: ({ req }) => !!req.user, // السماح لأي مستخدم بتسجيل الدخول بالرفع
    read: async ({ req }) => {
      if (req.user.role === 'admin') return true
      return {
        user: {
          equals: req.user.id, // السماح بالوصول إلى الصور الخاصة بالمستخدم
        },
      }
    },
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id }
      },
    ],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        condition: () => false,
      },
    },
  ],
}

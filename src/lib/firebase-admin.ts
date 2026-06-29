import 'server-only'
import admin from 'firebase-admin'
import type { Auth } from 'firebase-admin/auth'
import type { Firestore } from 'firebase-admin/firestore'

// Lazy initialization — only runs during actual requests, not at build time
function getAdminApp(): admin.app.App {
  if (admin.apps.length > 0) return admin.apps[0]!
  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export function getAdminAuth(): Auth {
  return getAdminApp().auth()
}

export function getAdminDb(): Firestore {
  return getAdminApp().firestore()
}

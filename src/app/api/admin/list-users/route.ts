import { NextRequest } from 'next/server'
import { getAdminDb } from '../../../../lib/firebase-admin'
import { verifyAdmin, errResponse } from '../_adminGuard'

export async function POST(req: NextRequest) {
  try {
    await verifyAdmin(req)

    const snap = await getAdminDb().collection('users').orderBy('createdAt', 'desc').get()
    const users = snap.docs.map((d) => ({ ...d.data() }))

    return Response.json({ users })
  } catch (err) {
    return errResponse(err)
  }
}

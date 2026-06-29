import 'server-only'
import { NextRequest } from 'next/server'
import { getAdminAuth, getAdminDb } from '../../../lib/firebase-admin'
import { ApiError, errResponse } from '../_server'

export async function verifyAdmin(req: NextRequest): Promise<{ uid: string }> {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) throw new ApiError(401, 'Missing auth token')

  const decoded = await getAdminAuth().verifyIdToken(token)
  const snap = await getAdminDb().collection('users').doc(decoded.uid).get()
  if (!snap.exists || snap.data()?.role !== 'super_admin') {
    throw new ApiError(403, 'Super admin access required')
  }

  return { uid: decoded.uid }
}

export { errResponse }

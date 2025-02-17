import { getAuthorizationParams } from '@/shared'

export class AuthStore {
  private storage: Storage

  constructor() {
    this.storage = localStorage
  }

  get() {
    const authorization = this.storage.getItem('Authorization')
    return authorization ? JSON.parse(authorization) : null
  }

  async set() {
    const authorization = await getAuthorizationParams()
    this.storage.setItem('Authorization', JSON.stringify(authorization))
    return authorization
  }
}

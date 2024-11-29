import { VkStorage } from '@/shared/lib'
import { getAuthorizationParams } from '@/shared/services'

export class AuthStore {
  private storage: VkStorage
  constructor() {
    this.storage = new VkStorage()
  }

  async init() {
    await this.set()
  }

  async get() {
    const authorization = await this.storage.get(['Authorization'])
    console.log(authorization[0].value)
    return authorization[0].value
  }

  async set() {
    const authorization = await getAuthorizationParams()
    await this.storage.set('Authorization', authorization)
    return authorization
  }
}

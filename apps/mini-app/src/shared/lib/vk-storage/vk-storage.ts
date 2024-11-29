import { vkBridge } from '../vk-bridge'
import { VKBridge } from '@vkontakte/vk-bridge'

export class VkStorage {
  private bridge: VKBridge
  constructor() {
    this.bridge = vkBridge
  }
  /**
   * Retrieves values from VK storage for the given keys.
   * @param keys - An array of keys to retrieve.
   * @returns A promise that resolves to an object with key-value pairs.
   */

  async get(keys: string[]): Promise<Array<{ key: string; value: string }>> {
    try {
      const response = await this.bridge.send('VKWebAppStorageGet', { keys })
      return response.keys
    } catch (error) {
      console.error('Error retrieving values from VK storage:', error)
      throw error
    }
  }

  /**
   * Sets a value in VK storage for a given key.
   * @param {string} key - The key to set.
   * @param {string} value - The value to set.
   * @returns {Promise<void>} - A promise that resolves if the operation is successful.
   */

  async set(key: string, value: string) {
    try {
      const response = await this.bridge.send('VKWebAppStorageSet', {
        key,
        value,
      })
      if (response.result) {
        console.log(`Successfully set value for key: ${key}`)
      } else {
        throw new Error(`Failed to set value for key: ${key}`)
      }
    } catch (error) {
      console.error('Error setting value in VK storage:', error)
      throw error
    }
  }
}

import { AuthStore } from '@/shared'
import { hcWithType } from '@tamagotchi/api/hc'
import ky from 'ky'

const kyapi = ky.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const authStore = new AuthStore()
        const authorization = ''
        if (authorization) {
          request.headers.set('Authorization', authorization)
        } else {
          console.warn('No authParams found. Request might fail.')
        }
      },
    ],
    afterResponse: [
      async (request, options, response: Response) => {
        console.log(response)
        if (response.ok) {
          return response
        } else if (response.status === 401) {
          const authStore = new AuthStore()
          const authorization = await authStore.set()
          request.headers.set('Authorization', authorization)
          return kyapi(request, options)
        } else {
          console.log(response)
          throw new Error(response.statusText)
        }
      },
    ],
  },
})

export const client = hcWithType('http://localhost:9999', {
  fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
    return kyapi(input, {
      method: requestInit?.method ?? 'get',
      headers: {
        'content-type': 'application/json',
        ...requestInit?.headers,
      },
      body: requestInit?.body || null,
    })
  },
})

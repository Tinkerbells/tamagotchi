import ky from 'ky'
import { hcWithType } from '@tamagotchi/api/hc'

import { AuthStore, env } from '@/shared'

const baseURL = env.VITE_BACKEND_URL

const kyapi = ky.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const authStore = new AuthStore()
        const authorization = await authStore.get()
        if (authorization) {
          request.headers.set('Authorization', authorization)
        }
        else {
          console.warn('No authParams found. Request might fail.')
        }
      },
    ],
    afterResponse: [
      async (request, options, response: Response) => {
        console.log(response)
        if (response.ok) {
          return response
        }
        else if (response.status === 401) {
          const authStore = new AuthStore()
          const authorization = await authStore.set()
          request.headers.set('Authorization', authorization)
          return kyapi(request, options)
        }
        else {
          throw new Error(response.statusText)
        }
      },
    ],
  },
})

export const client = hcWithType(baseURL, {
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
}).api

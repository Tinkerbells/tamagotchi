import ky from 'ky'
import { useQuery } from '@tanstack/react-query'

async function fetchPosts() {
  return await ky.get('https://jsonplaceholder.typicode.com/posts').json()
}

export function useGetPost() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
    retry: 0,
  })
}

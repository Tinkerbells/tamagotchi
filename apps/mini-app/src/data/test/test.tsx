import { useQuery } from '@tanstack/react-query'
import ky from 'ky'

const fetchPosts = async () => {
  return await ky.get('https://jsonplaceholder.typicode.com/posts').json()
}

export const useGetPost = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
    retry: 0,
  })
}

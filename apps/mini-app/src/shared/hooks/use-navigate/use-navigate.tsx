import { RoutesType } from '@/app'
import {
  NavigateOptions,
  useNavigate as useReactRouterNavigate,
} from 'react-router-dom'

export const useNavigate = () => {
  const navigate = useReactRouterNavigate()
  return (to: RoutesType, options?: NavigateOptions) => {
    navigate(to, options)
  }
}

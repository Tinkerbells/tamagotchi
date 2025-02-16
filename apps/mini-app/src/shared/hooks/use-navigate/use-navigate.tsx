import type {
  NavigateOptions,
} from 'react-router-dom'

import {
  useNavigate as useReactRouterNavigate,
} from 'react-router-dom'

import type { RoutesType } from '@/app'

export function useNavigate() {
  const navigate = useReactRouterNavigate()
  return (to: RoutesType, options?: NavigateOptions) => {
    navigate(to, options)
  }
}

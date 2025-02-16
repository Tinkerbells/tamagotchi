import type * as React from 'react'

import { useState } from 'react'

import { useAuth } from '@/shared'
import { useUpdateNorms } from '@/data'

import { useNormsWidgetContext } from '../norms-widget-context'

export function useNormsWidgetForm() {
  const { user } = useAuth()
  const { mutate, isPending } = useUpdateNorms()
  const { dailyNorm, variant } = useNormsWidgetContext()
  const [norm, setNorm] = useState(dailyNorm)
  const presets = variant === 'water' ? [500, 750, 1000, 1250] : [8, 9, 10]
  const step = variant === 'water' ? 50 : 1

  const handleIncrement = () => {
    setNorm(prev => prev + step)
  }

  const handleDecrement = () => {
    setNorm(prev => Math.max(0, prev - step))
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value)) {
      setNorm(value)
    }
    else {
      setNorm(0)
    }
  }

  const onPresetClick = (value: number) => {
    setNorm(value)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (variant === 'water') {
      mutate({ userId: user.id, waterDailyNorm: norm })
    }
    else {
      mutate({ userId: user.id, sleepDailyNorm: norm })
    }
  }

  return {
    variant,
    presets: presets!,
    value: norm,
    isPending,
    handleIncrement,
    handleDecrement,
    onInputChange,
    onPresetClick,
    onSubmit,
  }
}

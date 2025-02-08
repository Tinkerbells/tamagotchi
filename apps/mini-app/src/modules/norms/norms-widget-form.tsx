import { useNormsWidgetForm } from './hooks'
import { Button, Input } from '@tamagotchi/ui'
import { cn } from '@tamagotchi/utils'
import { Minus, Plus } from 'lucide-react'
import { useMemo } from 'react'

const styles = {
  sleep: { primary: '#B1556C', presetBorder: '#ecd6dc', buttonBg: '#FCC3DD' },
  water: { primary: '#0BB5B5', presetBorder: '#bde5e5', buttonBg: '#C3F9FC' },
}

export const NormsWidgetForm = () => {
  const {
    onSubmit,
    handleDecrement,
    handleIncrement,
    value,
    presets,
    onInputChange,
    onPresetClick,
    isPending,
    variant,
  } = useNormsWidgetForm()

  const currentStyles = useMemo(
    () => styles[variant] || styles.sleep,
    [variant]
  )

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center justify-center gap-2">
        <DecrementButton
          onClick={handleDecrement}
          color={currentStyles.primary}
        />
        <Input
          value={value}
          onChange={onInputChange}
          className="w-40 text-center"
          min="0"
        />
        <IncrementButton
          onClick={handleIncrement}
          color={currentStyles.primary}
        />
      </div>

      <div className="flex justify-center gap-2">
        {presets?.map((presetValue) => (
          <PresetButton
            key={presetValue}
            presetValue={presetValue}
            selectedValue={value}
            onClick={onPresetClick}
            styles={currentStyles}
            variant={variant}
          />
        ))}
      </div>

      <Button
        type="submit"
        className="h-[44px] w-full"
        style={{
          backgroundColor: currentStyles.buttonBg,
          color: currentStyles.primary,
        }}
        isLoading={isPending}
      >
        Сохранить
      </Button>
    </form>
  )
}

const DecrementButton = ({
  onClick,
  color,
}: {
  onClick: () => void
  color: string
}) => (
  <Button
    type="button"
    variant="outline"
    onClick={onClick}
    className="aspect-square h-7 w-7 rounded-full border-none p-0 text-white"
    style={{ backgroundColor: color }}
  >
    <Minus className="h-4 w-4" />
  </Button>
)

const IncrementButton = ({
  onClick,
  color,
}: {
  onClick: () => void
  color: string
}) => (
  <Button
    type="button"
    variant="outline"
    onClick={onClick}
    className="aspect-square h-7 w-7 rounded-full border-none p-0 text-white"
    style={{ backgroundColor: color }}
  >
    <Plus className="h-4 w-4" />
  </Button>
)

const PresetButton = ({
  presetValue,
  selectedValue,
  onClick,
  styles,
  variant,
}: {
  presetValue: number
  selectedValue: number
  onClick: (value: number) => void
  styles: { primary: string; presetBorder: string }
  variant: string
}) => {
  const isSelected = presetValue === selectedValue

  return (
    <Button
      type="button"
      className={cn(
        'whitespace-nowrap rounded-2xl border bg-white px-3 py-1 text-xs font-semibold tracking-tighter',
        variant === 'water' ? 'w-16' : 'w-[66px]'
      )}
      style={{
        borderColor: styles.presetBorder,
        color: isSelected ? 'white' : styles.primary,
        backgroundColor: isSelected ? styles.primary : 'white',
      }}
      onClick={() => onClick(presetValue)}
    >
      {presetValue} {variant === 'sleep' && 'часов'}
    </Button>
  )
}

import { cn } from '@tamagotchi/utils'
import { Minus, Plus } from 'lucide-react'
import { Button, Input } from '@tamagotchi/ui'

export interface ChangeNormsFormOptions {
  value: number
  isPending: boolean
  presets?: number[]
  handleIncrement: () => void
  handleDecrement: () => void
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPresetClick: (value: number) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function ChangeNormsForm({
  value,
  isPending,
  presets = [],
  handleIncrement,
  handleDecrement,
  onInputChange,
  onPresetClick,
  onSubmit,
}: ChangeNormsFormOptions) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-4 flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleDecrement}
            className="aspect-square h-7 w-7 rounded-full border-none bg-[#0BB5B5] p-0 text-white"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            value={value}
            onChange={onInputChange}
            className="w-40 text-center"
            min="0"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleIncrement}
            className="aspect-square h-7 w-7 rounded-full border-none bg-[#0BB5B5] p-0 text-white"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="mb-6 flex gap-2">
          {presets.map(presetValue => (
            <Button
              key={presetValue}
              type="button"
              className={cn(
                'w-16 rounded-2xl border border-[#bde5e5] bg-white px-3 py-1 text-xs font-semibold text-[#0bb5b5]',
                presetValue === value
                && 'border-[#0bb5b5] bg-[#0bb5b5] text-white',
              )}
              onClick={() => onPresetClick(presetValue)}
            >
              {presetValue}
            </Button>
          ))}
        </div>
        <Button
          type="submit"
          className="h-[44px] w-full bg-[#c3f9fc] text-[#0bb5b5]"
          isLoading={isPending}
        >
          Сохранить
        </Button>
      </form>
    </div>
  )
}

import { useMeditationContext } from '../meditation-widget-context'
import { motion } from 'framer-motion'

const thoughts = [
  { text: 'Концентрируйся на музыке', delay: 25 },
  { text: 'Думай о хорошем', delay: 50 },
  { text: 'Поддерживай ровное дыхание', delay: 75 },
  { text: 'Избавься от лишних мыслей', delay: 100 },
]

export const MeditationWidgetThoughts = () => {
  const { timerProgress } = useMeditationContext()

  return (
    <div className="absolute top-44 z-0 flex w-full flex-col items-center gap-3">
      {thoughts.map((thought, index) => {
        const isVisible = timerProgress >= thought.delay
        const maxBlur = 3 - index // Maximum blur based on index (3px, 2px, 1px, 0px)
        let blurAmount = 0

        if (isVisible) {
          // Calculate blur based on time passed since the thought's delay
          const timePassed = timerProgress - thought.delay
          const totalTime = 100 - thought.delay
          const progress =
            totalTime > 0 ? Math.min(timePassed / totalTime, 1) : 1

          blurAmount = maxBlur * (1 - progress)
        }

        console.log(blurAmount)

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, filter: 'blur(1.3px)' }}
            animate={{
              opacity: isVisible ? 1 : 0,
              filter: `blur(${blurAmount}px)`,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              borderRadius: `${17 + index * 5}px`,
              fontSize: `${9 + index}px`,
              marginLeft: index % 2 === 0 ? '24vw' : undefined,
              marginRight: index % 2 !== 0 ? '34vw' : undefined,
            }}
            className="text-text-secondary h-auto w-fit bg-white/80 px-4 py-2 font-normal leading-[154%] tracking-tighter"
          >
            {thought.text}
          </motion.div>
        )
      })}
    </div>
  )
}

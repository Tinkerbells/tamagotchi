import confetti from 'canvas-confetti'

export function useConfetti() {
  const end = Date.now() + 0.1 * 1000 // 30 milliseconds

  const frame = () => {
    if (Date.now() > end)
      return

    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
    })

    requestAnimationFrame(frame)
  }

  return frame
}

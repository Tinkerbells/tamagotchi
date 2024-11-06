import bg from '/images/start-screen/step-bg.png'

export const StepCard = () => {
  return (
    <div
      className="shadow-start-screen-card h-80 w-60 rounded-[1.5rem]"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
      }}
    ></div>
  )
}

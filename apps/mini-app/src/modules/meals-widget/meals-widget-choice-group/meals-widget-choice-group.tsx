import { MealsWidgetImage } from './images'
import { MealsWidgetChoice } from './meals-widget-choice'
import { useMealsWidgetContext } from '../meals-widget-context'

export function MealsWidgetChoiceGroup() {
  const { selectedMeals, toggleMeal } = useMealsWidgetContext()
  return (
    <div className="grid h-full w-full grid-cols-2 place-items-center gap-y-7">
      <MealsWidgetChoice
        title="Завтрак"
        onChoice={() => toggleMeal('breakfast')}
        isActive={selectedMeals.breakfast}
      >
        <MealsWidgetImage type="breakfast" />
      </MealsWidgetChoice>
      <MealsWidgetChoice
        title="Перекус"
        onChoice={() => toggleMeal('snack')}
        isActive={selectedMeals.snack}
      >
        <MealsWidgetImage type="snack" />
      </MealsWidgetChoice>
      <MealsWidgetChoice
        title="Обед"
        onChoice={() => toggleMeal('lunch')}
        isActive={selectedMeals.lunch}
      >
        <MealsWidgetImage type="lunch" />
      </MealsWidgetChoice>
      <MealsWidgetChoice
        title="Полдник"
        onChoice={() => toggleMeal('afternoon_snack')}
        isActive={selectedMeals.afternoon_snack}
      >
        <MealsWidgetImage type="afternoon_snack" />
      </MealsWidgetChoice>
      <MealsWidgetChoice
        className="col-span-2"
        title="Ужин"
        onChoice={() => toggleMeal('dinner')}
        isActive={selectedMeals.dinner}
      >
        <MealsWidgetImage type="dinner" />
      </MealsWidgetChoice>
    </div>
  )
}

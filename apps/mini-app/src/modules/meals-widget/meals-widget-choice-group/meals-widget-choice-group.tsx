import { MealsWidgetImage } from './images'
import { MealsWidgetChoice } from './meals-widget-choice'
import { useMealsWidgetContext } from '../meals-widget-context'

export function MealsWidgetChoiceGroup() {
  const { selectedMeals, toggleMeal } = useMealsWidgetContext()
  return (
    <div className="flex w-full items-center flex-col gap-y-7">
      <div className="flex gap-4">
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
      </div>
      <div className="flex gap-4">
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
      </div>
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

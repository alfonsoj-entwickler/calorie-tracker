import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hooks/useActitvity";

export default function CalorieTracker() {
  const { caloriesConsumed, caloriesBurned, netCalories } = useActivity();

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resume calories
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="consumed" />
        <CalorieDisplay calories={caloriesBurned} text="burned" />
        <CalorieDisplay calories={netCalories} text="different" />
      </div>
    </>
  );
}

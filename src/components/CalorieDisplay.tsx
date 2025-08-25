type CalorieDisplayProps = {
  calories: number;
  text: string;
};
export default function CalorieDisplay({
  calories,
  text,
}: CalorieDisplayProps) {
  return (
    <p className="grid grid-cols-1 gap-3 text-center text-white font-bold rounded-full">
      <span className="font-black text-6xl text-orange-500">{calories}</span>
      {text}
    </p>
  );
}

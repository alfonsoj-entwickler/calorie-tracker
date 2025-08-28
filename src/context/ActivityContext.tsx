import {
  createContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  activityReducer,
  initialState,
  type ActivityActions,
  type ActivityState,
} from "../reducers/activityReducer";
import { categories } from "../data/categories";
import type { Activity } from "../types";
type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  caloriesConsumed: number;
  caloriesBurned: number;
  netCalories: number;
  isEmptyActivities: boolean;
  categoryName: (category: number) => string[];
  dispatch: Dispatch<ActivityActions>;
};

export const ActivityContext = createContext<ActivityContextProps>(
  {} as ActivityContextProps
);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, item) => (item.category === 1 ? total + item.calories : total),
        0
      ),
    [state.activities]
  );
  const caloriesBurned = useMemo(
    () =>
      state.activities.reduce(
        (total, item) => (item.category === 2 ? total + item.calories : total),
        0
      ),
    [state.activities]
  );
  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [state.activities]
  );

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (category === cat.id ? cat.name : "")),
    [state.activities]
  );

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  return (
    <ActivityContext
      value={{
        state,
        caloriesConsumed,
        caloriesBurned,
        netCalories,
        isEmptyActivities,
        categoryName,
        dispatch,
      }}
    >
      {children}
    </ActivityContext>
  );
};

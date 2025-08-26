import { useReducer, useEffect, useMemo } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityItems from "./components/ActivityItems";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canResetApp = useMemo(
    () => state.activities.length > 0,
    [state.activities]
  );

  return (
    <>
      <header className="bg-lime-500 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Calorie Tracker
          </h1>
          {canResetApp && (
            <button
              type="button"
              className="p-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md"
              onClick={() =>
                dispatch({
                  type: "reset-app",
                })
              }
            >
              Reset App
            </button>
          )}
        </div>
      </header>

      <section className="bg-lime-300 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityItems activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;

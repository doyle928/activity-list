import React, { useReducer } from "react";
import "./App.css";
import ActivityList from "./clock/ActivityList";
import StartActivity from "./clock/StartActivity";
import "bootstrap/dist/css/bootstrap.min.css";

export const AppContext = React.createContext();

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_ACTIVITIES":
        return {
          activities: action.data
        };
      case "NEW_ACTIVITIES":
        return {
          activities: action.data
        };

      default:
        return null;
    }
  };
  const [state, dispatch] = useReducer(reducer, null);

  return (
    <div className="App">
      <AppContext.Provider value={{ state, dispatch }}>
        <StartActivity />
        <ActivityList />
      </AppContext.Provider>
    </div>
  );
}

export default App;

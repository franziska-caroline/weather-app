import List from "./components/List";
import "./App.css";
import Form from "./components/Form";
import { useState } from "react";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [activity, setActivity] = useLocalStorageState("activity", {
    defaultValue: [],
  });

  function handleAddActivity(newActivity) {
    // adds a new animal to the state + passed down to `Form`
    setActivity([...activity, { id: uid(), ...newActivity }]);
    console.log(newActivity);
  }

  return (
    <div className="App">
      <h1 className="form__header">Weather App</h1>
      <List activities={activity} />
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}

export default App;

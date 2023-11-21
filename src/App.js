import List  from "./components/List";
import "./App.css";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [isGoodWeather, setIsGoodWeather] = useState(0);

  useEffect(() => {
    async function fetchWeatherData() {
      const response = await fetch(
        "https://example-apis.vercel.app/api/weather/europe"
      );
      const weather = await response.json();
      setIsGoodWeather(weather);
      console.log(weather);
    }
    fetchWeatherData();
  }, []);

  const filterList = activities.filter((activity) => {
    return activity.isForGoodWeather === isGoodWeather;
  });
  function handleAddActivity(newActivity) {
    // adds a new animal to the state + passed down to `Form`
    setActivities([...activities, { id: uid(), ...newActivity }]);
   
  }

  return (
    <div className="App">
      <h1 className="form__header">
        {isGoodWeather.condition} {isGoodWeather.temperature}°C
      </h1>
      <List
        activities={activities}
        filterList={filterList}
        isGoodWeather={isGoodWeather}
      />
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}

export default App;

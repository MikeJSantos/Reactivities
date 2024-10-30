import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const url = "http://localhost:5000/api/activities";
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setActivities(response.data);
    });
  }, [activities]);

  return (
    <div>
      <h1>Reactivities</h1>
      <ul>
        {activities.map((a: any) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

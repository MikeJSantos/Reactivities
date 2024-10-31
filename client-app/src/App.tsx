import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

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
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((a: any) => (
          <List.Item key={a.id}>{a.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;

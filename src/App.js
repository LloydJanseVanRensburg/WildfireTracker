import { useState, useEffect } from "react";
import Map from "./components/Map";
import Loader from "./components/Loader.js";
import Header from "./components/Header";

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      // Set loading to true before calling API
      setLoading(true);

      // Call API and save in res
      const res = await fetch(
        "https://eonet.sci.gsfc.nasa.gov/api/v2.1/events"
      );

      // res.json to destructer events field out of JSON object
      const { events } = await res.json();

      setEventData(events);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Header />
      {!loading ? <Map eventData={eventData} /> : <Loader />}
    </div>
  );
}

export default App;

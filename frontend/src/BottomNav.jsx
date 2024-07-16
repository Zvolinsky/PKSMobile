import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";

//screens
import BusesScreen from "./screens/BottomNav/BusesScreen";
// import DeparturesScreen from "./screens/BottomNav/DeparturesScreen";
import BusStopsScreen from "./screens/BottomNav/BusStopsScreen";

const Buses = () => <BusesScreen />;

// const Departures = () => <DeparturesScreen />;
const BusStops = () => <BusStopsScreen />;

const MyComponent = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {
      key: "buses",
      title: "Linie",
      focusedIcon: "bus",
    },
    // { key: "search", title: "Szukaj połączeń", focusedIcon: "search-web" },
    {
      key: "busstops",
      title: "Przystanki",
      focusedIcon: "bus-stop-uncovered",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    buses: Buses,
    busstops: BusStops,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={({ route, jumpTo }) => {
        switch (route.key) {
          case "buses":
            return <BusesScreen />;
          case "busstops":
            return <BusStops />;
        }
      }}
    />
  );
};

export default MyComponent;

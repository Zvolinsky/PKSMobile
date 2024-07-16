import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import api from "../../services/api";

const BusesList = ({ navigation }) => {
  const [buses, setBuses] = useState([
    {
      id: 1,
      route: "108",
    },
    {
      id: 2,
      route: "193",
    },
    {
      id: 3,
      route: "200",
    },
    {
      id: 4,
      route: "201",
    },
    {
      id: 5,
      route: "202",
    },
    {
      id: 6,
      route: "203",
    },
    {
      id: 7,
      route: "205",
    },
    {
      id: 8,
      route: "206",
    },
    {
      id: 9,
      route: "207",
    },
    {
      id: 10,
      route: "208",
    },
  ]);
  useEffect(() => {
    fetch(api.getAllBuses)
      .then((response) => response.json())
      .then((json) => {
        setBuses(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <FlatList
      style={{ padding: 20 }}
      data={buses}
      renderItem={({ item }) => (
        <Button
          key={item.id}
          style={{ width: "33%", height: "40px" }}
          onPress={() =>
            navigation.navigate("BusRouteScreen", {
              busId: item.id,
              busName: item.number,
            })
          }
        >
          {item.number}
        </Button>
      )}
      horizontal={false}
      numColumns={4}
    />
  );
};

export default BusesList;

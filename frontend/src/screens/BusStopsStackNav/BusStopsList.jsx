import { useEffect, useState } from "react";

import api from "../../services/api";
//elements
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

const BusStopsList = ({ navigation }) => {
  const [busStops, setBusStops] = useState([]);

  useEffect(() => {
    fetch(api.getAllBusStops)
      .then((response) => response.json())
      .then((json) => {
        setBusStops(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View>
      {busStops.map((item, index) => (
        <Button
          key={index}
          onPress={() => {
            navigation.navigate("ScheduleScreen", {
              busStopId: item.id,
              busStopName: item.name,
            });
          }}
        >
          {item.name}
        </Button>
      ))}
    </View>
  );
};

export default BusStopsList;

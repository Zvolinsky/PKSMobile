import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Button, Divider, Text } from "react-native-paper";

import api from "../services/api";

const Tab = createMaterialTopTabNavigator();

const Table = ({ navigation, route }) => {
  const { busRouteDirectionId, busId, busName, direction } = route.params;
  const [busRouteStops, setBusRouteStops] = useState([]);
  function getBusRouteStops(busRouteDirectionId) {
    fetch(`${api.getBusRouteStops}${busRouteDirectionId}`)
      .then((response) => response.json())
      .then((json) => {
        setBusRouteStops(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getBusRouteStops(busRouteDirectionId);
  }, []);
  return (
    <FlatList
      data={busRouteStops}
      renderItem={({ item }) => (
        <>
          <Button
            key={item.id}
            labelStyle={{
              fontSize: 20,
              paddingHorizontal: 20,
              width: "100%",
              height: 40,
              textAlign: "left",
              verticalAlign: "middle",
            }}
            onPress={() =>
              navigation.navigate("ScheduleScreen", {
                busId: busId,
                busStopId: item.busStopId,
                busName: busName,
                direction: direction,
              })
            }
          >
            <Text>{item.busStop.name}</Text>
          </Button>
          <Divider leftInset bold />
        </>
      )}
    />
  );
};

const TabNavigator = ({ data, bus }) => {
  return (
    <Tab.Navigator style={{ backgroundColor: "red" }}>
      <Tab.Screen
        name={`Do: ${data[0].name}`}
        component={Table}
        initialParams={{
          busRouteDirectionId: data[0].id,
          busId: bus.busId,
          busName: bus.busName,
          direction: data[0].name,
        }}
      />
      <Tab.Screen
        name={`Do: ${data[1].name}`}
        component={Table}
        initialParams={{
          busRouteDirectionId: data[1].id,
          busId: bus.busId,
          busName: bus.busName,
          direction: data[1].name,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

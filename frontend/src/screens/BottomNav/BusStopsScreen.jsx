import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

//screens
import BusStopsList from "../BusStopsStackNav/BusStopsList";
import ScheduleScreen from "../BusStopsStackNav/ScheduleScreen";

const Stack = createNativeStackNavigator();

const BusStopsScreen = () => {
  const [scheduleScreenTitle, setScheduleScreenTitle] = useState("gówno");
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="BusStopsList"
          options={{ title: "Wybierz przystanek" }}
          component={BusStopsList}
        />
        <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BusStopsScreen;

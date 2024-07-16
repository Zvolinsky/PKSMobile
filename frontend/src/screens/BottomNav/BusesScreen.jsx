import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screens
import BusesList from "../BusesStackNav/BusesList";
import BusRouteScreen from "../BusesStackNav/BusRouteScreen";
import ScheduleScreen from "../BusesStackNav/ScheduleScreen";
import RouteScreen from "../BusesStackNav/RouteScreen";

const Stack = createNativeStackNavigator();

const BusesScreen = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="BusesList"
          options={{ title: "Wybierz linię" }}
          component={BusesList}
        />
        <Stack.Screen
          name="BusRouteScreen"
          options={{ title: "Wybierz przystanek" }}
          component={BusRouteScreen}
        />
        <Stack.Screen
          name="ScheduleScreen"
          options={{ title: "Rozkład jazdy" }}
          component={ScheduleScreen}
        />
        <Stack.Screen
          name="RouteScreen"
          options={{ title: "Trasa autobusu" }}
          component={RouteScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BusesScreen;

import { useState, useEffect } from "react";
import api from "../../services/api";

//elements
import { ScrollView, View } from "react-native";
import { Card, Text, Avatar, IconButton, useTheme } from "react-native-paper";

const ScheduleScreen = ({ route, navigation }) => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const { busStopId, busStopName } = route.params;
  const [departures, setDepartures] = useState(null);

  function getDepartures(busStopId) {
    fetch(
      `${api.getDepartures}?busStopId=${busStopId}&hour=${hour}&minute=${minute}&busRouteDirections=true`
    )
      .then((response) => response.json())
      .then((json) => {
        setDepartures(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    navigation.setOptions({ title: busStopName });
    getDepartures(busStopId);
  }, []);

  return (
    <View>
      {departures != null && (
        <ScrollView>
          {departures.map((item) => (
            <Card key={item.id} onPress={() => {}}>
              <Card.Title
                style={{ padding: 13 }}
                title={item.bus.number}
                titleVariant="displaySmall"
                subtitle={item.busRoute.busRouteDirection.name}
                subtitleVariant="titleMedium"
                right={() => (
                  <Text style={{ fontSize: 20 }}>
                    {String(item.hour).padStart(2, "0")}:
                    {String(item.minute).padStart(2, "0")}
                  </Text>
                )}
              />
              <Card.Content />
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ScheduleScreen;

import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import routeInfo, { infoDescription } from "../../enums/routeInfo";
import { groupByHours } from "../../utils/reduce";
import api from "../../services/api";

const ScheduleScreen = ({ route, navigation }) => {
  const { busId, busStopId, busName, direction } = route.params;
  const [departures, setDepartures] = useState(null);
  const [departureInfo, setDepartureInfo] = useState(null);

  function getDepartures(busId, busStopId) {
    fetch(
      `${api.getDepartures}?busId=${busId}&busStopId=${busStopId}&busRoutes=true`
    )
      .then((response) => response.json())
      .then((json) => {
        let groupedContent = groupByHours(json);
        setDepartures(groupedContent);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    setDepartures(null);
    getDepartures(busId, busStopId);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20, gap: 20 }}>
        <Text variant="displayMedium">Linia {busName}</Text>
        <Text style={{ fontSize: 22, width: "80%" }}>{direction}</Text>
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Gdz.</DataTable.Title>
          <DataTable.Title style={{ flex: 2 }}>Pn. - Pt.</DataTable.Title>
          <DataTable.Title>Soboty</DataTable.Title>
          <DataTable.Title>Święta</DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {departures != null &&
            departures.map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>{item.hour}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>
                  {item.departure.map(
                    (minute, index) =>
                      minute.dayOfWeek == 0 && (
                        <Button
                          key={index}
                          labelStyle={{
                            borderColor: "#96c",
                            borderWidth: 1,
                            padding: 4,
                            borderRadius: 10,
                          }}
                          onPress={() =>
                            navigation.navigate("RouteScreen", {
                              busId: busId,
                              busStopId: busStopId,
                              busName: busName,
                              direction: direction,
                              busRouteId: minute.busRouteId,
                            })
                          }
                        >
                          {String(minute.minute).padStart(2, "0")}
                          {minute.routeInfo.map((info) => (
                            <Text>{routeInfo[info]}</Text>
                          ))}
                        </Button>
                      )
                  )}
                </DataTable.Cell>
                <DataTable.Cell>
                  {item.departure.map(
                    (minute, index) =>
                      minute.dayOfWeek == 1 && (
                        <Button
                          key={index}
                          labelStyle={{
                            borderColor: "#96c",
                            borderWidth: 1,
                            padding: 4,
                            borderRadius: 10,
                          }}
                          onPress={() =>
                            navigation.navigate("RouteScreen", {
                              busId: busId,
                              busStopId: busStopId,
                              busName: busName,
                              direction: direction,
                              busRouteId: minute.busRouteId,
                            })
                          }
                        >
                          {String(minute.minute).padStart(2, "0")}
                          {minute.routeInfo.map((info) => (
                            <Text>{routeInfo[info]}</Text>
                          ))}
                        </Button>
                      )
                  )}
                </DataTable.Cell>
                <DataTable.Cell>
                  {item.departure.map(
                    (minute, index) =>
                      minute.dayOfWeek == 2 && (
                        <Button
                          key={index}
                          labelStyle={{
                            borderColor: "#96c",
                            borderWidth: 1,
                            padding: 4,
                            borderRadius: 10,
                          }}
                          onPress={() =>
                            navigation.navigate("RouteScreen", {
                              busId: busId,
                              busStopId: busStopId,
                              busName: busName,
                              direction: direction,
                              busRouteId: minute.busRouteId,
                            })
                          }
                        >
                          {String(minute.minute).padStart(2, "0")}
                          {minute.routeInfo.map((info) => (
                            <Text>{routeInfo[info]}</Text>
                          ))}
                        </Button>
                      )
                  )}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </ScrollView>
      </DataTable>
      <View style={{ marginTop: 20 }}>
        <Text>(Z) - {infoDescription.Z}</Text>
        <Text>+ - {infoDescription.plus}</Text>
        <Text>2-5 - {infoDescription.dwapięć}</Text>
        <Text>6ś - {infoDescription.sześćś}</Text>
        <Text>D - {infoDescription.D}</Text>
        <Text>S - {infoDescription.S}</Text>
        <Text>b - {infoDescription.b}</Text>
        <Text>g - {infoDescription.g}</Text>
        <Text>m - {infoDescription.m}</Text>
        <Text>e - {infoDescription.e}</Text>
      </View>
    </View>
  );
};

export default ScheduleScreen;

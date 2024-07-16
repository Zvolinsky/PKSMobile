import { PaperProvider as Paper, Button } from "react-native-paper";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import MyComponent from "./src/BottomNav";
import { SafeAreaViewBase } from "react-native";

export default () => (
  <Paper>
    <SafeAreaView style={{ flex: 1 }}>
      <MyComponent />
    </SafeAreaView>
  </Paper>
);

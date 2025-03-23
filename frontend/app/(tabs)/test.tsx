import { StyleSheet, Image, Platform, View, Text, Button } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabTwoScreen() {
  const handleOnPress = () => {
    console.log("hello");
  };

  return (
    <View style={{paddingTop: 40}}>
      <Text style={{ backgroundColor: "white" }}>Hello</Text>

      <Button title="hello uhbbnhbhbh" onPress={handleOnPress} />
    </View>
  );
}

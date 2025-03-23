import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
      <Link href="/" asChild>
        <Pressable style={{ padding: 10, backgroundColor: "#007AFF", borderRadius: 5 }}>
          <Text style={{ height: 40, color: "white", textAlign: "center", lineHeight: 40 }}>Home</Text>
        </Pressable>
      </Link>
    </View>
  );
}

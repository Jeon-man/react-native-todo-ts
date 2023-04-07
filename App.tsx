import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [working, setWorking] = useState<boolean>(true);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingHorizontal: 20,
      }}
    >
      <StatusBar style="auto" />
      <TodoHeader working={working} setWorking={setWorking} />
    </View>
  );
}

interface TodoHeaderProp {
  working: boolean;
  setWorking: (work: boolean) => void;
}

function TodoHeader({ working, setWorking }: TodoHeaderProp) {
  function changeWork() {
    setWorking(true);
  }

  function changeTravel() {
    setWorking(false);
  }

  return (
    <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: 100 }}>
      <TouchableOpacity>
        <Text
          style={{ fontSize: 40, fontWeight: "600", color: working ? "white" : "#3A3D40" }}
          onPress={changeWork}
        >
          Work
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={{ fontSize: 40, fontWeight: "600", color: !working ? "white" : "#3A3D40" }}
          onPress={changeTravel}
        >
          Travel
        </Text>
      </TouchableOpacity>
    </View>
  );
}

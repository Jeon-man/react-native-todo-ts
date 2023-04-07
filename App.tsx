import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
  const [working, setWorking] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [todo, setTodo] = useState<{}>({});

  function changeText(value: string) {
    setText(value);
  }

  async function addTodo() {
    if (text === "") {
      return;
    }
    const newTodo = { ...todo, [Date.now()]: { text, working } };
    setTodo(newTodo);
    await saveTodo(newTodo);
    setText("");
  }

  async function saveTodo(toSave: {}) {
    await AsyncStorage.setItem("@todo", JSON.stringify(toSave));
  }

  async function loadTodo() {
    const s = await AsyncStorage.getItem("@todo");
    s !== null ? setTodo(JSON.parse(s)) : null;
  }

  console.log(todo);

  useEffect(() => {
    loadTodo();
  });

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
      <TextInput
        style={{
          backgroundColor: "white",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 30,
          marginVertical: 20,
          fontSize: 18,
        }}
        placeholder={working ? "Add todo" : "Add travel"}
        returnKeyType="done"
        value={text}
        onChangeText={changeText}
        onSubmitEditing={addTodo}
      />
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

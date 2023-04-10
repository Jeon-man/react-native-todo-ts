import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
  const [working, setWorking] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [todo, setTodo] = useState<{}>({});

  function changeText(text: string) {
    setText(text);
    console.log;
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

  async function deleteTodo(id: string) {
    const newTodo: any = { ...todo };
    delete newTodo[id];
    setTodo(newTodo);
    await saveTodo(newTodo);
  }

  async function saveTodo(toSave: {}) {
    await AsyncStorage.setItem("@todo", JSON.stringify(toSave));
  }

  async function loadTodo() {
    const s = await AsyncStorage.getItem("@todo");
    s !== null ? setTodo(JSON.parse(s)) : null;
  }

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
        onChangeText={text => {
          setText(text);
          console.log(text);
        }}
        onSubmitEditing={addTodo}
      />
      <UpdateScrollView todo={todo} working={working} deleteTodo={deleteTodo} />
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

interface UpdateScrollViewProp {
  todo: any;
  working: boolean;
  deleteTodo: (id: string) => void;
}

function UpdateScrollView({ todo, working, deleteTodo }: UpdateScrollViewProp) {
  return (
    <ScrollView>
      {Object.keys(todo).map(key =>
        todo[key].working === working ? (
          <View
            style={{
              backgroundColor: "grey",
              marginBottom: 10,
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={key}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              {todo[key].text}
            </Text>
            <TouchableOpacity onPress={() => deleteTodo(key)}>
              <Fontisto name="trash" size={18} color="white" />
            </TouchableOpacity>
          </View>
        ) : null,
      )}
    </ScrollView>
  );
}

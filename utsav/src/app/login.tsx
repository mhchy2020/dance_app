import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  type Form = {
    email: string;
    password: string;
  };

  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  const handleChange = (field: keyof Form, text: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: text,
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.header}>Login to your Account</Text>
        <Text>Welcome back!</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
        />
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
        <Text style={{ alignSelf: "center" }}>or</Text>
        <Pressable
          style={styles.loginButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.loginText}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#dcb1f5",
    gap: 10,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#af40ef",
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#b86de3",
  },
  loginText: {
    fontSize: 20,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#fff",
  },
});

import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  type Form = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: keyof Form, text: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: text,
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Pressable style={styles.arrowContainer} onPress={() => router.back()}>
        <Ionicons style={styles.arrow} name="arrow-back" />
      </Pressable>
      <View style={styles.container}>
        <Text style={styles.header}>Join the dance family now!</Text>
        <Text>Sign in to explore more</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          secureTextEntry
        />
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginText}>Sign In</Text>
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
  arrowContainer: {
    margin: 10,
    width: 40,
    padding: 10,
    borderRadius: 200,
    backgroundColor: "#dec9f3",
  },
  arrow: {
    fontSize: 20,
    color: "#fff",
  },
});

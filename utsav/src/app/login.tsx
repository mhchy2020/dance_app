import { COLORS } from "@/constants/color";
import { useAuth } from "@/context/authContext";
import { Color, router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { login } = useAuth();

  type Form = {
    email: string;
    password: string;
  };

  type ErrorForm = Record<keyof Form, string>;

  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  const [errorForm, setErrorForm] = useState<Form>({
    email: "",
    password: "",
  });

  const [isFocused, setIsFocused] = useState<"email" | "password" | null>(null);

  const handleChange = (field: keyof Form, text: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: text,
    }));
  };

  const handleBlur = (field: keyof Form) => {
    setIsFocused(null);
    const error = validateField(false, field, form);

    setErrorForm((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateField = (
    showRequired: boolean,
    field: keyof Form,
    values: Form,
  ) => {
    const value = values[field];
    switch (field) {
      case "email":
        if (value.trim() === "") {
          return showRequired ? "Email cannot be empty" : "";
        }
        if (!value.includes("@")) {
          return "Incorrect email type";
        }
        return "";
      case "password":
        if (value.trim() === "") {
          return showRequired ? "Password cannot be empty" : "";
        }

        if (value.trim() !== "" && value.length < 8) {
          return "password has to be atleast 8 characters";
        }
        return "";
    }
  };

  const validateForm = (): ErrorForm => {
    return {
      email: validateField(true, "email", form),
      password: validateField(true, "password", form),
    };
  };

  const handleLogin = async () => {
    const errors = validateForm();
    setErrorForm(errors);
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) return;

    const { email, password } = form;
    try {
      await login(email, password);
      router.replace("/");
    } catch (err) {
      console.log(`[LOGIN ERROR]: ${err}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <View style={styles.container}> */}
        <Text style={styles.headerTwo}>Welcome back!</Text>
        <Text style={styles.header}>Login to your Account</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.fieldName}>Email</Text>
          <TextInput
            style={[
              styles.input,
              isFocused === "email" && styles.focusedInput,
              errorForm.email && styles.errorInputField,
            ]}
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            onBlur={() => handleBlur("email")}
            onFocus={() => {
              setIsFocused("email");
              setErrorForm((prev) => ({
                ...prev,
                email: "",
              }));
            }}
          />
          {errorForm.email !== "" && (
            <Text style={styles.errorText}>{errorForm.email}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.fieldName}>Password</Text>
          <TextInput
            style={[
              styles.input,
              isFocused === "password" && styles.focusedInput,
              errorForm.password && styles.errorInputField,
            ]}
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            onBlur={() => handleBlur("password")}
            onFocus={() => {
              setIsFocused("password");
              setErrorForm((prev) => ({
                ...prev,
                password: "",
              }));
            }}
            secureTextEntry
          />
          {errorForm.password !== "" && (
            <Text style={styles.errorText}>{errorForm.password}</Text>
          )}
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "gantariRegular",
              color: COLORS.primary,
              fontSize: 16,
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </Pressable>
        <View style={styles.signInContainer}>
          <Text style={{ fontSize: 15, fontFamily: "gantariRegular" }}>
            Don't have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("/register")}>
            <Text style={styles.signInText}>Sign In</Text>
          </Pressable>
        </View>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: "gantariBold",
    fontSize: 40,
    color: COLORS.primary,
  },
  headerTwo: {
    fontSize: 20,
    color: "#93879d",
    fontFamily: "gantariRegular",
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "gantariRegular",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#b5aaaa",
  },
  fieldName: {
    fontFamily: "gantariRegular",
  },
  inputContainer: {
    gap: 5,
  },
  focusedInput: {
    boxShadow: "0 0 6px #b86de3",
  },
  errorInputField: {
    borderColor: "#e23333",
    borderWidth: 1,
    boxShadow: "0 0 6px #f07171",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#b86de3",
  },
  loginText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "gantariRegular",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    gap: 3,
  },
  signInText: {
    color: COLORS.primary,
    borderBottomWidth: 1,
    borderColor: COLORS.primary,
    fontSize: 16,
    fontFamily: "gantariRegular",
  },
  errorText: {
    color: "#ec1010",
    fontFamily: "gantariRegular",
  },
});

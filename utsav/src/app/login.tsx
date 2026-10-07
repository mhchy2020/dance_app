import { useAuth } from "@/context/authContext";
import { router } from "expo-router";
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

  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isFocused, setIsFocused] = useState<"email" | "password" | null>(null);

  const handleChange = (field: keyof Form, text: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: text,
    }));
  };

  const handleEmailError = () => {
    setIsFocused(null);
    if (form.email.trim() === "") {
      return;
    }
    if (!form.email.includes("@")) {
      setEmailError("Incorrect email type");
    }
  };

  const handlePasswordError = () => {
    setIsFocused(null);
    if (form.password.trim() === "") {
      return;
    }
    if (form.password.trim() !== "" && form.password.length < 8) {
      setPasswordError("password has to be atleast 8 characters");
    }
  };

  const validateForm = () => {
    const { email, password } = form;
    const errors: Record<string, string> = {};
    if (emailError !== "") {
      errors.email = emailError;
    }

    if (passwordError !== "") {
      errors.password = passwordError;
    }

    if (email.trim() === "") {
      errors.email = "Email is required";
    }

    if (password.trim() === "") {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleLogin = async () => {
    // console.log(form);ghj
    const { email, password } = form;

    // call validateForm here
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      console.log("trouble logging in");
      console.log(`${errors.email}, ${errors.password}`);
      return;
    }

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
          <Text>Email</Text>
          <TextInput
            style={[
              styles.input,
              isFocused === "email" && styles.focusedInput,
              emailError && styles.errorInputField,
            ]}
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            onBlur={handleEmailError}
            onFocus={() => {
              setIsFocused("email");
              setEmailError("");
            }}
          />
          {emailError !== "" && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <TextInput
            style={[
              styles.input,
              isFocused === "password" && styles.focusedInput,
              passwordError && styles.errorInputField,
            ]}
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            onBlur={handlePasswordError}
            onFocus={() => {
              setIsFocused("password");
              setPasswordError("");
            }}
            secureTextEntry
          />
          {passwordError !== "" && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
        </View>
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </Pressable>
        <Text style={{ alignSelf: "center" }}>OR</Text>
        <Pressable
          style={styles.loginButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.loginText}>Sign In</Text>
        </Pressable>
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
    fontSize: 40,
    fontWeight: "bold",
    color: "#af40ef",
  },
  headerTwo: {
    fontSize: 20,
    color: "#93879d",
    fontStyle: "italic",
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    borderColor: "#b5aaaa",
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
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    color: "#ec1010",
  },
});

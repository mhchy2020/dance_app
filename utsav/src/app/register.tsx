import { useAuth } from "@/context/authContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const { register } = useAuth();

  type Form = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  type InputName = "name" | "email" | "password" | "confirmPassword";

  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorForm, setErrorForm] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isFocused, setIsFocused] = useState<InputName | null>(null);

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
      // setEmailError("Incorrect email type");
      setErrorForm((prev) => ({
        ...prev,
        email: "Incorrect email type",
      }));
    }
  };

  const handlePasswordError = () => {
    setIsFocused(null);
    if (form.password.trim() === "") {
      return;
    }
    if (form.password.trim() !== "" && form.password.length < 8) {
      setErrorForm((prev) => ({
        ...prev,
        password: "password has to be atleast 8 characters",
      }));
    }
  };

  const handleConfirmPassword = () => {
    setIsFocused(null);
    if (form.password !== form.confirmPassword) {
      setErrorForm((prev) => ({
        ...prev,
        confirmPassword: "Password doesn't match",
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const { name, email, password, confirmPassword } = errorForm;
    if (name === "") {
      errors.name = "Name cannot be empty";
    }
    if (email.trim() === "") {
      errors.email = "Email is required";
    }
    if (password.trim() === "") {
      errors.password = "Password is required";
    }
    if (confirmPassword.trim() === "") {
      errors.confirmPassword = "Please confirm the password";
    }
  };

  const handleSignIn = async () => {
    const { name, email, password } = form;
    try {
      await register(name, email, password);
      router.replace("/");
    } catch (err) {
      console.log("[REGISTER ERROR]", err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Pressable style={styles.arrowContainer} onPress={() => router.back()}>
        <Ionicons style={styles.arrow} name="arrow-back" />
      </Pressable>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={30}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.headerTwo}>Sign in to explore more</Text>
            <Text style={styles.header}>Join the dance family now!</Text>
            <View style={styles.inputContainer}>
              <Text>Name</Text>
              <TextInput
                style={[
                  styles.input,
                  isFocused === "name" && styles.focusedInput,
                ]}
                value={form.name}
                onChangeText={(text) => handleChange("name", text)}
                onFocus={() => setIsFocused("name")}
                onBlur={() => setIsFocused(null)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  isFocused === "email" && styles.focusedInput,
                  errorForm.email !== "" && styles.errorInputField,
                ]}
                value={form.email}
                onChangeText={(text) => handleChange("email", text)}
                onFocus={() => {
                  setErrorForm((prev) => ({
                    ...prev,
                    email: "",
                  }));
                  setIsFocused("email");
                }}
                onBlur={handleEmailError}
              />
              {errorForm.email !== "" && (
                <Text style={styles.errorText}>{errorForm.email}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  isFocused === "password" && styles.focusedInput,
                  errorForm.password !== "" && styles.errorInputField,
                ]}
                value={form.password}
                onChangeText={(text) => handleChange("password", text)}
                onFocus={() => {
                  setErrorForm((prev) => ({
                    ...prev,
                    password: "",
                  }));
                  setIsFocused("password");
                }}
                onBlur={handlePasswordError}
                secureTextEntry
              />
              {errorForm.password !== "" && (
                <Text style={styles.errorText}>{errorForm.password}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text>Confirm Password</Text>
              <TextInput
                style={[
                  styles.input,
                  isFocused === "confirmPassword" && styles.focusedInput,
                  errorForm.confirmPassword !== "" && styles.errorInputField,
                ]}
                value={form.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                onFocus={() => {
                  setErrorForm((prev) => ({
                    ...prev,
                    confirmPassword: "",
                  }));
                  setIsFocused("confirmPassword");
                }}
                onBlur={handleConfirmPassword}
                secureTextEntry
              />
              {errorForm.confirmPassword !== "" && (
                <Text style={styles.errorText}>
                  {errorForm.confirmPassword}
                </Text>
              )}
            </View>
            <Pressable style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInText}>Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#af40ef",
  },
  headerTwo: {
    fontSize: 20,
    color: "#93879d",
    fontStyle: "italic",
  },
  inputContainer: {
    gap: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    borderColor: "#b5aaaa",
  },
  focusedInput: {
    boxShadow: "0 0 6px #b86de3",
  },
  errorInputField: {
    borderColor: "#e23333",
    borderWidth: 1,
    boxShadow: "0 0 6px #f07171",
  },
  signInButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#b86de3",
  },
  signInText: {
    fontSize: 20,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    color: "#ec1010",
  },
  arrowContainer: {
    margin: 10,
    width: 40,
    padding: 10,
    borderRadius: 200,
    backgroundColor: "#af40ef",
  },
  arrow: {
    fontSize: 20,
    color: "#fff",
  },
});

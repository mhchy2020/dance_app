import { COLORS } from "@/constants/color";
import { useAuth } from "@/context/authContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Color, router } from "expo-router";
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

  type ErrorForm = Record<keyof Form, string>;

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

  const handleBlur = (field: keyof Form) => {
    setIsFocused(null);

    const error = validateField(field, form, false);

    setErrorForm((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateField = (
    field: keyof Form,
    values: Form,
    showRequired: boolean,
  ) => {
    const value = values[field];
    switch (field) {
      case "name":
        if (value.trim() === "") {
          return showRequired ? "Name cannot be empty" : "";
        }
        return "";

      case "email":
        if (value.trim() === "") {
          return showRequired ? "Email required" : "";
        }
        if (!value.includes("@")) {
          return "Incorrect email type";
        }
        return "";

      case "password":
        if (value.trim() === "") {
          return showRequired ? "Password is required" : "";
        }
        if (value.trim() !== "" && value.length < 8) {
          return "password has to be atleast 8 characters";
        }
        return "";

      case "confirmPassword":
        if (value.trim() === "") {
          return showRequired ? "Please confirm the password" : "";
        }
        if (value !== form.confirmPassword) {
          return "Password doesn't match";
        }
        return "";
    }
  };

  const validateForm = (): ErrorForm => {
    return {
      name: validateField("name", form, true),
      email: validateField("email", form, true),
      password: validateField("password", form, true),
      confirmPassword: validateField("confirmPassword", form, true),
    };
  };

  const handleSignIn = async () => {
    const errors = validateForm();

    setErrorForm(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      return;
    }

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
              <Text style={styles.fieldName}>Name</Text>
              <TextInput
                style={[
                  styles.input,
                  isFocused === "name" && styles.focusedInput,
                  errorForm.name !== "" && styles.errorInputField,
                ]}
                value={form.name}
                cursorColor={COLORS.primary}
                onChangeText={(text) => handleChange("name", text)}
                onFocus={() => setIsFocused("name")}
                onBlur={() => handleBlur("name")}
              />
              {errorForm.name !== "" && (
                <Text style={styles.errorText}>{errorForm.name}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.fieldName}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  isFocused === "email" && styles.focusedInput,
                  errorForm.email !== "" && styles.errorInputField,
                ]}
                value={form.email}
                keyboardType="email-address"
                cursorColor={COLORS.primary}
                onChangeText={(text) => handleChange("email", text)}
                onFocus={() => {
                  setErrorForm((prev) => ({
                    ...prev,
                    email: "",
                  }));
                  setIsFocused("email");
                }}
                onBlur={() => handleBlur("email")}
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
                  errorForm.password !== "" && styles.errorInputField,
                ]}
                value={form.password}
                cursorColor={COLORS.primary}
                onChangeText={(text) => handleChange("password", text)}
                onFocus={() => {
                  setErrorForm((prev) => ({
                    ...prev,
                    password: "",
                  }));
                  setIsFocused("password");
                }}
                onBlur={() => handleBlur("password")}
                secureTextEntry
              />
              {errorForm.password !== "" && (
                <Text style={styles.errorText}>{errorForm.password}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.fieldName}>Confirm Password</Text>
              <TextInput
                style={[
                  styles.input,
                  isFocused === "confirmPassword" && styles.focusedInput,
                  errorForm.confirmPassword !== "" && styles.errorInputField,
                ]}
                value={form.confirmPassword}
                cursorColor={COLORS.primary}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                onFocus={() => {
                  setErrorForm((prev) => ({
                    ...prev,
                    confirmPassword: "",
                  }));
                  setIsFocused("confirmPassword");
                }}
                onBlur={() => handleBlur("confirmPassword")}
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
    fontFamily: "gantariBold",
    color: COLORS.primary,
  },
  headerTwo: {
    fontSize: 20,
    color: "#93879d",
    fontFamily: "gantariRegular",
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
    fontFamily: "gantariRegular",
    borderColor: "#b5aaaa",
  },
  fieldName: {
    fontFamily: "gantariRegular",
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
    fontFamily: "gantariRegular",
    color: "#fff",
  },
  errorText: {
    color: "#ec1010",
    fontFamily: "gantariRegular",
  },
  arrowContainer: {
    margin: 10,
    width: 40,
    padding: 10,
    borderRadius: 200,
    backgroundColor: COLORS.primary,
  },
  arrow: {
    fontSize: 20,
    color: "#fff",
  },
});

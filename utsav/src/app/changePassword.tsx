import { apiRequest } from "@/api/client";
import Loader from "@/components/Loader";
import AlertBox from "@/components/Modal";
import { COLORS } from "@/constants/color";
import { useAuth } from "@/context/authContext";
import { refreshResponse } from "@/types/user";
import { ApiError } from "@/utils/ApiError";
import { getToken, storeTokens } from "@/utils/getToken";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChangePassword() {
  const insets = useSafeAreaInsets();

  const { logout } = useAuth();

  const error = useRef<Array<string>>([]);

  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);

  const handleModalShow = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
    }, 3000);

    return;
  };

  const handleError = () => {
    error.current = [];
    if (
      password.trim() === "" ||
      newPassword.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      error.current.push("Password can't be empty");
    }
    if (newPassword !== confirmPassword) {
      error.current.push("Passwords don't match");
    }
    return error.current;
  };

  const handleSubmit = async () => {
    const errors = handleError();
    if (errors.length > 0) {
      setIsVisible(true);
      return;
    }

    try {
      const accessToken = await getToken("accessToken");
      const response = await apiRequest<refreshResponse>("/auth/password", {
        method: "PATCH",
        token: accessToken,
        body: {
          password: [password, newPassword],
          token: accessToken,
        },
      });
      console.log("[/auth/password]", response.data);
      //store access and refresh token
      storeTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      router.back();
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === "REFRESH_TOKEN_EXPIRED") {
          handleModalShow();
        }
      }
    }
  };

  return loading ? (
    <Loader message={"Session Expired \n Logging Out"} />
  ) : (
    <View
      style={[
        styles.container,
        { marginTop: insets.top, marginBottom: insets.bottom },
      ]}
    >
      <Pressable onPress={() => router.replace("/profile")}>
        <Ionicons style={styles.arrow} name="chevron-back" />
      </Pressable>
      <Text style={styles.header}>Enter your current password</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="password@123"
        placeholderTextColor={"#c9c8c8"}
        cursorColor={COLORS.primary}
        // secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.header}>Enter your new password</Text>
      <TextInput
        style={styles.input}
        value={newPassword}
        placeholder="password@123"
        placeholderTextColor={"#c9c8c8"}
        cursorColor={COLORS.primary}
        // secureTextEntry
        onChangeText={(text) => setNewPassword(text)}
      />
      <Text style={styles.header}>Confirm password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        placeholder="password@123"
        placeholderTextColor={"#c9c8c8"}
        cursorColor={COLORS.primary}
        // secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
      <AlertBox
        isVisible={isVisible}
        errorText={error.current}
        onClose={() => setIsVisible(!isVisible)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 80,
    fontSize: 30,
  },
  header: {
    fontFamily: "gantariBold",
    fontSize: 35,
    padding: 5,
    color: COLORS.primary,
    marginTop: 20,
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    marginTop: "auto",
  },
  submitButtonText: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "gantariRegular",
  },
  arrow: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});

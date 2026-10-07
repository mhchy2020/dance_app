import { useAuth } from "@/context/authContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import {
  Image,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/color";
import { useEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import ExpandableView from "@/components/ExpandableView";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [name, setName] = useState<string | undefined>(user?.name);

  const iconRotation = useSharedValue<string>("0deg");

  const animatedChevron = useAnimatedStyle(() => {
    iconRotation.value = withSpring(`${!expanded ? 0 : 90}deg`, {
      damping: 15,
    });
    return {};
  });

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.log("[LOGOUT ERROR]: can't log out");
    }
  };

  return (
    <ScrollView
      style={[styles.scrollViewContainer, { marginTop: insets.top }]}
      contentContainerStyle={styles.container}
    >
      <View style={styles.photoContainer}>
        <Image
          source={require("utsav/src/assets/profile_picture.jpg")}
          style={styles.profileImage}
        />
        <Pressable style={styles.editProfilePhotoButton}>
          <Ionicons name="pencil-sharp" size={20} color="#fff" />
        </Pressable>
      </View>

      <View style={styles.userDetailsContainer}>
        <Text style={styles.name}>{user && user.name}</Text>
        <Text style={styles.email}>{user && user.email}</Text>
      </View>

      <Text
        style={{
          alignSelf: "flex-start",
          fontFamily: "gantariBold",
          marginTop: 10,
          fontSize: 17,
        }}
      >
        General
      </Text>

      <View style={styles.accountContainer}>
        <Pressable
          style={styles.accountContainerOne}
          onPress={() => {
            setExpanded(!expanded);
            animatedChevron;
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.accountContainerTwo}>
              <Ionicons name="person-outline" size={24} color="#b86de3" />
              <Text style={styles.accountText}>Name</Text>
            </View>

            <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
              <Ionicons name="chevron-forward" size={24} color="#b86de3" />
            </Animated.View>
          </View>

          <ExpandableView
            expanded={expanded}
            setExpanded={setExpanded}
            input={name}
            setInput={setName}
          />
        </Pressable>

        <Pressable
          style={styles.accountContainerOne}
          onPress={() => {
            setExpanded(!expanded);
            animatedChevron;
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.accountContainerTwo}>
              <Ionicons name="mail-outline" size={24} color="#b86de3" />
              <Text style={styles.accountText}>Email</Text>
            </View>

            <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
              <Ionicons name="chevron-forward" size={24} color="#b86de3" />
            </Animated.View>
          </View>

          <ExpandableView
            expanded={expanded}
            setExpanded={setExpanded}
            input={email}
            setInput={setEmail}
          />
        </Pressable>

        <Pressable
          style={[styles.accountContainerOne, { borderBottomWidth: 0 }]}
          onPress={() => {
            router.push("/changePassword");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.accountContainerTwo}>
              <Ionicons name="shield-half" size={24} color="#b86de3" />
              <Text style={styles.accountText}>Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#b86de3" />
          </View>
        </Pressable>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.logOutButton,
          pressed && styles.pressedButton,
        ]}
        onPress={handleLogOut}
      >
        {({ pressed }) => (
          <>
            <Ionicons name="exit-outline" color="#b86de3" size={24} />
            <Text style={[styles.logOutText, pressed && styles.pressedtext]}>
              Log Out
            </Text>
          </>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    alignItems: "center",
  },
  header: {
    marginTop: 10,
    fontSize: 30,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  photoContainer: {
    margin: 20,
  },
  editProfilePhotoButton: {
    position: "absolute",
    top: 165,
    left: 130,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
  },
  userDetailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  name: {
    fontSize: 30,
    color: COLORS.primary,
    fontFamily: "gantariBold",
  },
  email: {
    fontSize: 18,
    color: "#828080",
    fontFamily: "gantariRegular",
  },
  accountContainer: {
    padding: 10,
    margin: 10,
    width: "100%",
    backgroundColor: "#e3e3e3",
    borderRadius: 10,
    boxShadow: "2px 2px 4px #b86de3",
  },
  accountContainerOne: {
    width: "100%",
    padding: 12,
    borderBottomColor: "#bdbcbc",
    borderBottomWidth: 2,
  },
  accountContainerTwo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  accountText: {
    fontFamily: "gantariRegular",
    fontSize: 16,
    marginLeft: 13,
  },
  editButtonPrimary: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    width: "50%",
  },
  editButtonSecondary: {
    backgroundColor: "#fff",
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    borderColor: "#b5aaaa",
  },
  logOutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b86de3",
    // width: "100%",
  },
  pressedButton: {
    backgroundColor: "#cd9cea",
    borderColor: "#cd9cea",
  },
  logOutText: {
    fontSize: 20,
    fontFamily: "gantariRegular",
    color: "#b86de3",
  },
  pressedtext: {
    color: "#fff",
  },
});

import { useAuth } from "@/context/authContext";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/color";
import { useState } from "react";
import Animated from "react-native-reanimated";
import ExpandableView from "@/components/ExpandableView";
import ProfilePictureModal from "@/components/ProfilePictureModal";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const [activeIndex, setActiveIndex] = useState<number[]>([]);
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [name, setName] = useState<string | undefined>(user?.name);

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleToggle = (index: number) => {
    setActiveIndex((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index],
    );
  };

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.log("[LOGOUT ERROR]: can't log out");
    }
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const fields = [
    {
      title: "Name",
      icon: "person-outline",
      input: name,
      setInput: setName,
    },
    {
      title: "Email",
      icon: "mail-outline",
      input: email,
      setInput: setEmail,
    },
  ];

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
        <Pressable
          style={styles.editProfilePhotoButton}
          onPress={handleShowModal}
        >
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
        {fields.map((field, index) => (
          <Pressable
            key={index}
            style={styles.accountContainerOne}
            onPress={() => {
              handleToggle(index);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.accountContainerTwo}>
                <Ionicons name={field.icon as any} size={24} color="#b86de3" />
                <Text style={styles.accountText}>{field.title}</Text>
              </View>

              <Animated.View
                style={{
                  transform: [
                    { rotate: activeIndex.includes(index) ? "90deg" : "0deg" },
                  ],
                }}
              >
                <Ionicons name="chevron-forward" size={24} color="#b86de3" />
              </Animated.View>
            </View>

            <ExpandableView
              index={index}
              expanded={activeIndex.includes(index)}
              setActiveIndex={setActiveIndex}
              input={field.input}
              setInput={field.setInput}
            />
          </Pressable>
        ))}

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
            <Ionicons name="exit-outline" color={COLORS.primary} size={24} />
            <Text style={[styles.logOutText, pressed && styles.pressedtext]}>
              Log Out
            </Text>
          </>
        )}
      </Pressable>
      <ProfilePictureModal isVisible={showModal} onClose={handleShowModal} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    // alignItems: "center",
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
    alignItems: "center",
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
    marginVertical: 10,
    // width: "100%",
    backgroundColor: "#e3e3e3",
    borderRadius: 10,
    // boxShadow: `2px 2px 4px ${COLORS.primary}`,
    elevation: 2,
  },
  accountContainerOne: {
    // width: "100%",
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
    // justifyContent: "center",
    alignItems: "center",
    gap: 10,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    // width: "100%",
  },
  pressedButton: {
    backgroundColor: "#cd9cea",
    borderColor: "#cd9cea",
  },
  logOutText: {
    fontSize: 20,
    fontFamily: "gantariRegular",
    color: COLORS.primary,
  },
  pressedtext: {
    color: "#fff",
  },
});

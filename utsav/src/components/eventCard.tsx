import { COLORS } from "@/constants/color";
import { images } from "@/data/sliderImages";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type props = {
  image: keyof typeof images;
  date: string;
  title: string;
  description: string;
};

export default function EventCard({ image, date, title, description }: props) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image source={images[image]} style={styles.imageContainer} />
        <View style={styles.eventDetails}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={styles.dateTimeContainer}>
              <Ionicons
                name="calendar-outline"
                size={15}
                color={COLORS.primary}
              />
              <Text style={styles.date}>{date}</Text>
            </View>

            <View style={styles.dateTimeContainer}>
              <Ionicons name="time-outline" size={15} color={COLORS.primary} />
              <Text style={styles.date}>10.00 AM</Text>
            </View>
          </View>

          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.location}>Sydney Olympic Park</Text>
        </View>
        <Pressable
          onPress={() => router.push("/upcomingEvents")}
          style={{ alignSelf: "center" }}
        >
          <Ionicons
            name="arrow-forward-outline"
            size={24}
            color={COLORS.primary}
            style={{
              transform: [{ rotate: "315deg" }],
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    elevation: 4,
  },
  imageContainer: {
    height: 100,
    width: 100,
    resizeMode: "cover",
    borderRadius: 20,
  },
  eventDetails: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    gap: 2,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  date: {
    fontFamily: "gantariBold",
    fontSize: 15,
    color: COLORS.primary,
  },
  title: {
    fontFamily: "gantariBold",
    fontSize: 20,
    color: "#24164A",
  },
  location: {
    fontFamily: "gantariRegular",
    color: "#8d8b8b",
  },
});

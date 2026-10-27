import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { item } from "@/types/sliderItemType";

type props = {
  index: number;
  item: item;
  pageWidth: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

export default function SliderItem({ index, item, pageWidth, scrollX }: props) {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    if (pageWidth === 0) {
      return {};
    }

    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [
              (index - 1) * pageWidth,
              index * pageWidth,
              (index + 1) * pageWidth,
            ],
            [-pageWidth * 0.2, 0, pageWidth * 0.2],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [
              (index - 1) * pageWidth,
              index * pageWidth,
              (index + 1) * pageWidth,
            ],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[styles.itemContainer, { width: pageWidth }, rnAnimatedStyle]}
    >
      <Image source={item.image} style={styles.imageContainer} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.background}
      >
        <Text style={[styles.itemText, { fontFamily: "gantariRegular" }]}>
          {item.name}
        </Text>
        <Text style={styles.itemText}>{item.description}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: 400,
    width: 300,
    resizeMode: "cover",
    borderRadius: 20,
  },
  background: {
    position: "absolute",
    height: 400,
    width: 300,
    padding: 10,
    borderRadius: 20,
  },
  itemText: {
    fontFamily: "gantariBold",
    color: "#fff",
    fontSize: 24,
  },
});

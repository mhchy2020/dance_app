import { COLORS } from "@/constants/color";
import { router } from "expo-router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type props = {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  input: string | undefined;
  setInput: Dispatch<SetStateAction<string | undefined>>;
  field?: string;
};

export default function ExpandableView({
  expanded,
  setExpanded,
  input,
  setInput,
}: props) {
  const animatedHeight = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    const height = expanded
      ? withSpring(animatedHeight.value, { damping: 70 })
      : withSpring(0);
    return { height };
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;
    if (layoutHeight > 0) {
      animatedHeight.value = layoutHeight;
    }
  };

  return (
    <Animated.View style={[styles.animatedContainer, animatedStyle]}>
      <View onLayout={handleLayout} style={styles.wrappedView}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => {
              setExpanded(!expanded);
            }}
            style={[styles.editButtonPrimary, styles.editButtonSecondary]}
          >
            <Text style={{ color: COLORS.primary }}>Cancel</Text>
          </Pressable>
          <Pressable style={[styles.editButtonPrimary]}>
            <Text style={{ color: "#fff" }}>Update</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: "hidden",
  },
  wrappedView: {
    width: "100%",
    position: "absolute",
    padding: 15,
    gap: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  editButtonPrimary: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    width: "48%",
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
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
  submitButtonText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "gantariRegular",
  },
});

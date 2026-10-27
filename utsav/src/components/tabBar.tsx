import { View, StyleSheet, Pressable, LayoutChangeEvent } from "react-native";
import { useLinkBuilder, useTheme } from "expo-router/react-navigation";
import { BottomTabBarProps } from "expo-router/js-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabItem from "./tabItem";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.barContainer, { bottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        // console.log(options);
        // const label =
        //   options.tabBarLabel !== undefined
        //     ? options.tabBarLabel
        //     : options.title !== undefined
        //       ? options.title
        //       : route.name;

        const label = options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
            // data: {
            //   behavior: {
            //     scrollToTop:
            //       isFocused &&
            //       options.tabBarRepeatedPressBehavior?.scrollToTop !== false,
            //     popToTop:
            //       isFocused &&
            //       options.tabBarRepeatedPressBehavior?.popToTop !== false,
            //   },
            // },
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        // const onLongPress = () => {
        //   navigation.emit({
        //     type: "tabLongPress",
        //     target: route.key,
        //   });
        // };

        return (
          <View
            key={route.key}
            style={[
              styles.itemContainer,
              isFocused && styles.itemFocusedContainer,
              //   isFocused && animatedStyle,
            ]}
          >
            <Pressable
              key={route.key}
              // href={buildHref(route.name, route.params)}
              // accessibilityState={isFocused ? { selected: true } : {}}
              // accessibilityLabel={options.tabBarAccessibilityLabel}
              // testID={options.tabBarButtonTestID}
              onPress={onPress}
            >
              <TabItem label={label} isFocused={isFocused} />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    position: "absolute",
    flexDirection: "row",
    margin: 10,
    padding: 5,
    gap: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 30,
    boxShadow: "0 0 10px rgba(207, 139, 231, 0.78)",
    opacity: 0.9,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  itemFocusedContainer: {
    backgroundColor: "#c7c3c3a2",
    borderRadius: 20,
  },
});

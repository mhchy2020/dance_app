import SliderItem from "@/components/SliderItem";
import { LayoutChangeEvent, View } from "react-native";
import { useState } from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { item } from "@/types/sliderItemType";

type props = {
  data: item[];
};

export default function Slider({ data }: props) {
  const scrollX = useSharedValue(0);
  const [pageWidth, setPageWidth] = useState(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setPageWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      style={{
        // flex: 1,
        marginTop: 10,
      }}
    >
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => (
          <SliderItem
            index={index}
            item={item}
            pageWidth={pageWidth}
            scrollX={scrollX}
          />
        )}
        horizontal
        pagingEnabled
        removeClippedSubviews={false}
        onLayout={onLayout}
        onScroll={onScrollHandler}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

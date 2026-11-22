import { COLORS } from "@/constants/color";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import ImageScrollView from "@/components/ImageScrollView";

const MAX_IMAGES = 5;

export default function AddEventHighlight() {
  const insets = useSafeAreaInsets();

  const [contentHeight, setContentHeight] = useState<number>(50);

  const [pickedImagesUri, setPickedImagesUri] = useState<string[]>([]);

  const pickImages = async () => {
    if (pickedImagesUri.length === MAX_IMAGES) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });
    if (!result.canceled) {
      if (result.assets.length + pickedImagesUri.length > MAX_IMAGES) {
        return;
      }
      setPickedImagesUri((prev) => [
        ...prev,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  return (
    <View
      style={[styles.container, { marginTop: insets.top, paddingBottom: 20 }]}
    >
      {/* <View style={[styles.container]}> */}
      <Pressable onPress={() => router.back()} style={{ paddingVertical: 10 }}>
        <Ionicons name="arrow-back-outline" color={COLORS.primary} size={30} />
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.primaryHdr}>ADD EVENT HIGHLIGHTS.</Text>
          <Text style={styles.secondaryHdr}>
            Keep the energy alive after the last track
          </Text>
        </View>

        <View style={styles.formView}>
          <Text style={[styles.primaryHdr, { fontSize: 24 }]}>THE RECAP</Text>
          <View style={styles.fieldView}>
            <Text style={styles.fieldName}>Highlight Title</Text>
            <TextInput style={styles.input} cursorColor={COLORS.primary} />
          </View>

          <View style={[styles.fieldView, { flex: 1 }]}>
            <Text style={styles.fieldName}>Event Date</Text>
            <TextInput style={styles.input} cursorColor={COLORS.primary} />
          </View>

          <View style={styles.fieldView}>
            <Text style={styles.fieldName}>Location</Text>
            <TextInput style={styles.input} cursorColor={COLORS.primary} />
          </View>
          <View style={styles.fieldView}>
            <Text style={styles.fieldName}>Description</Text>
            <TextInput
              multiline
              textAlignVertical="top"
              cursorColor={COLORS.primary}
              onContentSizeChange={(event) =>
                setContentHeight(event.nativeEvent.contentSize.height)
              }
              style={[
                styles.input,
                { height: Math.max(contentHeight, 80), maxHeight: 120 },
              ]}
            />
          </View>
          <View style={styles.fieldView}>
            {/* <Text style={styles.fieldName}>Images</Text> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.fieldName}>Images</Text>
              {pickedImagesUri.length > 0 && (
                <Text style={styles.fieldName}>
                  {pickedImagesUri.length}/5 added
                </Text>
              )}
            </View>

            {pickedImagesUri.length > 0 && (
              <ImageScrollView
                pickedImagesUri={pickedImagesUri}
                setPickedImagesUri={setPickedImagesUri}
              />
            )}

            <Pressable style={[styles.uploadContainer]} onPress={pickImages}>
              <Ionicons name="image-outline" color={COLORS.primary} size={30} />
              <Text style={styles.uploadText}>Upload Event Images</Text>
              <Text style={styles.uploadTextSecondary}>Up to 5MB each</Text>
            </Pressable>
          </View>
          <Text style={[styles.fieldName, { fontSize: 12 }]}>
            Share your best moments
          </Text>
        </View>
      </ScrollView>
      <Pressable style={styles.publishButton}>
        <Text style={styles.buttonTxt}>Publish highlight</Text>
        <Ionicons
          name="arrow-forward-outline"
          size={18}
          color="#fff"
          style={{
            transform: [{ rotate: "315deg" }],
          }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 10,
  },
  primaryHdr: {
    fontFamily: "gantariExtraBold",
    fontSize: 35,
    lineHeight: 30,
    // color: "#fff",
  },
  secondaryHdr: {
    fontFamily: "gantariRegular",
    fontSize: 15,
    color: "#6a6767",
  },
  formView: {
    marginTop: 30,
    gap: 10,
  },
  fieldView: {
    gap: 5,
  },
  fieldName: {
    fontFamily: "gantariRegular",
    color: "#6a6767",
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "gantariRegular",
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
  },
  uploadContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(209, 206, 206, 0.5)",
    borderRadius: 15,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "rgba(167, 164, 164, 0.5)",
    padding: 20,
  },
  uploadText: { color: COLORS.primary, fontFamily: "gantariBold" },
  publishButton: {
    flexDirection: "row",
    gap: 5,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonTxt: {
    color: "#fff",
    fontFamily: "gantariRegular",
    fontSize: 18,
  },
  uploadTextSecondary: {
    fontSize: 12,
    color: "#6a6767",
    fontFamily: "gantariRegular",
  },
});

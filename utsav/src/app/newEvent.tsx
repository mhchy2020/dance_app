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
import { apiRequest } from "@/api/client";
import { useAuth } from "@/context/authContext";
import { tokenStorage } from "@/utils/getToken";

export default function AddEvent() {
  const insets = useSafeAreaInsets();

  const { user } = useAuth();

  const [contentHeight, setContentHeight] = useState<number>(50);
  const [pickedImagesUri, setPickedImagesUri] = useState<string[]>([]);

  const pickImages = async () => {
    if (pickedImagesUri.length >= 5) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });
    if (!result.canceled) {
      if (result.assets.length + pickedImagesUri.length > 5) {
        return;
      }
      setPickedImagesUri((prev) => [
        ...prev,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const handlePublishEvent = async () => {
    const accessToken = await tokenStorage.getAccessToken();
    try {
      const result = await apiRequest("/events", {
        method: "POST",
        body: {
          title: "Bharatnatyam",
          startDate: "2026/11/14",
          startTime: "10:00AM",
          location: "Regents Park",
          description: "Witness this beautiful dance form",
          Images: [],
        },
        token: accessToken,
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <Pressable onPress={() => router.back()} style={{ paddingVertical: 10 }}>
        <Ionicons name="arrow-back-outline" color={COLORS.primary} size={30} />
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.primaryHdr}>ADD UPCOMING EVENT.</Text>
          <Text style={styles.secondaryHdr}>
            Discover events, classes, dancers.
          </Text>
        </View>

        <View style={styles.formView}>
          <Text style={[styles.primaryHdr, { fontSize: 24 }]}>THE DETAILS</Text>
          <View style={styles.fieldView}>
            <Text style={styles.fieldName}>Event Title</Text>
            <TextInput style={styles.input} cursorColor={COLORS.primary} />
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={[styles.fieldView, { flex: 1 }]}>
              <Text style={styles.fieldName}>Date</Text>
              <TextInput style={styles.input} cursorColor={COLORS.primary} />
            </View>
            <View style={[styles.fieldView, { flex: 1 }]}>
              <Text style={styles.fieldName}>Start Time</Text>
              <TextInput style={styles.input} cursorColor={COLORS.primary} />
            </View>
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
            Add up to 5 images
          </Text>
        </View>
      </ScrollView>
      <Pressable
        style={[styles.publishButton, { marginBottom: insets.bottom }]}
        onPress={handlePublishEvent}
      >
        <Text style={styles.buttonTxt}>Publish event</Text>
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
    // backgroundColor: "#000000",
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

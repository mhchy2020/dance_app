import { COLORS } from "@/constants/color";
import { avatar } from "@/utils/avatar";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";

type imageType = {
  fileName: string | null | undefined;
  fileSize: number | undefined;
  uri: string;
};

export default function ProfilePictureModal() {
  const insets = useSafeAreaInsets();

  const avatars = avatar();

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [selectedImage, setSelectedImage] = useState<imageType>({
    fileName: "",
    fileSize: 0,
    uri: "",
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setActiveIndex(-1); // if an avatar is selected, it will be unselected
      const { fileName, fileSize, uri } = result.assets[0];
      setSelectedImage((prev) => ({ ...prev, fileName, fileSize, uri }));
    }
  };

  const handleAvatarPress = (index: number) => {
    setActiveIndex((current) => (current !== index ? index : -1));
  };

  const handleDeleteUri = () => {
    setSelectedImage({
      fileName: "",
      fileSize: 0,
      uri: "",
    });
  };

  return (
    <>
      <Pressable
        style={[styles.arrowContainer, { marginTop: insets.top }]}
        onPress={() => router.back()}
      >
        <Ionicons style={styles.arrow} name="arrow-back" />
      </Pressable>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.container}
      >
        <View style={styles.uploadImageContainer}>
          <Text style={styles.title}>Upload an image</Text>
          {selectedImage.uri !== "" ? (
            <View style={[styles.uploadContainer, { padding: 10 }]}>
              <Image
                source={{ uri: selectedImage.uri }}
                resizeMode="contain"
                style={styles.image}
              />

              <View style={styles.imageDetails}>
                {selectedImage.fileName && (
                  <Text style={{ fontFamily: "gantariBold" }}>
                    {selectedImage.fileName}
                  </Text>
                )}
                {selectedImage.fileSize && (
                  <Text
                    style={styles.imageDetailsText}
                  >{`${selectedImage.fileSize / 1000}KB`}</Text>
                )}
              </View>

              <Pressable style={styles.removeImage} onPress={handleDeleteUri}>
                <Ionicons name="trash-outline" color="#e52121" size={24} />
                <Text style={{ color: "#e52121", fontSize: 18 }}>Remove</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={[
                styles.uploadContainer,
                activeIndex !== -1 ? { opacity: 0.5 } : {},
              ]}
              disabled={activeIndex !== -1}
              onPress={pickImage}
            >
              <Ionicons
                name="cloud-upload-outline"
                color={COLORS.primary}
                size={30}
              />
              <Text style={styles.uploadText}>Upload</Text>
              <Text style={styles.uploadTextSecondary}>Max 5MB</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.partitionContainer}>
          <View style={styles.partitionBar}></View>
          <Text style={styles.partitionText}>OR</Text>
          <View style={styles.partitionBar}></View>
        </View>

        <View style={styles.uploadImageContainer}>
          <Text style={styles.title}>Choose your avatar</Text>

          <ScrollView
            style={{
              borderRadius: 15,
            }}
            contentContainerStyle={styles.avatarListContainer}
          >
            {avatars.map((avatar, index) => (
              <Pressable
                key={index}
                disabled={selectedImage.uri !== ""}
                onPress={() => handleAvatarPress(index)}
                style={
                  selectedImage.uri !== ""
                    ? { opacity: 0.5 }
                    : activeIndex === index
                      ? styles.avatarContainer
                      : {}
                }
              >
                <SvgXml xml={avatar} />
                {activeIndex === index && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-outline" size={15} color="#fff" />
                  </View>
                )}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View style={[styles.buttonContainer, { marginBottom: insets.bottom }]}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable
          onPress={() => router.back()}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={[styles.buttonText, { color: COLORS.primary }]}>
            Cancel
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    marginVertical: 10,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  uploadImageContainer: {
    flex: 1,
    gap: 5,
    paddingVertical: 20,
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
  },
  title: {
    fontFamily: "gantariBold",
    fontSize: 25,
    color: COLORS.primary,
  },
  uploadText: {
    fontFamily: "gantariRegular",
    fontSize: 16,
  },
  uploadTextSecondary: {
    fontFamily: "gantariRegular",
    fontSize: 13,
    color: "rgba(73, 71, 71, 0.5)",
  },
  imageDetails: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageDetailsText: {
    fontFamily: "gantariRegular",
    color: "rgba(73, 71, 71, 0.5)",
  },
  removeImage: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "#e52121",
    borderRadius: 35,
    padding: 10,
  },
  avatarListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(209, 206, 206, 0.5)",
    borderRadius: 15,
  },
  avatarContainer: {
    borderWidth: 2.5,
    borderColor: COLORS.primary,
    borderRadius: 20,
    padding: 5,
  },
  checkmark: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    left: 65,
    top: -5,
  },
  partitionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 5,
  },
  partitionBar: {
    width: "30%",
    height: 1,
    backgroundColor: "rgba(155, 153, 153, 0.5)",
    borderRadius: 10,
  },
  partitionText: {
    fontFamily: "gantariBold",
    fontSize: 13,
    color: COLORS.secondary,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#b86de3",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "gantariRegular",
    color: "#fff",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  arrowContainer: {
    marginHorizontal: 10,
    width: 40,
    padding: 10,
    borderRadius: 200,
    backgroundColor: COLORS.primary,
  },
  arrow: {
    fontSize: 20,
    color: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 18,
  },
});

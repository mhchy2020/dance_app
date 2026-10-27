import { COLORS } from "@/constants/color";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function ProfilePictureModal({
  isVisible,
  onClose,
}: ModalProps) {
  return (
    <View>
      <Modal visible={isVisible} transparent={true} animationType="fade">
        <Pressable style={{ flex: 1 }} onPress={onClose}></Pressable>
        <View style={styles.container}>
          {/* <View style={styles.modalBar}></View> */}
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => {
                onClose();
                router.push("/ProfilePictureUpload");
              }}
            >
              <Ionicons name="image-outline" color={COLORS.primary} size={24} />
              <Text style={[styles.buttonText, { color: COLORS.primary }]}>
                Upload image
              </Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Ionicons name="trash-outline" color="#e52121" size={24} />
              <Text style={[styles.buttonText, { color: "#e52121" }]}>
                Remove
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 240,
    left: 100,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 18,
  },
  modalBar: {
    height: "3%",
    width: "20%",
    alignSelf: "center",
    backgroundColor: "#525252",
    borderRadius: 10,
  },
  buttonContainer: {
    padding: 10,
    gap: 10,
  },
  button: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "gantariRegular",
  },
});

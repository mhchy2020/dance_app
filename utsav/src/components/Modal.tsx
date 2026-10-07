import Ionicons from "@react-native-vector-icons/ionicons";
import { Dispatch, SetStateAction } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type ModalProps = {
  isVisible: boolean;
  errorText: Array<string>;
  onClose: () => void;
};

export default function AlertBox({
  isVisible,
  errorText,
  onClose,
}: ModalProps) {
  return (
    <Modal animationType="none" transparent={true} visible={isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.alertBox}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-outline" size={24} />
          </Pressable>
          <View style={styles.alertHeader}>
            <Ionicons name="warning-outline" color="#fe4545" size={35} />
            {/* <Text style={styles.header}>Alert</Text> */}
          </View>

          {errorText.map((error, index) => (
            <Text key={index} style={styles.errors}>
              • {error.trim()}
              {/* {"\n"} */}
            </Text>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
  },
  closeButton: {
    alignItems: "flex-end",
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    paddingBottom: 10,
  },
  header: {
    fontSize: 40,
    fontFamily: "gantariBold",
    color: "#3d3b3b",
  },
  errors: {
    paddingVertical: 5,
    fontSize: 22,
    fontFamily: "gantariRegular",
  },
});

import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import COLORS_STYLE from "../../../utils/styles/colors";
import { useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
const ModalAddBankAccount: React.FC<{
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}> = ({ modalVisible, setModalVisible }) => {
  const [error, setError] = useState({ state: false, message: "" });
  const [value, setValue] = useState("");
  const submitCheck = () => {
    if (Number(value)) {
      setError({ state: false, message: "" });
    } else {
      setError({ state: true, message: "Nie masz tyle środków na koncie!" });
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Zmiany nie zostały wprowadzone!");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalLayout}>
        <View style={styles.modalView}>
          <Text style={styles.label}>Dodajesz nowy wydatek</Text>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => setValue(text)}
            keyboardType="numeric"
            placeholder="Podaj kwotę"
            placeholderTextColor={COLORS_STYLE.labelGrey}
          />

          <View style={styles.modalButtonsBox}>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalButtonText}>Anuluj</Text>
            </Pressable>
            <Text style={styles.textGold}>|</Text>
            <Pressable style={styles.modalButton} onPress={submitCheck}>
              <Text style={styles.modalButtonText}>Zapisz</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000006b",
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: COLORS_STYLE.tabGrey,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    color: COLORS_STYLE.basicGold,
    fontWeight: "500",
  },
  error: {
    color: COLORS_STYLE.red,
    marginBottom: 10,
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
  },
  textInput: {
    borderColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 0,
    color: "white",
    marginBottom: 20,
  },
  modalButtonsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    justifyContent: "center",
    width: "40%",
  },
  modalButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  textGold: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
  },
});

export default ModalAddBankAccount;

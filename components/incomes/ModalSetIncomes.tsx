import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateIncome } from "../../redux/incomes-slice";
import { useState } from "react";

const ModalSetIncome: React.FC<{
  modalVisible: boolean;
  selectedCatId: string;
  setModalVisible: (value: boolean) => void;
}> = ({ modalVisible, setModalVisible, selectedCatId }) => {
  const dispatch = useAppDispatch();
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );

  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState({ status: false, message: "" });

  const submitHandler = () => {
    if (value !== "" && value !== "0" && isNaN(Number(value)) === false) {
      dispatch(
        updateIncome({
          catId: selectedCatId,
          value: Number(value).toFixed(2),
          bankAccountId: activeBankAccountStore.accountId,
        })
      );
      setValue("");
      setModalVisible(!modalVisible);
    } else if (value === "") {
      setInputError({ status: true, message: "Kwota nie może być pusta!" });
    } else {
      setInputError({
        status: true,
        message: "Wprowadzona wartość nie jest liczbą!",
      });
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
          <Text style={styles.modalLabel}>Edytujesz miesięczny przychód</Text>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => setValue(text)}
            keyboardType="numeric"
            placeholder="Podaj kwotę"
            placeholderTextColor={COLORS_STYLE.labelGrey}
          />
          {inputError.status && (
            <Text style={styles.errorText}>{inputError.message}</Text>
          )}
          <View style={styles.modalButtonsBox}>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalButtonText}>Anuluj</Text>
            </Pressable>
            <Text style={styles.textGold}>|</Text>
            <Pressable style={styles.modalButton} onPress={submitHandler}>
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
  modalLabel: {
    fontSize: 20,
    marginBottom: 20,
    color: COLORS_STYLE.basicGold,
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
  },
  textInput: {
    borderColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 0,
    color: "white",
  },
  modalButtonsBox: {
    marginTop: 10,
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
  errorText: {
    marginVertical: 10,
    fontSize: 12,
    color: COLORS_STYLE.red,
    width: "100%",
    textAlign: "left",
    fontWeight: "700",
  },
});
export default ModalSetIncome;

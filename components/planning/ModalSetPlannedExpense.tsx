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
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addPlannedExpense } from "../../redux/expenses-slice";

const ModalSetPlannedExpense: React.FC<{
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  selectedCatId: string;
}> = ({ modalVisible, setModalVisible, selectedCatId }) => {
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
  const [error, setError] = useState({ status: false, message: "" });

  const submitHandler = () => {
    if (value !== "" && isNaN(Number(value)) === false) {
      if (Number(value) > 0) {
        dispatch(
          addPlannedExpense({
            catId: selectedCatId,
            value: value,
            currency: activeBankAccountStore.currency,
          })
        );
        setValue("");
        setError({ status: false, message: "" });
        setModalVisible(false);
      } else if (Number(value) <= 0) {
        setError({
          status: true,
          message: "Wprowadzona kwota musi być większa od 0!",
        });
      }
    } else {
      setError({
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
        Alert.alert("Wydatek nie został dodany!");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalLayout}>
        <View style={styles.modalView}>
          <Text style={styles.modalLabel}>Planujesz wydatki</Text>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => setValue(text)}
            keyboardType="numeric"
            placeholder="Podaj kwotę"
            placeholderTextColor={COLORS_STYLE.labelGrey}
          />
          {error.status && <Text style={styles.error}>{error.message}</Text>}
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
  label: {
    color: COLORS_STYLE.labelGrey,
    fontSize: 10,
    marginVertical: 10,
  },
  flatlistBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
  error: {
    color: COLORS_STYLE.red,
    marginVertical: 10,
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
  },
});
export default ModalSetPlannedExpense;

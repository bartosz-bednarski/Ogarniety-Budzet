import { Modal, View, Text, TextInput, Alert, StyleSheet } from "react-native";
import CustomButton from "../../../utils/ui/CustomButton";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addValueToFinantialTarget } from "../../../redux/piggyBank-slice";
import { ModalAddValueProps } from "../../../types/piggyBank";
import COLORS_STYLE from "../../../utils/styles/colors";

const ModalAddValue: React.FC<ModalAddValueProps> = ({
  targetValue,
  sumOfIncomes,
  id,
  setAddValueModalVisible,
  addValueModalVisible,
}) => {
  const dispatch = useAppDispatch();
  const activeBankAccountId = useAppSelector(
    (state) => state.bankAccounts.activeAccount.accountId
  );

  const [addedValue, setAddedValue] = useState("");
  const [addedValueError, setAddedValueError] = useState({
    status: false,
    message: "",
  });

  useEffect(() => {
    if (addedValue.length > 0) {
      setAddedValueError({ status: false, message: "" });
    }
  }, [addedValue]);

  const addValueSubmitHandler = () => {
    const reg = new RegExp(/^\d*(\.\d+)?$/);
    const maxIncomeValue = targetValue - sumOfIncomes;
    if (Number(addedValue) > 0 && reg.test(addedValue)) {
      setAddedValueError({ status: false, message: "" });
      if (Number(addedValue) <= maxIncomeValue) {
        const randomId = function (length = 6) {
          return Math.random()
            .toString(36)
            .substring(2, length + 2);
        };
        const incomeId = randomId(5);
        setAddedValueError({ status: false, message: "" });
        dispatch(
          addValueToFinantialTarget({
            id: id,
            value: addedValue,
            incomeId: incomeId,
            bankAccountId: activeBankAccountId,
          })
        );
        setAddValueModalVisible(!addValueModalVisible);
      } else {
        setAddedValueError({
          status: true,
          message: `Kwota do osiągnięcia celu wynosi ${maxIncomeValue}`,
        });
      }
    } else {
      setAddedValueError({
        status: true,
        message: "Kwota musi być większa od 0",
      });
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addValueModalVisible}
      onRequestClose={() => {
        Alert.alert("Zmiany nie zostały wprowadzone!");
        setAddValueModalVisible(!addValueModalVisible);
      }}
    >
      <View style={styles.modalLayout}>
        <View style={styles.modalView}>
          <Text style={styles.modalLabel}>Podaj kwotę</Text>
          <TextInput
            style={styles.textInput}
            value={addedValue}
            onChangeText={(text) => setAddedValue(text)}
            keyboardType="numeric"
            placeholder="1000"
            placeholderTextColor={COLORS_STYLE.labelGrey}
          />
          {addedValueError.status && (
            <Text style={styles.modalError}>{addedValueError.message}</Text>
          )}
          <CustomButton title="Zatwierdź" onPress={addValueSubmitHandler} />
          <CustomButton
            title="Anuluj"
            onPress={() => {
              setAddValueModalVisible(!addValueModalVisible);
              setAddedValue("");
            }}
          />
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
    width: "80%",
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
    gap: 20,
  },
  modalLabel: {
    fontSize: 20,
    color: COLORS_STYLE.basicGold,
  },
  modalError: {
    fontSize: 12,
    color: "red",
    marginBottom: 0,
  },
  textInput: {
    borderColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 0,
    color: "white",
    marginVertical: 0,
  },
});
export default ModalAddValue;

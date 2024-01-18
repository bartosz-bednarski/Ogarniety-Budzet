import { Modal, View, Text, TextInput, Alert, StyleSheet } from "react-native";
import CustomButton from "../../../utils/ui/CustomButton";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { addValueToFinantialTarget } from "../../../redux/piggyBank-slice";
import { ModalAddValueProps } from "../../../types/piggyBank";
const ModalAddValue: React.FC<ModalAddValueProps> = ({
  targetValue,
  sumOfIncomes,
  id,
  setAddValueModalVisible,
  addValueModalVisible,
}) => {
  const dispatch = useAppDispatch();
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
    console.log(addedValue);
    console.log(reg.test(addedValue));
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
          />
          {addedValueError.status && (
            <Text style={styles.modalError}>{addedValueError.message}</Text>
          )}
          <CustomButton title="Zatwierdź" onPress={addValueSubmitHandler} />
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
    backgroundColor: "#dddbdb",
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
    fontSize: 16,
    marginBottom: 20,
  },
  modalError: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    color: "black",
    marginBottom: 10,
  },
});
export default ModalAddValue;

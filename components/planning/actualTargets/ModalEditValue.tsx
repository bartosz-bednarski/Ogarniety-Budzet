import { Modal, View, Text, TextInput, Alert, StyleSheet } from "react-native";
import CustomButton from "../../../utils/ui/CustomButton";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { ModalEditValueProps } from "../../../types/piggyBank";
import { editFinantialTargetValue } from "../../../redux/piggyBank-slice";
const ModalEditValue: React.FC<ModalEditValueProps> = ({
  setEditModalVisible,
  editModalVisible,
  id,
}) => {
  const dispatch = useAppDispatch();
  const [editedTargetValue, setEditedTargetValue] = useState("");
  const [editedTargetValueError, setEditedTargetValueError] = useState({
    status: false,
    message: "",
  });
  useEffect(() => {
    if (editedTargetValue.length > 0) {
      setEditedTargetValueError({ status: false, message: "" });
    }
  }, [editedTargetValue]);
  const editValueSubmitHandler = () => {
    const reg = new RegExp(/^\d*(\.\d+)?$/);
    if (Number(editedTargetValue) > 0 && reg.test(editedTargetValue)) {
      setEditedTargetValueError({ status: false, message: "" });
      dispatch(
        editFinantialTargetValue({ id: id, targetValue: editedTargetValue })
      );
      setEditModalVisible(!editModalVisible);
    } else {
      setEditedTargetValueError({
        status: true,
        message: "Kwota musi być większa od 0",
      });
    }
    console.log("edited ok!");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editModalVisible}
      onRequestClose={() => {
        Alert.alert("Zmiany nie zostały wprowadzone!");
        setEditModalVisible(!editModalVisible);
      }}
    >
      <View style={styles.modalLayout}>
        <View style={styles.modalView}>
          <Text style={styles.modalLabel}>Podaj nową kwotę docelową</Text>
          <TextInput
            style={styles.textInput}
            value={editedTargetValue}
            onChangeText={(text) => setEditedTargetValue(text)}
            keyboardType="numeric"
          />
          {editedTargetValueError.status && (
            <Text style={styles.modalError}>
              {editedTargetValueError.message}
            </Text>
          )}
          <CustomButton title="Zatwierdź" onPress={editValueSubmitHandler} />
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
export default ModalEditValue;

import { Modal, View, Text, TextInput, Alert, StyleSheet } from "react-native";
import CustomButton from "../../../utils/ui/CustomButton";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { ModalEditValueProps } from "../../../types/piggyBank";
import { editFinantialTargetValue } from "../../../redux/piggyBank-slice";
import COLORS_STYLE from "../../../utils/styles/colors";

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
            placeholder="1000"
            placeholderTextColor={COLORS_STYLE.labelGrey}
          />
          {editedTargetValueError.status && (
            <Text style={styles.modalError}>
              {editedTargetValueError.message}
            </Text>
          )}
          <CustomButton title="Zatwierdź" onPress={editValueSubmitHandler} />
          <CustomButton
            title="Anuluj"
            onPress={() => {
              setEditModalVisible(!editModalVisible);
              setEditedTargetValue("");
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
    marginBottom: 0,
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
export default ModalEditValue;

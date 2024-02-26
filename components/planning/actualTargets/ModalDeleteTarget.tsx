import { Modal, View, Text, TextInput, Alert, StyleSheet } from "react-native";
import CustomButton from "../../../utils/ui/CustomButton";
import { ModalDeleteTargetProps } from "../../../types/piggyBank";
import COLORS_STYLE from "../../../utils/styles/colors";
import { useAppDispatch } from "../../../redux/hooks";
import { deleteFinantialTarget } from "../../../redux/piggyBank-slice";

const ModalDeleteTarget: React.FC<ModalDeleteTargetProps> = ({
  deleteTargetModalVisible,
  setDeleteTargetModalVisible,
  id,
}) => {
  const dispatch = useAppDispatch();

  const deleteTargetSubmitHandler = () => {
    dispatch(deleteFinantialTarget({ id: id }));
    setDeleteTargetModalVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={deleteTargetModalVisible}
      onRequestClose={() => {
        Alert.alert("Zmiany nie zostały wprowadzone!");
        setDeleteTargetModalVisible(!deleteTargetModalVisible);
      }}
    >
      <View style={styles.modalLayout}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>UWAGA</Text>
          <Text style={styles.modalText}>
            Po usunięciu celu finansowego wszystkie dane z nim powiązane zostaną
            usunięte.
          </Text>
          <Text style={styles.modalText}>
            Kwota wpłacona na ten cel zostanie dodana do kwoty wolnych
            oszczędności.
          </Text>
          <View style={styles.buttonsBox}>
            <CustomButton title="Usuń" onPress={deleteTargetSubmitHandler} />
            <CustomButton
              title="Anuluj"
              onPress={() => setDeleteTargetModalVisible(false)}
            />
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
  },
  modalHeader: {
    fontSize: 28,
    marginBottom: 10,
    color: COLORS_STYLE.red,
    textAlign: "center",
    fontWeight: "600",
  },
  modalText: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: "center",
    color: "white",
  },
  buttonsBox: {
    marginVertical: 10,
    gap: 20,
  },
});
export default ModalDeleteTarget;

import { Modal, View, Text, TextInput, Alert, StyleSheet } from "react-native";
import CustomButton from "../../../utils/ui/CustomButton";
import COLORS_STYLE from "../../../utils/styles/colors";
import { ModalRealisedTargetProps } from "../../../types/piggyBank";
import { useAppDispatch } from "../../../redux/hooks";
import { setTargetRealised } from "../../../redux/piggyBank-slice";
import { updateBankAccountStatusRealisedFinantialTarget } from "../../../redux/bankAccounts-slice";

const ModalRealisedTarget: React.FC<ModalRealisedTargetProps> = ({
  realisedTargetModalVisible,
  setRealisedTargetModalVisible,
  id,
  name,
  iconName,
  targetValue,
  incomes,
}) => {
  const dispatch = useAppDispatch();

  const sumOfIncomesByAccoutId: { accountId: string; value: number }[] = [];

  for (let i = 0; i < incomes.length; i++) {
    const accountIndex = sumOfIncomesByAccoutId.findIndex(
      (item) => item.accountId === incomes[i].bankAccountId
    );
    if (accountIndex === -1) {
      sumOfIncomesByAccoutId.push({
        accountId: incomes[i].bankAccountId,
        value: incomes[i].value,
      });
    } else {
      sumOfIncomesByAccoutId[accountIndex].value =
        sumOfIncomesByAccoutId[accountIndex].value + incomes[i].value;
    }
  }

  const realisedTargetSubmitHandler = () => {
    dispatch(
      setTargetRealised({
        name: name,
        iconName: iconName,
        targetValue: targetValue,
        id: id,
      })
    );
    sumOfIncomesByAccoutId.forEach((item) => {
      dispatch(
        updateBankAccountStatusRealisedFinantialTarget({
          accountId: item.accountId,
          value: item.value,
        })
      );
    });
    setRealisedTargetModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={realisedTargetModalVisible}
      onRequestClose={() => {
        Alert.alert("Zmiany nie zostały wprowadzone!");
        setRealisedTargetModalVisible(!realisedTargetModalVisible);
      }}
    >
      <View style={styles.modalLayout}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>
            Potwierdź wydanie pieniędzy na cel
          </Text>
          <Text style={styles.modalText}>
            Od sumy oszczędności zostanie odjęta kwota wydana na cel.
          </Text>

          <View style={styles.buttonsBox}>
            <CustomButton
              title="Potwierdź"
              onPress={realisedTargetSubmitHandler}
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
  modalHeader: {
    fontSize: 24,
    marginBottom: 10,
    color: COLORS_STYLE.green,
    textAlign: "center",
    fontWeight: "600",
  },
  modalText: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: "center",
  },
  buttonsBox: {
    marginVertical: 10,
    gap: 20,
  },
});
export default ModalRealisedTarget;

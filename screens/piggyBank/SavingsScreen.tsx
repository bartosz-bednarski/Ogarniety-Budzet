import {
  FlatList,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Navigation } from "../../types/global";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CustomButton from "../../utils/ui/CustomButton";
import { useState } from "react";
import { setBankAccountStatus } from "../../redux/piggyBank-slice";
import PieChart from "react-native-pie-chart";
import { numberWithSpaces } from "../../utils/numberWithSpaces";
import { setIncome, updateIncome } from "../../redux/incomes-slice";
import {
  addExpense,
  addPlannedExpense,
  setExpense,
  setPlannedExpense,
} from "../../redux/expenses-slice";
const SavingsScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const bankAccountStatus = useAppSelector(
    (state) => state.piggyBank.bankAccountStatus
  );
  const monthIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const categoriesIncomes = useAppSelector(
    (state) => state.incomesCategories.categoriesList
  );
  const categoriesExpenses = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  let monthIncomesSum;
  let bankAccountPlusIncomes;
  let monthExpensesSum;
  let totalBankAccount;
  if (monthIncomes.length > 0 && categoriesExpenses.length > 0) {
    monthIncomesSum = monthIncomes
      .map((item) => Number(item.value))
      .reduce((partialSum, a) => partialSum + a, 0);
    monthExpensesSum = categoriesExpenses
      .map((item) => Number(item.sum))
      .reduce((partialSum, a) => partialSum + a, 0);
    bankAccountPlusIncomes =
      Number(monthIncomesSum) + Number(bankAccountStatus);
    totalBankAccount = bankAccountPlusIncomes - monthExpensesSum;
  } else if (monthIncomes.length > 0) {
    monthIncomesSum = monthIncomes
      .map((item) => Number(item.value))
      .reduce((partialSum, a) => partialSum + a, 0);
    bankAccountPlusIncomes = bankAccountStatus;
    bankAccountPlusIncomes =
      Number(monthIncomesSum) + Number(bankAccountStatus);
    totalBankAccount = bankAccountPlusIncomes;
  } else {
    totalBankAccount = bankAccountStatus;
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [bankAccountInput, setBankAccountInput] = useState("");
  const [incomesInput, setIncomesInput] = useState("");
  const submitHandler = () => {
    if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) === 0 &&
      bankAccountInput.length > 0 &&
      incomesInput.length > 0
    ) {
      dispatch(setBankAccountStatus(bankAccountInput));
      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) > 0 &&
      bankAccountInput.length > 0 &&
      incomesInput.length > 0 &&
      Number(incomesInput) > Number(bankAccountInput)
    ) {
      const difference = Number(incomesInput) - Number(bankAccountInput) + 1;
      const income = Number(incomesInput);
      dispatch(setBankAccountStatus(1));
      dispatch(setIncome({ catId: "#DIFFINCOMES" }));
      dispatch(
        updateIncome({ catId: categoriesIncomes[0].catId, value: income })
      );
      // dispatch(setExpense("#DIFFEXPENSES"));
      dispatch(
        setPlannedExpense({
          catId: "#DIFFEXPENSES",
          iconName: "star",
          name: "Inne",
        })
      );
      dispatch(
        addPlannedExpense({ catId: "#DIFFEXPENSES", value: difference })
      );
      dispatch(addExpense({ catId: "#DIFFEXPENSES", value: difference }));
      setModalVisible(false);
    } else if (
      Number(bankAccountInput) > 0 &&
      Number(incomesInput) > 0 &&
      bankAccountInput.length > 0 &&
      incomesInput.length > 0 &&
      Number(bankAccountInput) > Number(incomesInput)
    ) {
      const difference = Number(bankAccountInput) - Number(incomesInput);
      const income = Number(incomesInput);
      dispatch(setBankAccountStatus(difference));
      dispatch(setIncome({ catId: "#DIFFINCOMES" }));
      dispatch(updateIncome({ catId: "#DIFFINCOMES", value: income }));
      setModalVisible(false);
    }
  };
  console.log(bankAccountStatus);
  return (
    <View style={styles.container}>
      {categoriesIncomes.length === 0 && (
        <View style={styles.buttonBox}>
          <CustomButton
            title="Dodaj kategorie przychodów"
            onPress={() =>
              navigation.navigate("settingsNavigator", {
                screen: "addNewIncomesCategory",
              })
            }
          />
        </View>
      )}
      {bankAccountStatus === 0 && categoriesIncomes.length > 0 && (
        <View style={styles.buttonBox}>
          <CustomButton
            title="Uzupełnij stan konta"
            onPress={() => setModalVisible(true)}
          />
        </View>
      )}
      {bankAccountStatus > 0 && (
        <GoldenFrame name="STAN KONTA" value={totalBankAccount} />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Dane nie zostały zapisane!");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalLayout}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Uzupełnij dane</Text>
            <Text style={styles.modalLabel}>
              Podaj swój stan konta na dzień dzisiejszy
            </Text>
            <TextInput
              style={styles.textInput}
              value={bankAccountInput}
              onChangeText={(text) => setBankAccountInput(text)}
              keyboardType="numeric"
              maxLength={10}
            />

            <Text style={styles.modalLabel}>
              Podaj kwotę przychodów uzyskanych w tym miesiącu
            </Text>
            <TextInput
              style={styles.textInput}
              value={incomesInput}
              onChangeText={(text) => setIncomesInput(text)}
              keyboardType="numeric"
              maxLength={10}
            />
            <Text style={styles.modalInfo}>
              Jeżeli nie uzyskałeś jeszcze przychodów w tym miesiącu wpisz 0. Po
              ich otrzymaniu wprowadź kwotę w zakładce "Przychody".
            </Text>
            <CustomButton title="Zatwierdź" onPress={submitHandler} />
          </View>
        </View>
      </Modal>
      {bankAccountStatus > 0 && (
        <>
          <Text style={styles.label}> Udziały w oszczędnościach</Text>
          <View style={styles.greyBoxContainer}>
            <PieChart
              widthAndHeight={120}
              series={[totalBankAccount]}
              sliceColor={[COLORS_STYLE.basicGold]}
              coverRadius={0.65}
              coverFill={COLORS_STYLE.tabGrey}
            />
            <View style={styles.greyBoxDetails}>
              <Text style={styles.greyBoxLabel}>Wolne oszczędności</Text>
              <Text style={styles.greyBoxGoldText}>
                {numberWithSpaces(totalBankAccount)} PLN
              </Text>
              <Text style={styles.greyBoxLabel}>Cele finnsowe</Text>
              <Text style={styles.greyBoxYellowText}>2 000 PLN</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  text: {
    color: "white",
  },
  buttonBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  modalLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000006b",
  },
  modalView: {
    margin: 20,
    width: "90%",
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
    fontWeight: "600",
  },
  modalLabel: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
    width: "100%",
    marginLeft: 5,
  },
  modalInfo: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
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
    marginBottom: 20,
  },
  label: {
    color: COLORS_STYLE.labelGrey,
    fontSize: 10,
    marginVertical: 10,
  },
  greyBoxContainer: {
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 20,
    borderRadius: 15,
  },
  greyBoxDetails: {
    width: "50%",
  },
  greyBoxLabel: {
    color: "white",
    fontSize: 12,
  },
  greyBoxGoldText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
  },
  greyBoxYellowText: {
    color: "yellow",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
  },
});
export default SavingsScreen;

import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import COLORS_STYLE from "../../utils/styles/colors";
import { Navigation } from "../../types/global";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import CircleNumberColorButton from "../../utils/ui/CircleNumberColorButton";
import CircleStringColorButton from "../../utils/ui/CircleStringColorButton";
import StripsColumn from "../../utils/ui/StripsColumn";
import ModalSetPlannedExpense from "../../components/planning/ModalSetPlannedExpense";
import UpdateBankAccountInfo from "../../components/informations/UpdateBankAccountInfo";
import UpdateExpensesCategoriesInfo from "../../components/informations/UpdateExpensesCategoriesInfo";
import Label from "../../utils/ui/Label";

const PlannedExpensesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const plannedExpensesStore = useAppSelector(
    (state) => state.expenses.plannedExpenses
  );
  const bankAccounts = useAppSelector((state) => state.bankAccounts.accounts);
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const categoriesExpenses = useAppSelector(
    (state) => state.expensesCategories.categoriesList
  );

  const [selectedCatId, setSelectedCatId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const bankAccountsActiveAccountIndexId = bankAccounts.findIndex(
    (item) => item.accountId === activeBankAccountStore.accountId
  );
  const indexOfCurrency = plannedExpensesStore.findIndex(
    (item) => item.currency === activeBankAccountStore.currency
  );
  const plannedExpenses =
    indexOfCurrency !== -1
      ? plannedExpensesStore[indexOfCurrency].expenses
      : [];
  const sumOfPlannedExpenses = plannedExpenses
    .map((item) => Number(item.value))
    .reduce((partialSum, a) => partialSum + a, 0);

  const stripsColumnData = plannedExpenses.map((item) => ({
    catId: item.catId,
    iconName: item.iconName,
    name: item.name,
    value: sumOfPlannedExpenses,
    sum: Number(item.value),
  }));

  const onPressHandler = (catId: string) => {
    setSelectedCatId(catId);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {categoriesExpenses.length === 0 &&
          bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus >
            0 && (
            <UpdateExpensesCategoriesInfo
              onPress={() =>
                navigation.navigate("settingsNavigator", {
                  screen: "addNewCategory",
                })
              }
            />
          )}
        {bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus ===
          0 && (
          <UpdateBankAccountInfo
            onPress={() => navigation.navigate("Oszczędności")}
          />
        )}
        {plannedExpenses.length > 0 && (
          <>
            <ModalSetPlannedExpense
              selectedCatId={selectedCatId}
              modalVisible={modalVisible}
              setModalVisible={(value) => setModalVisible(value)}
            />
            <GoldenFrame name="SUMA" value={sumOfPlannedExpenses} />
            <Label value="Edytuj zaplanowane wydatki" />
            <View style={styles.flatlistBox}>
              {plannedExpenses.map((item, index) => (
                <CircleNumberColorButton
                  key={item.catId}
                  iconName={item.iconName}
                  catId={item.catId}
                  value={item.value}
                  color={index}
                  onPressHandler={() => onPressHandler(item.catId)}
                />
              ))}

              <CircleStringColorButton
                iconName="add"
                catId="addNewExpenseCategoy"
                name="Dodaj nową kategorię"
                color={20}
                onPressHandler={() =>
                  navigation.navigate("settingsNavigator", {
                    screen: "addNewCategory",
                  })
                }
              />
            </View>
            <Label value="Zaplanowane wydatki" />
            <StripsColumn data={stripsColumnData} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  informationBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  buttonBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  scrollView: {
    flex: 1,
  },
  categoriesBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
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
});
export default PlannedExpensesScreen;

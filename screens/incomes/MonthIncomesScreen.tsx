import { Text, View, StyleSheet, ScrollView } from "react-native";
import pieChartColors from "../../utils/styles/pieChartColors";
import { useState } from "react";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CustomButton from "../../utils/ui/CustomButton";
import {
  CategoriesIncomesWithNames,
  CategoriesItemBoxData,
} from "../../types/incomes";
import { updateIncome } from "../../redux/incomes-slice";
import { Navigation } from "../../types/global";
import PieChartWithFrames from "../../components/incomes/PieChartWithFrames";
import StripsColumn from "../../utils/ui/StripsColumn";
import CircleNumberColorButton from "../../utils/ui/CircleNumberColorButton";
import CircleStringColorButton from "../../utils/ui/CircleStringColorButton";
import ModalSetIncome from "../../components/incomes/ModalSetIncomes";
import InfoDateUpdate from "../../utils/ui/InfoDateUpdate";
const MonthIncomesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.incomesCategories.categoriesList
  );

  const categoriesIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const bankAccounts = useAppSelector((state) => state.bankAccounts.accounts);
  const activeBankAccountStoreId = useAppSelector(
    (state) => state.bankAccounts.activeAccount.accountId
  );
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const bankAccountsActiveAccountIndexId = bankAccounts.findIndex(
    (item) => item.accountId === activeBankAccountStoreId
  );
  const monthIncomesActiveAccountIdIndex = categoriesIncomes.findIndex(
    (item) => item.bankAccountId === activeBankAccountStore.accountId
  );
  const sumOfMonthIncomes =
    monthIncomesActiveAccountIdIndex !== -1
      ? categoriesIncomes[monthIncomesActiveAccountIdIndex].categories
          .map((item) => Number(item.value))
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0;

  const circleColorButtonData: CategoriesItemBoxData =
    monthIncomesActiveAccountIdIndex !== -1
      ? categoriesIncomes[monthIncomesActiveAccountIdIndex].categories.map(
          (category, index) => ({
            catId: category.catId,
            value: category.value,
            color: index,
            ...categories.find((item) => item.catId === category.catId),
          })
        )
      : [];
  console.log("categories", categoriesIncomes);
  const categoriesIncomesWithNames: CategoriesIncomesWithNames =
    monthIncomesActiveAccountIdIndex !== -1
      ? categoriesIncomes[monthIncomesActiveAccountIdIndex].categories.map(
          (category, index) => ({
            ...category,
            color: pieChartColors[index],
            ...categories.find((item) => item.catId === category.catId),
          })
        )
      : [];
  const stripsColumnData = categoriesIncomesWithNames.map((item) => ({
    catId: item.catId,
    iconName: item.iconName,
    name: item.name,
    value: item.value,
    sum: item.value,
  }));
  const [selectedCatId, setSelectedCatId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const onPressHandler = (catId: string) => {
    setSelectedCatId(catId);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {(bankAccounts.length === 0 ||
          bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus ===
            0) && (
          <View style={styles.buttonBox}>
            <CustomButton
              title="Uzupełnij stan konta"
              onPress={() => navigation.navigate("Oszczędności")}
            />
          </View>
        )}
        {bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus > 0 &&
          sumOfMonthIncomes === 0 && (
            <InfoDateUpdate
              goldText="Nowy Miesiąc"
              whiteText="Uzupełnij swoje przychody"
              arrow="down"
            />
          )}
        {sumOfMonthIncomes > 0 && (
          <>
            <Text style={styles.label}>Zestawienie przychodów</Text>
            <PieChartWithFrames
              categoriesIncomesWithNames={categoriesIncomesWithNames}
              sumOfAllIncomes={sumOfMonthIncomes}
            />
            <StripsColumn data={stripsColumnData} />
          </>
        )}
        {categories.length > 0 &&
          bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus >
            0 && (
            <>
              <Text style={styles.label}>Kategorie przychodów</Text>

              <View style={styles.flatlistBox}>
                {circleColorButtonData.map((item, index) => (
                  <CircleNumberColorButton
                    key={item.catId}
                    iconName={item.iconName}
                    value={item.value}
                    color={index}
                    catId={item.catId}
                    onPressHandler={() => onPressHandler(item.catId)}
                  />
                ))}
                <CircleStringColorButton
                  iconName="add"
                  name="Dodaj nową Kategorie"
                  color={20}
                  catId="addNewIncomesCategory"
                  onPressHandler={() =>
                    navigation.navigate("settingsNavigator", {
                      screen: "addNewIncomesCategory",
                    })
                  }
                />
              </View>
              <ModalSetIncome
                modalVisible={modalVisible}
                setModalVisible={(value) => setModalVisible(value)}
                selectedCatId={selectedCatId}
              />
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
  informationText: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
  },
  buttonBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  flatlistBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sumOfIncomes: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    marginVertical: 10,
  },
  label: {
    color: COLORS_STYLE.labelGrey,
    fontSize: 10,
    marginVertical: 10,
  },
});
export default MonthIncomesScreen;

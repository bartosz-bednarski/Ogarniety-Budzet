import { View, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppSelector } from "../../redux/hooks";
import SquareGrayBox from "../../components/summary/SquareGrayBox";
import AnaliseGrayBox from "../../components/summary/AnaliseGrayBox";
import Label from "../../utils/ui/Label";
import randomId from "../../utils/randomIdFunction";
import RealisedTargetsBox from "../../components/piggyBank/savings/RealisedTargetsBox";
import UpdateBankAccountInfo from "../../components/informations/UpdateBankAccountInfo";

const MonthSummaryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const bankAccountsStore = useAppSelector(
    (state) => state.bankAccounts.accounts
  );
  const weekExpensesStore = useAppSelector(
    (state) => state.expenses.weekCategoriesExpenses
  );
  const monthExpensesStore = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  const monthIncomesStore = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const activeBankAccount = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const realisedTargetsStore = useAppSelector(
    (state) => state.piggyBank.realisedTargets
  );

  const bankAccounts = bankAccountsStore.filter(
    (item) => item.status === "OPEN"
  );

  const squareBoxesData = bankAccounts.map((item) => {
    const weekExpensesIndex = weekExpensesStore.findIndex(
      (i) => i.bankAccountId === item.accountId
    );
    const monthExpensesIndex = monthExpensesStore.findIndex(
      (i) => i.bankAccountId === item.accountId
    );
    const incomesIndex = monthIncomesStore.findIndex(
      (i) => i.bankAccountId === item.accountId
    );

    const weekExpensesSum =
      weekExpensesIndex !== -1
        ? weekExpensesStore[weekExpensesIndex].categories
            .map((i) => Number(i.sum))
            .reduce((partialSum, a) => partialSum + a, 0)
        : 0;
    const monthExpensesSum =
      monthExpensesIndex !== -1
        ? monthExpensesStore[monthExpensesIndex].categories
            .map((i) => Number(i.sum))
            .reduce((partialSum, a) => partialSum + a, 0)
        : 0;
    const incomesSum =
      incomesIndex !== -1
        ? monthIncomesStore[incomesIndex].categories
            .map((i) => Number(i.value))
            .reduce((partialSum, a) => partialSum + a, 0)
        : 0;
    return {
      accountName: item.accountName,
      accountId: item.accountId,
      currency: item.currency,
      accountStatus:
        Number(item.bankAccountStatus) + incomesSum - monthExpensesSum,
    };
  });

  const balanceGoldFrameData: {
    currency: string;
    expenses: number;
    incomes: number;
  }[] = [];

  if (monthExpensesStore.length > 0 && monthIncomesStore.length > 0) {
    for (let i = 0; i < bankAccounts.length; i++) {
      const weekExpensesIndex = weekExpensesStore.findIndex(
        (item) => item.bankAccountId === bankAccounts[i].accountId
      );
      const monthExpensesIndex = monthExpensesStore.findIndex(
        (item) => item.bankAccountId === bankAccounts[i].accountId
      );
      const incomesIndex = monthIncomesStore.findIndex(
        (item) => item.bankAccountId === bankAccounts[i].accountId
      );
      if (
        balanceGoldFrameData.find(
          (item) => item.currency === bankAccounts[i].currency
        ) === undefined
      ) {
        const sumOfMonthExpenses =
          monthExpensesIndex !== -1
            ? monthExpensesStore[monthExpensesIndex].categories
                .map((cat) => Number(cat.sum))
                .reduce((partialSum, a) => partialSum + a, 0)
            : 0;
        const sumOfWeekExpenses =
          weekExpensesIndex !== -1
            ? weekExpensesStore[weekExpensesIndex].categories
                .map((cat) => Number(cat.sum))
                .reduce((partialSum, a) => partialSum + a, 0)
            : 0;
        const sumOfMonthIncomes =
          incomesIndex !== -1
            ? monthIncomesStore[incomesIndex].categories
                .map((cat) => Number(cat.value))
                .reduce((partialSum, a) => partialSum + a, 0)
            : 0;
        balanceGoldFrameData.push({
          currency: bankAccounts[i].currency,
          expenses: sumOfMonthExpenses,
          incomes: sumOfMonthIncomes,
        });
      } else if (
        balanceGoldFrameData.find(
          (item) => item.currency === bankAccounts[i].currency
        ) !== undefined
      ) {
        const index = balanceGoldFrameData.findIndex(
          (arrItem) => arrItem.currency === bankAccounts[i].currency
        );
        const sumOfMonthExpenses =
          monthExpensesIndex !== -1
            ? (balanceGoldFrameData[index].expenses += monthExpensesStore[
                monthExpensesIndex
              ].categories
                .map((cat) => Number(cat.sum))
                .reduce((partialSum, a) => partialSum + a, 0))
            : 0;
        const sumOfWeekExpenses =
          weekExpensesIndex !== -1
            ? (balanceGoldFrameData[index].expenses += weekExpensesStore[
                weekExpensesIndex
              ].categories
                .map((cat) => Number(cat.sum))
                .reduce((partialSum, a) => partialSum + a, 0))
            : 0;
        const sumOfMonthIncomes =
          incomesIndex !== -1
            ? (balanceGoldFrameData[index].incomes += monthIncomesStore[
                incomesIndex
              ].categories
                .map((cat) => Number(cat.value))
                .reduce((partialSum, a) => partialSum + a, 0))
            : 0;
        balanceGoldFrameData[index] = {
          currency: balanceGoldFrameData[index].currency,
          expenses: sumOfMonthExpenses,
          incomes: sumOfMonthIncomes,
        };
      }
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {bankAccounts.length === 0 ||
          (bankAccounts[
            bankAccounts.findIndex(
              (i) => i.accountId === activeBankAccount.accountId
            )
          ].bankAccountStatus === 0 && (
            <UpdateBankAccountInfo
              onPress={() => navigation.navigate("Oszczędności")}
            />
          ))}
        {bankAccounts[
          bankAccounts.findIndex(
            (i) => i.accountId === activeBankAccount.accountId
          )
        ].bankAccountStatus > 0 && (
          <>
            <View style={styles.rowBoxWrap}>
              {squareBoxesData.map((item, index) => (
                <SquareGrayBox
                  key={item.accountId}
                  accountId={item.accountId}
                  index={index}
                  accountName={item.accountName}
                  accountStatus={item.accountStatus}
                  currency={item.currency}
                  widthStyle={squareBoxesData.length > 1 ? "48%" : "100%"}
                />
              ))}
            </View>
            {balanceGoldFrameData.map((item) => (
              <View key={randomId()}>
                <Label
                  value={`Analiza finansowa w ${item.currency}`}
                  key={randomId()}
                />
                <AnaliseGrayBox
                  key={item.currency}
                  expenses={item.expenses}
                  incomes={item.incomes}
                  currency={item.currency}
                />
              </View>
            ))}
            <Label value="Zrealizowane cele finansowe" />
            <RealisedTargetsBox
              realised={realisedTargetsStore.length > 0 ? true : false}
              onPress={() => {
                realisedTargetsStore.length > 0
                  ? navigation.navigate("Oszczędności")
                  : navigation.navigate("Planowanie", {
                      screen: "actualTargets",
                    });
              }}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 30,
    backgroundColor: COLORS_STYLE.backgroundBlack,
    alignItems: "center",
  },
  rowBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  pieChart: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    marginVertical: 20,
  },
  text: {
    color: "white",
  },

  rowBoxWrap: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
  },
  buttonBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
export default MonthSummaryScreen;

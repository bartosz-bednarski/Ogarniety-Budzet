import { Text, View, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppSelector } from "../../redux/hooks";
import PieChart from "react-native-pie-chart";
import pieChartColors from "../../utils/styles/pieChartColors";
import SquareGrayBox from "../../components/summary/SquareGrayBox";
import BalanceGoldFrame from "../../components/summary/BalanceGoldFrame";
import CustomButton from "../../utils/ui/CustomButton";
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

  const squareBoxesData = bankAccountsStore.map((item) => {
    const weekExpensesIndex = weekExpensesStore.findIndex(
      (i) => i.bankAccountId === item.accountId
    );
    const monthExpensesIndex = monthExpensesStore.findIndex(
      (i) => i.bankAccountId === item.accountId
    );
    const incomesIndex = monthIncomesStore.findIndex(
      (i) => i.bankAccountId === item.accountId
    );
    console.log("expenses", weekExpensesIndex);
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
  const pieChartData = bankAccountsStore.map((item) =>
    item.bankAccountStatus !== 0 ? item.bankAccountStatus : 1
  );
  const balanceGoldFrameData: {
    currency: string;
    expenses: number;
    incomes: number;
  }[] = [];
  if (monthExpensesStore.length > 0 && monthIncomesStore.length > 0) {
    for (let i = 0; i < bankAccountsStore.length; i++) {
      const weekExpensesIndex = weekExpensesStore.findIndex(
        (item) => item.bankAccountId === bankAccountsStore[i].accountId
      );
      const monthExpensesIndex = monthExpensesStore.findIndex(
        (item) => item.bankAccountId === bankAccountsStore[i].accountId
      );
      const incomesIndex = monthIncomesStore.findIndex(
        (item) => item.bankAccountId === bankAccountsStore[i].accountId
      );
      if (
        balanceGoldFrameData.find(
          (item) => item.currency === bankAccountsStore[i].currency
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
          currency: bankAccountsStore[i].currency,
          expenses: sumOfMonthExpenses,
          incomes: sumOfMonthIncomes,
        });
      } else if (
        balanceGoldFrameData.find(
          (item) => item.currency === bankAccountsStore[i].currency
        ) !== undefined
      ) {
        const index = balanceGoldFrameData.findIndex(
          (arrItem) => arrItem.currency === bankAccountsStore[i].currency
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
        {bankAccountsStore.length === 0 ||
          (bankAccountsStore[
            bankAccountsStore.findIndex(
              (i) => i.accountId === activeBankAccount.accountId
            )
          ].bankAccountStatus === 0 && (
            <View style={styles.buttonBox}>
              <CustomButton
                title="Uzupełnij stan konta"
                onPress={() => navigation.navigate("Oszczędności")}
              />
            </View>
          ))}
        {bankAccountsStore[
          bankAccountsStore.findIndex(
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
                />
              ))}
            </View>
            <View style={styles.pieChart}>
              <PieChart
                widthAndHeight={200}
                series={pieChartData}
                sliceColor={pieChartColors.slice(0, pieChartData.length)}
                coverRadius={0.6}
                coverFill={COLORS_STYLE.backgroundBlack}
              />
            </View>
            {balanceGoldFrameData.map((item) => (
              <BalanceGoldFrame
                key={item.currency}
                expenses={item.expenses}
                incomes={item.incomes}
                currency={item.currency}
              />
            ))}
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

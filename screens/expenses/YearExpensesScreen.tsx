import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import pieChartColors from "../../utils/styles/pieChartColors";
import { Navigation } from "../../types/global";
import { MONTHS } from "../../utils/months";
import MonthExpensesBox from "../../components/expenses/yearExpenses/MonthExpensesBox";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import YearsExpensesInfo from "../../components/informations/YearsExpensesInfo";
MONTHS;

const YearExpensesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  //TEST
  // const dateCheck = "2025-03-15T08:06:22.626Z";

  const activeBankAccountStoreId = useAppSelector(
    (state) => state.bankAccounts.activeAccount.accountId
  );
  const monthCategoriesExpensesStore = useAppSelector(
    (state) => state.expenses.monthCategoriesExpenses
  );
  const yearExpensesStore = useAppSelector(
    (state) => state.expenses.yearExpenses
  );
  const yearExpensesIndexOfCurrentId = yearExpensesStore.findIndex(
    (item) => item.bankAccountId === activeBankAccountStoreId
  );

  const yearExpenses =
    yearExpensesIndexOfCurrentId !== -1
      ? yearExpensesStore[yearExpensesIndexOfCurrentId].months
      : [];

  const monthCategoriesExpensesIndexOfCurrentId =
    monthCategoriesExpensesStore.findIndex(
      (item) => item.bankAccountId === activeBankAccountStoreId
    );

  const monthExpenses =
    monthCategoriesExpensesIndexOfCurrentId !== -1
      ? monthCategoriesExpensesStore[monthCategoriesExpensesIndexOfCurrentId]
          .categories
      : [
          {
            catId: "null",
            sum: 0,
          },
        ];

  const sumOfYearExpenses =
    yearExpenses !== null
      ? yearExpenses
          .map((item) => Number(item.sumOfAllExpenses))
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0;

  const sumOfMonthExpenses = monthExpenses
    .map((item) => Number(item.sum))
    .reduce((partialSum, a) => partialSum + a, 0);

  const sumOfAllExpenses = sumOfYearExpenses + sumOfMonthExpenses;

  const currentMonthExpensesBoxData = {
    //TEST
    // month: new Date(dateCheck).getMonth(),

    month: new Date().getMonth(),
    sumOfAllExpenses: sumOfMonthExpenses,
    categoriesExpenses: monthExpenses.map((item) => ({
      catId: item.catId,
      sum: item.sum,
      stillExsists: true,
    })),
  };
  return (
    <ScrollView style={styles.container}>
      {yearExpenses.length === 0 && <YearsExpensesInfo />}
      {yearExpenses.length > 0 && (
        <>
          <GoldenFrame
            name="SUMA"
            value={Math.abs(Number(sumOfAllExpenses.toFixed(2)))}
          />
          <View style={styles.yearChart}>
            <PieChart
              widthAndHeight={200}
              series={[
                ...yearExpenses.map((item) =>
                  item.sumOfAllExpenses > 0
                    ? String(item.sumOfAllExpenses).length > 5
                      ? Number(String(item.sumOfAllExpenses).slice(0, 5))
                      : item.sumOfAllExpenses
                    : 1
                ),
                sumOfMonthExpenses === 0 ? 1 : sumOfMonthExpenses,
              ]}
              sliceColor={pieChartColors.slice(0, yearExpenses.length + 1)}
              coverRadius={0.6}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
            <View style={styles.yearChartLegend}>
              {yearExpenses.map((item, index) => (
                <Text style={{ color: pieChartColors[index] }} key={item.month}>
                  {MONTHS[item.month]}
                </Text>
              ))}
              <Text style={{ color: pieChartColors[yearExpenses.length] }}>
                {/* {TEST} */}
                {/* {MONTHS[new Date(dateCheck).getMonth()]} */}
                {MONTHS[new Date().getMonth()]}
              </Text>
            </View>
          </View>
          <View style={styles.monthIncomesBox}>
            {yearExpenses.map((month) => (
              <MonthExpensesBox monthExpenses={month} key={month.month} />
            ))}
            <MonthExpensesBox monthExpenses={currentMonthExpensesBoxData} />
          </View>
        </>
      )}
    </ScrollView>
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
  container: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  text: {
    color: "white",
  },
  yearChart: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  yearChartLegend: {
    marginVertical: 15,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  monthIncomesBox: {
    gap: 15,
  },
});
export default YearExpensesScreen;

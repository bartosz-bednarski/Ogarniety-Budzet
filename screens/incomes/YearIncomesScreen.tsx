import { Text, View, StyleSheet, ScrollView } from "react-native";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppSelector } from "../../redux/hooks";
import pieChartColors from "../../utils/styles/pieChartColors";
import { MONTHS } from "../../utils/months";
import MonthIncomesBox from "../../components/incomes/yearIncomes/MonthIncomesBox";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import randomId from "../../utils/randomIdFunction";
import YearIncomesInfo from "../../components/informations/YearIncomesInfo";

const YearIncomesScreen = () => {
  //TEST
  // const dateCheck = "2025-03-15T08:06:22.626Z";

  const currentMonthIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const yearIncomes = useAppSelector((state) => state.incomes.yearIncomes);
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  const currentMonthIncomesActiveAccountIdIndex = currentMonthIncomes.findIndex(
    (item) => item.bankAccountId === activeBankAccountStore.accountId
  );
  const yearIncomesActiveAccountIdIndex = yearIncomes.findIndex(
    (item) => item.bankAccountId === activeBankAccountStore.accountId
  );
  const sumOfCurrentMonthIncomes =
    currentMonthIncomes.length > 0
      ? currentMonthIncomes[currentMonthIncomesActiveAccountIdIndex].categories
          .map((item) => Number(item.value))
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0;

  const sumOfYearIncomes =
    yearIncomes[yearIncomesActiveAccountIdIndex] !== undefined
      ? yearIncomes[yearIncomesActiveAccountIdIndex].months
          .map((item) => Number(item.sumOfAllIncomes))
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0;

  const sumOfAllIncomes = sumOfYearIncomes + sumOfCurrentMonthIncomes;

  const currentMonthIncomesBoxData = {
    //TEST
    // month: new Date(dateCheck).getMonth(),

    month: new Date().getMonth(),
    sumOfAllIncomes: sumOfCurrentMonthIncomes,
    categoriesIncomes:
      currentMonthIncomes.length > 0
        ? currentMonthIncomes[
            currentMonthIncomesActiveAccountIdIndex
          ].categories.map((item) => ({
            catId: item.catId,
            value: item.value,
            stillExsists: true,
          }))
        : [],
  };

  return (
    <ScrollView style={styles.container}>
      {yearIncomes[yearIncomesActiveAccountIdIndex] === undefined && (
        <YearIncomesInfo />
      )}
      {yearIncomes[yearIncomesActiveAccountIdIndex] !== undefined && (
        <>
          <GoldenFrame name="SUMA" value={sumOfAllIncomes} />
          <View style={styles.yearChart}>
            <PieChart
              widthAndHeight={200}
              series={[
                ...yearIncomes[yearIncomesActiveAccountIdIndex].months.map(
                  (item) =>
                    item.sumOfAllIncomes === 0 ? 1 : item.sumOfAllIncomes
                ),
                sumOfCurrentMonthIncomes === 0 ? 1 : sumOfCurrentMonthIncomes,
              ]}
              sliceColor={pieChartColors.slice(
                0,
                yearIncomes[yearIncomesActiveAccountIdIndex].months.length + 1
              )}
              coverRadius={0.6}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
            <View style={styles.yearChartLegend}>
              {yearIncomes[yearIncomesActiveAccountIdIndex].months.map(
                (item, index) => (
                  <Text
                    style={{ color: pieChartColors[index] }}
                    key={randomId()}
                  >
                    {MONTHS[item.month]}
                  </Text>
                )
              )}
              <Text
                style={{
                  color:
                    pieChartColors[
                      yearIncomes[yearIncomesActiveAccountIdIndex].months.length
                    ],
                }}
              >
                {/*TEST*/}
                {/* {MONTHS[new Date(dateCheck).getMonth()]} */}
                {MONTHS[new Date().getMonth()]}
              </Text>
            </View>
          </View>
          <View style={styles.monthIncomesBox}>
            {yearIncomes[yearIncomesActiveAccountIdIndex].months.map(
              (month) => (
                <MonthIncomesBox monthIncomes={month} key={randomId()} />
              )
            )}
            <MonthIncomesBox monthIncomes={currentMonthIncomesBoxData} />
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
export default YearIncomesScreen;

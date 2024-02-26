import { Text, View, StyleSheet, ScrollView } from "react-native";
import PieChart from "react-native-pie-chart";
import pieChartColors from "../../utils/styles/pieChartColors";
import COLORS_STYLE from "../../utils/styles/colors";
import { useAppSelector } from "../../redux/hooks";
import YearIncomesBox from "../../components/incomes/yearsIncomes/YearIncomesBox";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import YearsIncomesInfo from "../../components/informations/YearsIncomesInfo";

const YearsIncomesScreen = () => {
  const yearsIncomes = useAppSelector((state) => state.incomes.yearsIncomes);
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );

  const yearsIncomesActiveAccountIdIndex = yearsIncomes.findIndex(
    (item) => item.bankAccountId === activeBankAccountStore.accountId
  );

  const sumOfAllIncomes =
    yearsIncomes.length > 0
      ? yearsIncomes[yearsIncomesActiveAccountIdIndex].years
          .map((item) => Number(item.sumOfAllIncomes))
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0;
  return (
    <ScrollView style={styles.container}>
      {yearsIncomes.length === 0 && <YearsIncomesInfo />}
      {yearsIncomes.length > 0 && (
        <>
          <GoldenFrame name="SUMA" value={Number(sumOfAllIncomes.toFixed(2))} />
          <View style={styles.yearChart}>
            <PieChart
              widthAndHeight={200}
              series={yearsIncomes[yearsIncomesActiveAccountIdIndex].years.map(
                (item) => item.sumOfAllIncomes
              )}
              sliceColor={pieChartColors.slice(
                0,
                yearsIncomes[yearsIncomesActiveAccountIdIndex].years.length
              )}
              coverRadius={0.6}
              coverFill={COLORS_STYLE.backgroundBlack}
            />
            <View style={styles.yearChartLegend}>
              {yearsIncomes[yearsIncomesActiveAccountIdIndex].years.map(
                (item, index) => (
                  <Text
                    style={{ color: pieChartColors[index] }}
                    key={item.year}
                  >
                    {item.year}
                  </Text>
                )
              )}
            </View>
          </View>
          <View style={styles.monthIncomesBox}>
            {yearsIncomes[yearsIncomesActiveAccountIdIndex].years.map(
              (year) => (
                <YearIncomesBox yearIncomes={year} key={year.year} />
              )
            )}
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
export default YearsIncomesScreen;

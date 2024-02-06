import { StyleSheet, Text, View, Pressable } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import PieChart from "react-native-pie-chart";
import { Ionicons } from "@expo/vector-icons";
import { numberWithSpaces } from "../../utils/numberWithSpaces";
import { useAppSelector } from "../../redux/hooks";
const YearsSummaryBox: React.FC<{
  data: { year: number; expenses: number; incomes: number; savings: number };
}> = ({ data }) => {
  const currency = useAppSelector(
    (state) => state.currency.currentCurrency.currencyCode
  );
  const pieChartData = [
    data.incomes !== 0
      ? Number(((data.expenses / data.incomes) * 100).toFixed(2))
      : 1,
    100 - Number(((data.expenses / data.incomes) * 100).toFixed(2)) < 0
      ? 0
      : 100 - Number(((data.expenses / data.incomes) * 100).toFixed(2)),
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.monthName}>{data.year}</Text>
      <View style={styles.box}>
        <View style={styles.mainBox}>
          <View style={styles.chartBox}>
            <PieChart
              widthAndHeight={120}
              series={pieChartData}
              sliceColor={["red", "green"]}
              coverRadius={0.6}
              coverFill={COLORS_STYLE.tabGrey}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.whiteLabel}>Przychody</Text>
            <View style={styles.rowText}>
              <Ionicons
                name="trending-up-outline"
                color={COLORS_STYLE.basicGold}
                size={16}
              />
              <Text style={styles.value}>
                {numberWithSpaces(data.incomes)} {currency}
              </Text>
            </View>
            <Text style={styles.whiteLabel}>Wydatki</Text>
            <View style={styles.rowText}>
              <Ionicons
                name="trending-down-outline"
                color={COLORS_STYLE.basicGold}
                size={16}
              />
              <Text style={styles.value}>
                {numberWithSpaces(data.expenses)} {currency}
              </Text>
            </View>
            <Text style={styles.whiteLabel}>Oszczędności</Text>
            <View style={styles.rowText}>
              <Ionicons
                name="wallet-outline"
                color={COLORS_STYLE.basicGold}
                size={16}
              />
              <Text style={styles.value}>
                {numberWithSpaces(data.savings)} {currency}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 5,
  },
  box: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
  },
  monthName: {
    fontSize: 20,
    color: "white",
    marginLeft: 5,
  },
  mainBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  chartBox: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  textWhiteBig: {
    width: "100%",
    fontSize: 26,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
  details: {
    width: "60%",
  },
  value: {
    fontSize: 24,
    textAlign: "left",
    color: COLORS_STYLE.basicGold,
  },
  rowText: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: COLORS_STYLE.basicGold,
  },
  whiteLabel: {
    color: "white",
    fontSize: 10,
  },
});
export default YearsSummaryBox;

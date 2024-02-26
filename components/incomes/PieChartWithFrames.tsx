import { View, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";
import FrameUnderlineSmall from "../../utils/ui/FrameUnderlineSmall";
import COLORS_STYLE from "../../utils/styles/colors";
import { CategoriesIncomesWithNames } from "../../types/incomes";

const PieChartWithFrames: React.FC<{
  categoriesIncomesWithNames: CategoriesIncomesWithNames;
  sumOfAllIncomes: number;
}> = ({ categoriesIncomesWithNames, sumOfAllIncomes }) => {
  return (
    <View style={styles.expensesCategories}>
      <PieChart
        widthAndHeight={120}
        series={categoriesIncomesWithNames.map((item) => item.value)}
        sliceColor={categoriesIncomesWithNames.map((item) => item.color)}
        coverRadius={0.6}
        coverFill={COLORS_STYLE.backgroundBlack}
      />
      <View style={styles.topFramesBox}>
        <FrameUnderlineSmall
          textUp="SUMA"
          textDown={sumOfAllIncomes}
          mainColor={COLORS_STYLE.basicGold}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topFramesBox: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 15,
    width: "55%",
  },
  expensesCategories: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "auto",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
});
export default PieChartWithFrames;

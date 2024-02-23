import { View, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";
import FrameUnderlineSmall from "../../utils/ui/FrameUnderlineSmall";
import COLORS_STYLE from "../../utils/styles/colors";
import { CategoriesExpensesWithNames } from "../../types/expenses";

const PieChartWithFrames: React.FC<{
  categoriesExpensesWithNames: CategoriesExpensesWithNames;
  sumOfAllExpenses: number;
  toSpend: number;
}> = ({ categoriesExpensesWithNames, sumOfAllExpenses, toSpend }) => {
  return (
    <View style={styles.expensesCategories}>
      <PieChart
        widthAndHeight={120}
        series={categoriesExpensesWithNames.map((item) => item.sum)}
        sliceColor={categoriesExpensesWithNames.map((item) => item.color)}
        coverRadius={0.6}
        coverFill={COLORS_STYLE.backgroundBlack}
      />
      <View style={styles.topFramesBox}>
        <FrameUnderlineSmall
          textUp="SUMA"
          textDown={Number(sumOfAllExpenses.toFixed(2))}
          mainColor={COLORS_STYLE.basicGold}
        />
        {toSpend > 0 ? (
          <FrameUnderlineSmall
            textUp="DO WYDANIA"
            textDown={Number(toSpend.toFixed(2))}
            mainColor={COLORS_STYLE.green}
          />
        ) : (
          <FrameUnderlineSmall
            textUp="PRZEKROCZONO PLANOWANY BUDŻET!"
            textDown={Number(toSpend.toFixed(2))}
            mainColor={COLORS_STYLE.red}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  topFramesBox: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 15,
    width: "55%",
  },
  expensesCategories: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "auto",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
});
export default PieChartWithFrames;

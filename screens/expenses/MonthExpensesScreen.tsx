import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { Ionicons } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
import CategoryPieChart from "../../components/expenses/CategoryPieChart";
import { useEffect, useState } from "react";
import pieChartColors from "../../utils/styles/pieChartColors";
import LastExpenseItemBox from "../../components/expenses/LastExpenseItemBox";
import CategoryLegend from "../../components/expenses/CategoryLegend";
import { CategoriesExpensesWithNames } from "../../types/expenses";
import SumBox from "../../components/SumBox";
import CustomButton from "../../utils/ui/CustomButton";
import { Navigation } from "../../types/global";
import AddCategoryButton from "../../components/expenses/AddCategoryButton";
// import PieChartComponent from "../components/PieChartComponent";

const MonthExpensesScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Miesięczne</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  text: {
    color: "white",
  },
});
export default MonthExpensesScreen;

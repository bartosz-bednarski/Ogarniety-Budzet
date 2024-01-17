import {
  FlatList,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";
import { Navigation } from "../../types/global";
import { useAppSelector } from "../../redux/hooks";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import PieChart from "react-native-pie-chart";
import AddTargetButton from "../../components/piggyBank/actualTargets/AddTargetButton";
import TargetGoldFrame from "../../components/piggyBank/actualTargets/TargetGoldFrame";
const ActualTargetsScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const monthIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const yearIncomes = useAppSelector((state) => state.incomes.yearIncomes);
  const yearsIncomes = useAppSelector((state) => state.incomes.yearsIncomes);
  const finantialTargets = useAppSelector(
    (state) => state.piggyBank.finantialTargets
  );
  const sumOfMonthIncomes =
    monthIncomes.length > 0
      ? monthIncomes
          .map((item) => Number(item.value))
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0;
  const sumOfYearIncomes =
    yearIncomes.length > 0
      ? yearIncomes
          .map((item) => Number(item.sumOfAllIncomes))
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0;
  const sumOfYearsIncomes =
    yearsIncomes.length > 0
      ? yearIncomes
          .map((item) => Number(item.sumOfAllIncomes))
          .reduce((partialSum, a) => partialSum + a, 0)
      : 0;
  console.log(sumOfMonthIncomes, sumOfYearIncomes, sumOfYearsIncomes);
  console.log("finantialTargets", finantialTargets);
  return (
    <View style={styles.container}>
      <GoldenFrame name="ZAOSZCZĘDZONO" value={10000} />
      {finantialTargets.map((item) => (
        <TargetGoldFrame
          name={item.name}
          iconName={item.iconName}
          id={item.id}
          incomes={item.incomes}
          targetValue={item.targetValue}
          key={item.id}
        />
      ))}

      <Text style={styles.text}>Aktualne</Text>
      <AddTargetButton onPress={() => navigation.navigate("addTarget")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  text: {
    color: "white",
  },
});
export default ActualTargetsScreen;

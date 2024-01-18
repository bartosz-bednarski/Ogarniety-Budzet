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
  const finantialTargets = useAppSelector(
    (state) => state.piggyBank.finantialTargets
  );

  const targetsIncomesArray = finantialTargets.map((item) =>
    item.incomes.map((value) => value.value)
  );

  const sumOfFinantialIncomes = targetsIncomesArray
    .flat(1)
    .reduce((partialSum, a) => partialSum + a, 0);
  return (
    <View style={styles.container}>
      <GoldenFrame name="ZAOSZCZĘDZONO" value={sumOfFinantialIncomes} />
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

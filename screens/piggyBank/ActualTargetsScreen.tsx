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
const ActualTargetsScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const monthIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const yearIncomes = useAppSelector((state) => state.incomes.yearIncomes);
  const yearsIncomes = useAppSelector((state) => state.incomes.yearsIncomes);
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
  return (
    <View style={styles.container}>
      <GoldenFrame name="ZAOSZCZĘDZONO" value={10000} />
      <View style={styles.goldenContainer}>
        <View style={styles.goldenBox}>
          <View style={styles.goldenBoxTop}>
            <View style={styles.pieChartBox}>
              <PieChart
                widthAndHeight={120}
                series={[50, 50]}
                sliceColor={["green", "red"]}
                coverRadius={0.65}
                coverFill={COLORS_STYLE.backgroundBlack}
              />
              <Ionicons
                name={"shirt"}
                size={50}
                color="white"
                style={styles.icon}
              />
            </View>

            <View style={styles.goldenBoxDetails}>
              <Text style={styles.goldenText}>Wycieczka na Tailandię</Text>
              <Text style={styles.percText}>85%</Text>
              <Text style={styles.targetText}>1450/3000 PLN</Text>
            </View>
          </View>
          <View style={styles.goldenBoxBottom}>
            <Pressable style={styles.button}>
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={COLORS_STYLE.basicGold}
              />
              <Text style={styles.buttonText}>Wpłać kwotę</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Ionicons name="cog" size={24} color={COLORS_STYLE.basicGold} />
              <Text style={styles.buttonText}>Edytuj</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Text style={styles.text}>Aktualne</Text>
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
  goldenContainer: {
    width: "100%",
    alignItems: "center",
  },
  goldenBox: {
    flexDirection: "column",
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 1,
    borderRadius: 15,
    width: "90%",
  },
  goldenBoxTop: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    minheight: 150,
  },
  pieChartBox: {
    width: 70,
    position: "relative",
    flexDirection: "column",
    gap: 5,
  },
  icon: {
    position: "absolute",
    left: 34,
    top: 30,
  },
  goldenBoxDetails: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    paddingRight: 20,
  },
  goldenText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
    width: "100%",
    fontWeight: "700",
    textAlign: "center",
  },
  percText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  targetText: {
    fontSize: 16,
    color: "white",
  },
  goldenBoxBottom: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    borderTopColor: COLORS_STYLE.basicGold,
    borderTopWidth: 1,
    height: 50,
  },
  button: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 12,
  },
});
export default ActualTargetsScreen;

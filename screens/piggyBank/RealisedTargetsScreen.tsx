import { View, Text, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../redux/hooks";
import { numberWithSpaces } from "../../utils/numberWithSpaces";
import GoldenFrame from "../../utils/ui/GoldenFrame";
const RealisedTargetsScreen = () => {
  const currency = useAppSelector(
    (state) => state.currency.currentCurrency.currencyCode
  );
  const realisedTargets = useAppSelector(
    (state) => state.piggyBank.realisedTargets
  );
  const sum = realisedTargets
    .map((item) => item.targetValue)
    .reduce((partialSum, a) => partialSum + a, 0);
  return (
    <ScrollView style={styles.container}>
      <GoldenFrame name="SUMA" value={sum} />
      <View style={styles.columnListBox}>
        {realisedTargets.map((item) => (
          <View style={styles.item} key={item.id}>
            <Ionicons
              name={item.iconName}
              size={44}
              color={COLORS_STYLE.green}
            />
            <Text style={styles.monthName}>{item.name}</Text>
            <Text style={styles.value}>
              {numberWithSpaces(item.targetValue)} {currency}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  columnListBox: {
    marginTop: 20,
    gap: 10,
  },
  item: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: COLORS_STYLE.basicGold,
  },
  monthName: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    width: 100,
  },
  value: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
  },
});
export default RealisedTargetsScreen;

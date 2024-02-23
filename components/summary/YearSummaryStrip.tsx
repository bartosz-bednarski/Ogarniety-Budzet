import { View, Text, StyleSheet } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { numberWithSpaces } from "../../utils/numberWithSpaces";

const YearSummaryStrip: React.FC<{
  name: string;
  currency: string;
  value: number;
}> = ({ name, currency, value }) => {
  return (
    <View style={styles.stripContainer}>
      <View style={styles.stripBoxTop}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{currency}</Text>
      </View>
      <View style={styles.stripBoxBottom}>
        <Ionicons
          name={
            name === "Przychody"
              ? "trending-up-outline"
              : "trending-down-outline"
          }
          size={24}
          color={name === "Przychody" ? COLORS_STYLE.green : COLORS_STYLE.red}
        />
        <View
          style={[
            styles.tabBarBackground,
            {
              backgroundColor:
                name === "Przychody" ? COLORS_STYLE.green : COLORS_STYLE.red,
            },
          ]}
        >
          <Text style={styles.stripBarText}>
            {numberWithSpaces(value)} {currency}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stripContainer: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  stripBoxTop: {
    flexDirection: "row",
    width: "100%",
    marginLeft: 40,
    gap: 5,
  },
  name: {
    color: COLORS_STYLE.labelGrey,
  },
  price: {
    color: COLORS_STYLE.basicGold,
  },
  stripBoxBottom: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  tabBarBackground: {
    width: "80%",
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  stripBarText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
export default YearSummaryStrip;

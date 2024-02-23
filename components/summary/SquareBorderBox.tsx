import { View, Text, StyleSheet } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { numberWithSpaces } from "../../utils/numberWithSpaces";
import randomId from "../../utils/randomIdFunction";
const SquareBorderBox: React.FC<{
  name: string;
  color: string;
  values: { value: number; currency: string }[];
}> = ({ name, color, values }) => {
  return (
    <>
      <Text style={styles.label}>{name}</Text>
      <View style={[styles.squareBox, { borderColor: color }]}>
        {values.map((item) => (
          <View style={styles.rowBox} key={randomId()}>
            {color === "green" ? (
              <Ionicons
                name="trending-up-outline"
                color={COLORS_STYLE.green}
                size={24}
              />
            ) : (
              <Ionicons
                name="trending-down-outline"
                color={COLORS_STYLE.red}
                size={24}
              />
            )}

            <Text style={styles.squareBoxGoldText}>
              {numberWithSpaces(Math.abs(Number(item.value.toFixed(2))))}{" "}
              {item.currency}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  squareBox: {
    flexDirection: "column",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    width: "100%",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  rowBox: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 5,
  },
  squareBoxHeader: {
    width: "100%",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  squareBoxGoldText: {
    fontSize: 20,
    color: COLORS_STYLE.basicGold,
    fontWeight: "600",
  },
  label: {
    color: COLORS_STYLE.labelGrey,
    fontSize: 10,
    marginVertical: 0,
  },
});

export default SquareBorderBox;

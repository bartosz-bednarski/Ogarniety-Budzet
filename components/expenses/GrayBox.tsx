import { View, Text, StyleSheet } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { numberWithSpaces } from "../../utils/numberWithSpaces";

const GrayBox: React.FC<{ name: string; value: number }> = ({
  name,
  value,
}) => {
  const valueWithSpaces = numberWithSpaces(value);
  return (
    <View style={styles.box}>
      <Text style={styles.textUp}>{name}</Text>
      <Text style={styles.textDown}>{valueWithSpaces} PLN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "45%",
    backgroundColor: COLORS_STYLE.tabGrey,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 20,
    borderRadius: 10,
  },
  textUp: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  textDown: {
    color: COLORS_STYLE.basicGold,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
});
export default GrayBox;

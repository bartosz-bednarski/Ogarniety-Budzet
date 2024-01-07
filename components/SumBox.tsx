import { View, Text, StyleSheet } from "react-native";
import COLORS_STYLE from "../utils/styles/colors";

const SumBox: React.FC<{ sum: number }> = ({ sum }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.textWhite}>SUMA</Text>
        <Text style={styles.textGold}>{sum} PLN</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 25,
  },
  box: {
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
  textWhite: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  textGold: {
    color: COLORS_STYLE.basicGold,
    textAlign: "center",
  },
});

export default SumBox;

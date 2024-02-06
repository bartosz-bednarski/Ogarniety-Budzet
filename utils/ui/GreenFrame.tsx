import { View, Text, StyleSheet } from "react-native";
import COLORS_STYLE from "../styles/colors";
import { numberWithSpaces } from "../numberWithSpaces";
import { useAppSelector } from "../../redux/hooks";

const GreenFrame: React.FC<{ value: number; name: string }> = ({
  value,
  name,
}) => {
  const currency = useAppSelector(
    (state) => state.currency.currentCurrency.currencyCode
  );
  const valueWithSpaces = numberWithSpaces(value);
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.textGreen}>{name}</Text>
        <Text style={styles.textGreen}>
          {valueWithSpaces} {currency}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 5,
  },
  box: {
    borderColor: COLORS_STYLE.green,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },

  textGreen: {
    fontSize: 16,
    color: COLORS_STYLE.green,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default GreenFrame;

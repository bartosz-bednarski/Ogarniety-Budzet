import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";

const FinantialTargetsInfo: React.FC = () => {
  return (
    <View style={styles.box}>
      <Text style={styles.goldText}>Brak celów finansowych</Text>
      <View style={styles.rowBox}>
        <Ionicons name="book" size={120} color="white" />
      </View>

      <Text style={styles.whiteText}>Dodaj nowy</Text>
      <Ionicons
        name={`arrow-down-circle`}
        size={32}
        color={COLORS_STYLE.basicGold}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingVertical: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  rowBox: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 20,
  },
  goldText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 32,
    width: "100%",
    textAlign: "center",
    fontWeight: "800",
    marginBottom: 20,
  },
  whiteText: {
    color: "white",
    fontSize: 24,
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    marginVertical: 20,
  },
});

export default FinantialTargetsInfo;

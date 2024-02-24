import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";

const YearsSummaryInfo: React.FC = () => {
  return (
    <View style={styles.box}>
      <Text style={styles.goldText}>Podsumowanie Roczne</Text>
      <View style={styles.rowBox}>
        <Ionicons name="calendar" size={120} color="white" />
        <Ionicons name="home" size={120} color="white" />
      </View>

      <Text style={styles.whiteText}>
        Po roku użytkowania aplikacji pojawi się pierwsze podsumowanie roczne.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingVertical: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    gap: 30,
  },
  rowBox: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 20,
  },
  goldText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 36,
    width: "100%",
    textAlign: "center",
    fontWeight: "800",
    marginBottom: 20,
  },
  whiteText: {
    color: "white",
    fontSize: 28,
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    marginVertical: 20,
  },
});

export default YearsSummaryInfo;

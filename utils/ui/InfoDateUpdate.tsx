import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../styles/colors";

const InfoDateUpdate: React.FC<{
  goldText: string;
  whiteText: string;
  arrow: string;
}> = ({ goldText, whiteText, arrow }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.goldText}>{goldText}</Text>
      <Ionicons name="calendar" size={120} color="white" />
      <Text style={styles.whiteText}>{whiteText}</Text>
      <Ionicons
        name={`arrow-${arrow}-circle`}
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
    flex: 9,
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

export default InfoDateUpdate;

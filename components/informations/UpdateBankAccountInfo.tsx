import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../utils/styles/colors";
import CustomButton from "../../utils/ui/CustomButton";

const UpdateBankAccountInfo: React.FC<{ onPress: () => void }> = ({
  onPress,
}) => {
  return (
    <View style={styles.box}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.greenText}>KONFIGURACJA APLIKACJI</Text>
      </View>
      <View style={styles.boxIcon}>
        <Ionicons name="wallet" size={120} color={COLORS_STYLE.red} />
      </View>

      <Text style={styles.goldText}>Uzupełnij stan konta.</Text>
      <Ionicons
        name={`arrow-down-circle`}
        size={32}
        color={COLORS_STYLE.basicGold}
      />
      <CustomButton title="Uzupełnij stan konta" onPress={onPress} />
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
  boxIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  greenText: {
    color: COLORS_STYLE.green,
    fontSize: 32,
    width: "100%",
    textAlign: "center",
    fontWeight: "800",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  goldText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 30,
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    marginVertical: 20,
  },
});

export default UpdateBankAccountInfo;

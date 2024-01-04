import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../utils/styles/colors";
const YearsIncomesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Lata</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
});
export default YearsIncomesScreen;

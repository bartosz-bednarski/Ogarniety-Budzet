import {
  FlatList,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Navigation } from "../../types/global";
import GoldenFrame from "../../utils/ui/GoldenFrame";
const SavingsScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <GoldenFrame name="STAN KONTA" value={100000} />
      <Text style={styles.text}>Zrealizowane</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  text: {
    color: "white",
  },
});
export default SavingsScreen;

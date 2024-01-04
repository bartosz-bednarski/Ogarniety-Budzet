import { Text, View, StyleSheet, Pressable } from "react-native";
import { Navigation } from "../../types/global";
import COLORS_STYLE from "../../utils/styles/colors";

const SettingsScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  return (
    <View style={styles.settingsContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.listItemBox,
          pressed && styles.listItemBoxPressed,
        ]}
        onPress={() => navigation.navigate("editCategories")}
      >
        <Text style={styles.listItemText}>Edytuj kategorie wydatków</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.listItemBox,
          pressed && styles.listItemBoxPressed,
        ]}
        onPress={() => navigation.navigate("incomesCategoriesList")}
      >
        <Text style={styles.listItemText}>Edytuj kategorie przychodów</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  listItemBox: {
    height: 60,
    marginVertical: 5,
    paddingVertical: 10,
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  listItemBoxPressed: {
    backgroundColor: "blue",
    opacity: 0.4,
  },
  listItemText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
export default SettingsScreen;

import { Text, View, StyleSheet, Pressable } from "react-native";
import { Navigation } from "../../types/global";

const SettingsScreen: React.FC<Navigation> = ({ navigation }) => {
  return (
    <View style={styles.settingsContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.listItemBox,
          pressed && styles.listItemBoxPressed,
        ]}
        onPress={() => navigation.navigate("editCategories")}
      >
        <Text style={styles.listItemText}>Edytuj kategorie</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    marginVertical: 20,
  },
  listItemBox: {
    height: 50,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "white",
    borderColor: "black",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listItemBoxPressed: {
    backgroundColor: "blue",
    opacity: 0.4,
  },
  listItemText: {
    color: "black",
    fontSize: 20,
  },
});
export default SettingsScreen;

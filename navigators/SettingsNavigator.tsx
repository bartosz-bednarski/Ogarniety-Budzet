import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import EditCategoriesScreen from "../screens/settings/EditCategoriesScreen";
import EditCategoryScreen from "../screens/settings/EditCategoryScreen";
import AddNewCategoryScreen from "../screens/settings/AddNewCategoryScreen";
import COLORS_STYLE from "../utils/styles/colors";
const SettingsNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: COLORS_STYLE.backgroundBlack },
        headerTintColor: COLORS_STYLE.basicGold,
        headerPressColor: COLORS_STYLE.basicGold,
        headerPressOpacity: 1,
      })}
    >
      <Stack.Screen
        component={SettingsScreen}
        name="settings"
        options={{ headerTitle: "Opcje" }}
      />
      <Stack.Screen
        component={EditCategoriesScreen}
        name="editCategories"
        options={{ headerTitle: "Edytuj kategorie" }}
      />
      <Stack.Screen
        component={EditCategoryScreen}
        name="editCategory"
        options={({ route }) => {
          return { headerTitle: `Edytujesz ` };
        }}
      />
      <Stack.Screen
        component={AddNewCategoryScreen}
        name="addNewCategory"
        options={{ headerTitle: "Dodajesz nową kategorie" }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import EditCategoriesScreen from "../screens/settings/EditCategoriesScreen";
import EditCategoryScreen from "../screens/settings/EditCategoryScreen";
const SettingsNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTintColor: "red",
        headerPressColor: "red",
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
          return { headerTitle: `Edytujesz ${route.params.name}` };
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;

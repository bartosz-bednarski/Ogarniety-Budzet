import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/SettingsScreen";
const SettingsNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerTintColor: "red",
        headerPressColor: "red",
        headerPressOpacity: 1,
        headerTitle: "Opcje",
      })}
    >
      <Stack.Screen component={SettingsScreen} name="settings" />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;

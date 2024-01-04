import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlannedExpensesScreen from "../../screens/expenses/PlannedExpensesScreen";
const PlannedExpensesNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={PlannedExpensesScreen}
        name="actualExpenses"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default PlannedExpensesNavigator;

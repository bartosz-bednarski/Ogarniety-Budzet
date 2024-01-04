import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActualExpensesScreen from "../../screens/expenses/ActualExpensesScreen";
import MonthIncomesScreen from "../../screens/incomes/MonthIncomesScreen";
const MonthIncomesNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={MonthIncomesScreen}
        name="monthIncomes"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default MonthIncomesNavigator;

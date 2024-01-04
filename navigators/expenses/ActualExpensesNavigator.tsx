import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActualExpensesScreen from "../../screens/expenses/ActualExpensesScreen";
const ActualExpensesNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ActualExpensesScreen}
        name="actualExpenses"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default ActualExpensesNavigator;

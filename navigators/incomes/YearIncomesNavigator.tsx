import { createNativeStackNavigator } from "@react-navigation/native-stack";
import YearIncomesScreen from "../../screens/incomes/YearIncomesScreen";
const YearIncomesNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={YearIncomesScreen}
        name="yearIncomes"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default YearIncomesNavigator;

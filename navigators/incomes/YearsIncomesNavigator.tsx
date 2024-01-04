import { createNativeStackNavigator } from "@react-navigation/native-stack";
import YearsIncomesScreen from "../../screens/incomes/YearsIncomesScreen";
const YearsIncomesNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={YearsIncomesScreen}
        name="yearsIncomes"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default YearsIncomesNavigator;

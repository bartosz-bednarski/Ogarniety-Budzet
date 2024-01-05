import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import { Pressable } from "react-native";
import SettingsNavigator from "./SettingsNavigator";
import COLORS_STYLE from "../utils/styles/colors";
import { useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
const AddExpenseNavigator = () => {
  const Stack = createNativeStackNavigator();
  const categoriesIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  //useEffect do sprawdzania czy miesiąc uległ zmianie, jeżeli tak to wprowadzenie zmian w reduxie w danych
  useEffect(() => {
    //Tak powinno być:
    // const currentMonth = new Date().getMonth();

    //Test
    const currentMonth = 2;
    const monthOfLatestIncome = new Date(categoriesIncomes[0].date).getMonth();
    if (currentMonth > monthOfLatestIncome) {
      console.log("zmiana miesiąca");
    } else {
      console.log("miesiąc zostaje");
    }
    console.log(
      "CHECKING",
      currentMonth,
      monthOfLatestIncome,
      categoriesIncomes[0].date
    );
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS_STYLE.backgroundBlack },
      }}
    >
      <Stack.Screen
        component={AddExpenseScreen}
        name="addExpense"
        options={({ route, navigation }) => ({
          headerTintColor: COLORS_STYLE.basicGold,
          headerPressColor: COLORS_STYLE.basicGold,
          headerPressOpacity: 1,
          headerTitle: "Dodaj wydatek",
          headerTitleAlign: "center",
          headerRight: () => {
            return (
              <Pressable
                onPress={() => navigation.navigate("settingsNavigator")}
              >
                <Ionicons
                  name="cog"
                  size={30}
                  color={COLORS_STYLE.basicGold}
                  style={{ marginRight: 10 }}
                />
              </Pressable>
            );
          },
        })}
      />
      <Stack.Screen
        component={SettingsNavigator}
        name="settingsNavigator"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default AddExpenseNavigator;

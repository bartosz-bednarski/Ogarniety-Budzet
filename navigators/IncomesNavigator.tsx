import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import IncomesScreen from "../screens/incomes/MonthIncomesScreen";
import SettingsNavigator from "./SettingsNavigator";
import COLORS_STYLE from "../utils/styles/colors";
import IncomesTabNavigator from "./incomes/IncomesTabNavigator";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { updateMonth, updateYear } from "../redux/incomes-slice";
const IncomesNavigator = () => {
  const Stack = createNativeStackNavigator();
  const categoriesIncomes = useAppSelector(
    (state) => state.incomes.categoriesIncomes
  );
  const dispatch = useAppDispatch();
  //useEffect do sprawdzania czy miesiąc uległ zmianie, jeżeli tak to wprowadzenie zmian w reduxie w danych
  useEffect(() => {
    //Test
    // console.log(categoriesIncomes);
    if (categoriesIncomes.length > 0) {
      //if jest po to żeby kod się nie  wysypał jak nie ma zdefiniowanych żadnych wydatków
      //Tak powinno być:
      // const currentMonth = new Date().getMonth();

      let currentMonth = 2;

      const monthOfLatestIncome = new Date(
        categoriesIncomes[0].date
      ).getMonth();
      // console.log("1234567897454", monthOfLatestIncome);
      if (
        currentMonth > monthOfLatestIncome ||
        (currentMonth === 0 && monthOfLatestIncome === 11)
      ) {
        dispatch(updateMonth());
        // console.log("zmiana miesiąca");
      } else {
        console.log("miesiąc zostaje");
      }
    }
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS_STYLE.backgroundBlack },
      }}
    >
      <Stack.Screen
        component={IncomesTabNavigator}
        name="incomes"
        options={({ route, navigation }) => ({
          headerTintColor: COLORS_STYLE.basicGold,
          headerPressColor: COLORS_STYLE.basicGold,
          headerPressOpacity: 1,
          headerTitle: "Przychody",
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
export default IncomesNavigator;

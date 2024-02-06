import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import COLORS_STYLE from "../../../utils/styles/colors";
import { currencyCodes } from "../../../utils/currencyCodes";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setCurrency } from "../../../redux/currency-slice";
const CurrencyScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const currencyStore = useAppSelector(
    (state) => state.currency.currentCurrency
  );
  const [textInput, setTextInput] = useState("");
  const [filteredArray, setFilteredArray] = useState([""]);
  const [choosenCurrency, setChoosenCurrency] = useState(
    currencyStore.currencyCode
  );
  useEffect(() => {
    if (textInput !== "") {
      setFilteredArray(
        currencyCodes.filter(
          (item) => item.slice(0, textInput.length) === textInput.toUpperCase()
        )
      );
    }
  }, [textInput]);
  const submitHandler = () => {
    dispatch(setCurrency(choosenCurrency));
    navigation.navigate("Podsumowanie", { screen: "monthSummary" });
  };
  return (
    <View style={styles.conatiner}>
      <Text style={styles.label}>Wybierz nową walutę</Text>
      <View style={styles.inputBox}>
        <TextInput
          value={textInput}
          onChangeText={setTextInput}
          style={styles.textInput}
          placeholder="Szukaj"
          placeholderTextColor={COLORS_STYLE.labelGrey}
          maxLength={3}
        />
        <Ionicons name="search" color="white" size={24} />
      </View>
      {textInput !== "" && (
        <View style={styles.dropdownBox}>
          <ScrollView>
            {filteredArray.map((item) => (
              <Pressable
                style={styles.itemRow}
                onPress={() => {
                  setChoosenCurrency(item);
                  setTextInput("");
                }}
              >
                <Ionicons name="search" color="white" size={20} />
                <Text style={styles.text}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
      <Text style={styles.headerWhite}>Wybrana waluta</Text>
      <Text style={styles.headerGold}>{choosenCurrency}</Text>

      <View style={styles.modalButtonsBox}>
        <Pressable
          style={styles.modalButton}
          onPress={() => setChoosenCurrency(currencyStore.currencyCode)}
        >
          <Text style={styles.modalButtonText}>Anuluj</Text>
        </Pressable>
        <Text style={styles.textGold}>|</Text>
        <Pressable style={styles.modalButton} onPress={submitHandler}>
          <Text style={styles.modalButtonText}>Zapisz</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  label: {
    color: COLORS_STYLE.labelGrey,
    fontSize: 12,
    marginVertical: 10,
  },
  headerWhite: {
    color: "white",
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  headerGold: {
    color: COLORS_STYLE.basicGold,
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 30,
  },
  inputBox: {
    borderColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    height: 50,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    color: "white",
    width: "80%",
  },
  dropdownBox: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS_STYLE.tabGrey,
    borderRadius: 10,
    gap: 5,
    height: 250,
  },
  itemRow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  modalButtonsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    justifyContent: "center",
    width: "40%",
  },
  modalButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  textGold: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
  },
});
export default CurrencyScreen;

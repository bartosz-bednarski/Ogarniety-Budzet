import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import COLORS_STYLE from "../../utils/styles/colors";
import YearSummaryStrip from "./YearSummaryStrip";
import randomId from "../../utils/randomIdFunction";
import { numberWithSpaces } from "../../utils/numberWithSpaces";

const YearsSummaryBox: React.FC<{
  data: {
    year: number;
    currency: {
      currency: string;
      sumOfAllExpenses: number;
      sumOfAllIncomes: number;
    }[];
  };
}> = ({ data }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.box}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <View style={styles.mainBox}>
          <Ionicons
            name="calendar"
            color={"white"}
            size={48}
            style={{ marginLeft: 10 }}
          />
          <Text style={styles.monthName}>{data.year}</Text>
          <View style={styles.details}>
            {data.currency.map((item) => {
              return (
                <View style={styles.rowBox} key={randomId()}>
                  <Text
                    style={[
                      styles.value,
                      {
                        color:
                          Number(item.sumOfAllIncomes) -
                            Number(item.sumOfAllExpenses) >
                          0
                            ? COLORS_STYLE.green
                            : COLORS_STYLE.red,
                      },
                    ]}
                  >
                    {Number(item.sumOfAllIncomes) -
                      Number(item.sumOfAllExpenses) >=
                    0
                      ? "+"
                      : "-"}
                  </Text>
                  <Text
                    style={[
                      styles.value,
                      {
                        color:
                          Number(item.sumOfAllIncomes) -
                            Number(item.sumOfAllExpenses) >
                          0
                            ? COLORS_STYLE.green
                            : COLORS_STYLE.red,
                      },
                    ]}
                  >
                    {numberWithSpaces(
                      Math.abs(
                        Number(
                          (
                            Number(item.sumOfAllIncomes) -
                            Number(item.sumOfAllExpenses)
                          ).toFixed(2)
                        )
                      )
                    )}
                  </Text>
                  <Text
                    style={[styles.value, { color: COLORS_STYLE.basicGold }]}
                  >
                    {item.currency}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        {showDropdown &&
          data.currency.map((item) => (
            <View key={randomId()}>
              <YearSummaryStrip
                name="Przychody"
                currency={item.currency}
                value={item.sumOfAllIncomes}
              />
              <YearSummaryStrip
                name="Wydatki"
                currency={item.currency}
                value={item.sumOfAllExpenses}
              />
            </View>
          ))}

        {/* {showDropdown && <StripsColumn data={stripsColumnsData} />} */}
        <View style={styles.dropdownButton}>
          <Ionicons
            name={showDropdown ? "caret-up" : "caret-down"}
            color={COLORS_STYLE.tabGrey}
            size={20}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  box: {
    paddingTop: 10,
    paddingBottom: 0,
    borderRadius: 15,
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 1,
  },
  monthName: {
    fontSize: 20,
    color: "white",
    marginLeft: 5,
  },
  mainBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    width: "100%",
    marginBottom: 5,
  },

  details: {
    width: "55%",
  },
  rowBox: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  value: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
    marginRight: 5,
  },
  dropdownButton: {
    marginTop: 5,
    marginVertical: 0,
    height: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS_STYLE.basicGold,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: COLORS_STYLE.basicGold,
  },
});
export default YearsSummaryBox;

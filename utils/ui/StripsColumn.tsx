import { StyleSheet, View } from "react-native";
import Strip from "./Strip";

const StripsColumn: React.FC<{
  data: {
    catId: string;
    iconName?: any;
    name?: string | undefined;
    value?: number | undefined;
    sum: number;
  }[];
}> = ({ data }) => {
  function randomId() {
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }
  return (
    <View style={styles.stripsContainer}>
      {data.map((item, index) => {
        return (
          <Strip
            key={randomId()}
            iconName={item.iconName}
            categoryName={item.name}
            realExpenses={item.sum}
            plannedExpenses={item.value}
            pieChartColorsNum={index}
          />
        );
      })}

      {/* ))} */}
    </View>
  );
};
const styles = StyleSheet.create({
  stripsContainer: {
    width: "95%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
});
export default StripsColumn;

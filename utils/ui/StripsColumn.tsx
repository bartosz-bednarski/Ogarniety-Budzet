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
  return (
    <View style={styles.stripsContainer}>
      {/* {currentCategoryRealistationPieChartData.map((item) => ( */}
      {data.map((item, index) => {
        let randLetter = String.fromCharCode(
          65 + Math.floor(Math.random() * 26)
        );
        return (
          <Strip
            key={randLetter + Date.now()}
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

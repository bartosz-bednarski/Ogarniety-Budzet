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
      {data.map((item, index) => (
        <Strip
          key={item.catId}
          iconName={item.iconName}
          categoryName={item.name}
          realExpenses={item.sum}
          plannedExpenses={item.value}
          pieChartColorsNum={index}
        />
      ))}

      {/* ))} */}
    </View>
  );
};
const styles = StyleSheet.create({
  stripsContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
});
export default StripsColumn;

import { View, Text, StyleSheet, Pressable } from "react-native";
import PieChart from "react-native-pie-chart";
import COLORS_STYLE from "../../../utils/styles/colors";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { RealisedTarget } from "../../../types/piggyBank";
import { numberWithSpaces } from "../../../utils/numberWithSpaces";
const RealisedTargetsBox: React.FC<{
  realisedTargets: RealisedTarget[];
  onPress: () => void;
}> = ({ realisedTargets, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.leftBox}>
        {realisedTargets.map((item) => (
          <View style={styles.item} key={item.id}>
            <View style={styles.pieChartBox}>
              <PieChart
                widthAndHeight={80}
                series={[1]}
                sliceColor={[COLORS_STYLE.green]}
                coverRadius={0.6}
                coverFill={COLORS_STYLE.tabGrey}
              />
              <Text style={styles.absoluteIcon}>
                <Ionicons
                  name={item.iconName}
                  color={COLORS_STYLE.basicGold}
                  size={24}
                />
              </Text>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.value}>
              {numberWithSpaces(item.targetValue)} PLN
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.rightBox}>
        <Ionicons name="caret-forward" color={COLORS_STYLE.tabGrey} size={24} />
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS_STYLE.tabGrey,
    flexDirection: "row",
    borderRadius: 15,
  },
  rightBox: {
    paddingVertical: 15,
    width: "5%",
    backgroundColor: COLORS_STYLE.basicGold,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  leftBox: {
    paddingVertical: 15,
    flexDirection: "row",
    width: "95%",
    paddingLeft: 25,
    gap: 15,
  },
  item: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  pieChartBox: {
    width: 80,
    height: 80,
    position: "relative",
  },
  absoluteIcon: {
    position: "absolute",
    left: 10,
    top: 25,
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    width: 60,
    textAlign: "center",
  },
  name: {
    fontSize: 13,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    width: 58,
  },
  value: {
    color: COLORS_STYLE.basicGold,
    width: 100,
    textAlign: "center",
  },
});
export default RealisedTargetsBox;

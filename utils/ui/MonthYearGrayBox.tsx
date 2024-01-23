// import { StyleSheet, Text, View } from "react-native";
// import COLORS_STYLE from "../styles/colors";
// const MonthYearGrayBox = ({pieChartData}) =>{
//     return(
//         <View style={styles.container}>
//       <Text style={styles.header}></Text>
//       <View style={styles.mainBox}>
//         <View style={styles.chartBox}>
//           <PieChart
//             widthAndHeight={120}
//             series={monthIncomes.categoriesIncomes.map((category) =>
//               category.value === 0 ? 1 : category.value
//             )}
//             sliceColor={pieChartColors.slice(
//               0,
//               monthIncomes.categoriesIncomes.length
//             )}
//             coverRadius={0.45}
//             coverFill={COLORS_STYLE.backgroundBlack}
//           />
//         </View>
//         <View style={styles.detailsBox}>
//           <Text style={styles.value}> PLN</Text>

//         </View>
//       </View>
//     </View>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//       width: "100%",
//       gap: 5,
//     },
//     header: {
//       fontSize: 20,
//       color: "white",
//       marginLeft: 5,
//     },
//     mainBox: {
//       width: "100%",
//       backgroundColor: COLORS_STYLE.tabGrey,
//       flexDirection: "row",
//       paddingHorizontal: 15,
//       paddingVertical: 15,
//       gap: 20,
//       borderRadius: 15,
//     },
//     chartBox: {
//       width: "40%",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     detailsBox: {
//       flexDirection: "column",
//       width: "50%",
//       gap: 10,
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     value: {
//       fontSize: 30,
//       textAlign: "center",
//       width: "100%",
//       color: COLORS_STYLE.basicGold,
//     },

//   });
// export default MonthYearGrayBox

// import { PieChart } from "react-native-svg-charts";
// const PieChartComponent = ({ categoriesExpenses }) => {
//   const randomColor = () =>
//     ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
//       0,
//       7
//     );
//   return (
//     <PieChart
//       style={{ height: 200 }}
//       data={categoriesExpenses
//         .map((item) => item.sum)
//         .map((value, index) => ({
//           value,
//           svg: {
//             fill: randomColor(),
//             onPress: () => console.log("press", index),
//           },
//           key: `pie-${index}`,
//         }))}
//     ></PieChart>
//   );
// };
// export default PieChartComponent;

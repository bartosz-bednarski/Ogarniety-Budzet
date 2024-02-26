import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS_STYLE from "../../../utils/styles/colors";
import PieChart from "react-native-pie-chart";
import { FinantialTarget } from "../../../types/piggyBank";
import { useState } from "react";
import ModalAddValue from "./ModalAddValue";
import ModalEditValue from "./ModalEditValue";
import ModalDeleteTarget from "./ModalDeleteTarget";
import ModalRealisedTarget from "./ModalRealisedTarget";
import { useAppSelector } from "../../../redux/hooks";

const TargetGoldFrame: React.FC<FinantialTarget> = ({
  name,
  iconName,
  id,
  incomes,
  targetValue,
  currency,
}) => {
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );

  const [addValueModalVisible, setAddValueModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteTargetModalVisible, setDeleteTargetModalVisible] =
    useState(false);
  const [realisedTargetModalVisible, setRealisedTargetModalVisible] =
    useState(false);

  const sumOfIncomes = incomes
    .map((item) => item.value)
    .reduce((partialSum, a) => partialSum + a, 0);

  const pieChartData = [
    sumOfIncomes !== 0
      ? Number(((sumOfIncomes / targetValue) * 100).toFixed(2))
      : 1,
    100 - Number(((sumOfIncomes / targetValue) * 100).toFixed(2)) < 0
      ? 0
      : 100 - Number(((sumOfIncomes / targetValue) * 100).toFixed(2)),
  ];

  return (
    <>
      <View style={styles.goldenContainer}>
        <View style={styles.goldenBox}>
          <View style={styles.goldenBoxTop}>
            <View style={styles.pieChartBox}>
              <PieChart
                widthAndHeight={120}
                series={pieChartData}
                sliceColor={["green", "red"]}
                coverRadius={0.65}
                coverFill={COLORS_STYLE.backgroundBlack}
              />
              <Ionicons
                name={iconName}
                size={50}
                color={COLORS_STYLE.basicGold}
                style={styles.icon}
              />
            </View>

            <View style={styles.goldenBoxDetails}>
              <Text style={styles.goldenText}>{name}</Text>
              <Text style={styles.percText}>
                {((sumOfIncomes / targetValue) * 100).toFixed(2)} %
              </Text>
              <Text style={styles.targetText}>
                {sumOfIncomes}/{targetValue} {currency}
              </Text>
            </View>
          </View>
          <View style={styles.goldenBoxBottom}>
            {sumOfIncomes >= targetValue && (
              <Pressable
                style={styles.button}
                onPress={() => setRealisedTargetModalVisible(true)}
              >
                <Ionicons
                  name="checkmark"
                  size={24}
                  color={COLORS_STYLE.green}
                />
                <Text
                  style={[styles.buttonText, { color: COLORS_STYLE.green }]}
                >
                  Kupiono
                </Text>
              </Pressable>
            )}
            {sumOfIncomes < targetValue && (
              <Pressable
                style={styles.button}
                onPress={() => {
                  currency === activeBankAccountStore.currency
                    ? setAddValueModalVisible(true)
                    : null;
                }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color={
                    currency === activeBankAccountStore.currency
                      ? COLORS_STYLE.basicGold
                      : COLORS_STYLE.labelGrey
                  }
                />
                <Text
                  style={[
                    styles.buttonText,
                    currency !== activeBankAccountStore.currency && {
                      color: COLORS_STYLE.labelGrey,
                    },
                  ]}
                >
                  Wpłać
                </Text>
              </Pressable>
            )}

            <Pressable
              style={styles.button}
              onPress={() => setEditModalVisible(true)}
            >
              <Ionicons name="cog" size={24} color={COLORS_STYLE.basicGold} />
              <Text style={styles.buttonText}>Edytuj</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => setDeleteTargetModalVisible(true)}
            >
              <Ionicons name="trash" size={24} color={COLORS_STYLE.red} />
              <Text style={[styles.buttonText, { color: COLORS_STYLE.red }]}>
                Usuń
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <ModalAddValue
        targetValue={targetValue}
        sumOfIncomes={sumOfIncomes}
        id={id}
        setAddValueModalVisible={(status) => setAddValueModalVisible(status)}
        addValueModalVisible={addValueModalVisible}
      />
      <ModalEditValue
        editModalVisible={editModalVisible}
        setEditModalVisible={(status) => setEditModalVisible(status)}
        id={id}
      />
      <ModalDeleteTarget
        deleteTargetModalVisible={deleteTargetModalVisible}
        setDeleteTargetModalVisible={(status) =>
          setDeleteTargetModalVisible(status)
        }
        id={id}
      />
      <ModalRealisedTarget
        realisedTargetModalVisible={realisedTargetModalVisible}
        setRealisedTargetModalVisible={(status) =>
          setRealisedTargetModalVisible(status)
        }
        id={id}
        name={name}
        iconName={iconName}
        targetValue={targetValue}
        incomes={incomes}
      />
    </>
  );
};
const styles = StyleSheet.create({
  goldenContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  goldenBox: {
    flexDirection: "column",
    borderColor: COLORS_STYLE.basicGold,
    borderWidth: 1,
    borderRadius: 15,
    width: "90%",
  },
  goldenBoxTop: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    minheight: 150,
  },
  pieChartBox: {
    width: 70,
    position: "relative",
    flexDirection: "column",
    gap: 5,
  },
  icon: {
    position: "absolute",
    left: 34,
    top: 30,
  },
  goldenBoxDetails: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    paddingRight: 20,
  },
  goldenText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
    width: "100%",
    fontWeight: "700",
    textAlign: "center",
  },
  percText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  targetText: {
    fontSize: 16,
    color: "white",
  },
  goldenBoxBottom: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    borderTopColor: COLORS_STYLE.basicGold,
    borderTopWidth: 1,
    height: 50,
  },
  button: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS_STYLE.basicGold,
    fontSize: 12,
  },
  modalLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000006b",
  },
  modalView: {
    margin: 20,
    width: "80%",
    backgroundColor: "#dddbdb",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalError: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    color: "black",
    marginBottom: 10,
  },
  deleteCustomButton: {
    flexDirection: "row",
    gap: 5,
  },
  deleteCustomButtonText: {
    color: COLORS_STYLE.red,
    fontSize: 16,
  },
});
export default TargetGoldFrame;

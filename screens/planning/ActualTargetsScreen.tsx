import { View, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Navigation } from "../../types/global";
import { useAppSelector } from "../../redux/hooks";
import GoldenFrame from "../../utils/ui/GoldenFrame";
import TargetGoldFrame from "../../components/planning/actualTargets/TargetGoldFrame";
import AddCircleButton from "../../utils/ui/AddCircleButton";
import CustomButton from "../../utils/ui/CustomButton";
const ActualTargetsScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const finantialTargets = useAppSelector(
    (state) => state.piggyBank.finantialTargets
  );

  const targetsIncomesArray = finantialTargets.map((item) =>
    item.incomes.map((value) => value.value)
  );
  const bankAccounts = useAppSelector((state) => state.bankAccounts.accounts);
  const activeBankAccountStoreId = useAppSelector(
    (state) => state.bankAccounts.activeAccount.accountId
  );
  const bankAccountsActiveAccountIndexId = bankAccounts.findIndex(
    (item) => item.accountId === activeBankAccountStoreId
  );
  const sumOfFinantialIncomes = targetsIncomesArray
    .flat(1)
    .reduce((partialSum, a) => partialSum + a, 0);
  return (
    <View style={styles.container}>
      {(bankAccounts.length === 0 ||
        bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus ===
          0) && (
        <View style={styles.buttonBox}>
          <CustomButton
            title="Uzupełnij stan konta"
            onPress={() => navigation.navigate("account")}
          />
        </View>
      )}
      {bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus > 0 && (
        <>
          <ScrollView style={styles.scrollView}>
            <GoldenFrame name="CELE FINANSOWE" value={sumOfFinantialIncomes} />
            {finantialTargets.map((item) => (
              <TargetGoldFrame
                name={item.name}
                iconName={item.iconName}
                id={item.id}
                incomes={item.incomes}
                targetValue={item.targetValue}
                key={item.id}
              />
            ))}
          </ScrollView>
          <AddCircleButton
            name="Dodaj cel"
            onPress={() => navigation.navigate("addTarget")}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS_STYLE.backgroundBlack,
  },
  scrollView: {
    flex: 9,
  },
  text: {
    color: "white",
  },
  buttonBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
export default ActualTargetsScreen;

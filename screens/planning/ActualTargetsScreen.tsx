import { View, StyleSheet, ScrollView } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Navigation } from "../../types/global";
import { useAppSelector } from "../../redux/hooks";
import TargetGoldFrame from "../../components/planning/actualTargets/TargetGoldFrame";
import AddCircleButton from "../../utils/ui/AddCircleButton";
import UpdateBankAccountInfo from "../../components/informations/UpdateBankAccountInfo";
import FinantialTargetsInfo from "../../components/informations/FinantialTargetsInfo";

const ActualTargetsScreen: React.FC<{ navigation: Navigation }> = ({
  navigation,
}) => {
  const finantialTargets = useAppSelector(
    (state) => state.piggyBank.finantialTargets
  );
  const bankAccounts = useAppSelector((state) => state.bankAccounts.accounts);
  const activeBankAccountStoreId = useAppSelector(
    (state) => state.bankAccounts.activeAccount.accountId
  );

  const targetsIncomesArray = finantialTargets.map((item) =>
    item.incomes.map((value) => value.value)
  );

  const bankAccountsActiveAccountIndexId = bankAccounts.findIndex(
    (item) => item.accountId === activeBankAccountStoreId
  );

  return (
    <View style={styles.container}>
      {(bankAccounts.length === 0 ||
        bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus ===
          0) && (
        <UpdateBankAccountInfo
          onPress={() => navigation.navigate("Oszczędności")}
        />
      )}
      {bankAccounts[bankAccountsActiveAccountIndexId].bankAccountStatus > 0 && (
        <>
          <ScrollView style={styles.scrollView}>
            {finantialTargets.length === 0 && <FinantialTargetsInfo />}
            {finantialTargets.map((item) => (
              <TargetGoldFrame
                name={item.name}
                iconName={item.iconName}
                id={item.id}
                incomes={item.incomes}
                targetValue={item.targetValue}
                currency={item.currency}
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

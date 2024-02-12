import { Text, View, StyleSheet } from "react-native";
import COLORS_STYLE from "../../utils/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import BankAccountGrayBox from "../../components/piggyBank/manageBankAccounts/BankAccountGrayBox";
import AddBankAccountBox from "../../components/piggyBank/manageBankAccounts/AddBankAccountBox";
import { useState } from "react";
import ModalAddBankAccount from "../../components/piggyBank/manageBankAccounts/ModalAddBankAccount";
import { useAppSelector } from "../../redux/hooks";
const ManageBankAccountsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const bankAccountsStore = useAppSelector(
    (state) => state.bankAccounts.accounts
  );
  const activeBankAccountStore = useAppSelector(
    (state) => state.bankAccounts.activeAccount
  );
  console.log(bankAccountsStore);
  console.log(activeBankAccountStore);
  return (
    <View style={styles.container}>
      {bankAccountsStore.map((item) => (
        <BankAccountGrayBox
          key={item.accountId}
          accountName={item.accountName}
          accountValue={item.bankAccountStatus}
          accountId={item.accountId}
          accountCurrency={item.currency}
        />
      ))}

      <AddBankAccountBox onPress={() => setModalVisible(true)} />
      {modalVisible && (
        <ModalAddBankAccount
          modalVisible={modalVisible}
          setModalVisible={(value) => setModalVisible(value)}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS_STYLE.backgroundBlack,
    gap: 20,
  },
});
export default ManageBankAccountsScreen;

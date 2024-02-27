import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import COLORS_STYLE from "../../../utils/styles/colors";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import {
  deleteBankAccount,
  editBankAccount,
  setActiveBankAccount,
} from "../../../redux/bankAccounts-slice";

const ModalEditBankAccount: React.FC<{
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  accountName: string;
  accountId: string;
  accountCurrency: string;
}> = ({
  modalVisible,
  setModalVisible,
  accountName,
  accountId,
  accountCurrency,
}) => {
  const dispatch = useAppDispatch();

  const [errorAccountName, setErrorAccountName] = useState({
    state: false,
    message: "",
  });
  const [errorCurrency, setErrorCurrency] = useState({
    state: false,
    message: "",
  });
  const [newAccountName, setNewAccountName] = useState(accountName);
  const [currency, setCurrency] = useState(accountCurrency);
  const [showDeleteModal, setShowdeleteModal] = useState(false);

  useEffect(() => {
    if (newAccountName.length > 0) {
      setErrorAccountName({ state: false, message: "" });
    }
    if (currency.length > 0) {
      setErrorCurrency({ state: false, message: "" });
    }
  }, [newAccountName, currency]);
  const submitCheck = () => {
    if (newAccountName.length > 0 && currency.length > 0) {
      dispatch(
        editBankAccount({
          accountId: accountId,
          accountName: newAccountName,
          currency: currency,
        })
      );
      setModalVisible(false);
    } else {
      if (newAccountName.length === 0) {
        setErrorAccountName({
          state: true,
          message: "Nazwa rachunku nie może być pusta!",
        });
      }
      if (currency.length === 0) {
        setErrorCurrency({
          state: true,
          message: "Nazwa waluty nie może być pusta!",
        });
      }
    }
  };

  const onDeleteSubmitHandler = () => {
    dispatch(deleteBankAccount({ accountId: accountId }));
    setModalVisible(false);
    setShowdeleteModal(false);
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Zmiany nie zostały wprowadzone!");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalLayout}>
          <View style={styles.modalView}>
            <Text style={styles.header}>Edytujesz "{accountName}"</Text>
            <Text style={styles.label}>Podaj nową nazwę rachunku:</Text>
            <TextInput
              style={styles.textInput}
              value={newAccountName}
              onChangeText={(text) => setNewAccountName(text)}
              keyboardType="default"
              placeholder="Rachunek 2"
              placeholderTextColor={COLORS_STYLE.labelGrey}
            />
            {errorAccountName.state && (
              <Text style={styles.error}>{errorAccountName.message}</Text>
            )}

            <Text style={styles.label}>Podaj nową walutę:</Text>
            <TextInput
              style={styles.textInput}
              value={currency}
              onChangeText={(text) => setCurrency(text)}
              keyboardType="default"
              placeholder="PLN"
              maxLength={5}
              placeholderTextColor={COLORS_STYLE.labelGrey}
            />
            {errorCurrency.state && (
              <Text style={styles.error}>{errorCurrency.message}</Text>
            )}
            <View style={styles.modalButtonsBox}>
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalButtonText}>Anuluj</Text>
              </Pressable>
              <Text style={styles.textGold}>|</Text>
              <Pressable style={styles.modalButton} onPress={submitCheck}>
                <Text style={styles.modalButtonText}>Zapisz</Text>
              </Pressable>
            </View>
            {accountId !== "UNIQUE" && (
              <Pressable
                style={styles.deleteButtoncontainer}
                onPress={() => {
                  setShowdeleteModal(true);
                }}
              >
                <View style={styles.deleteButtonBox}>
                  <Text style={styles.modalButtonText}>Usuń konto</Text>
                </View>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
      {showDeleteModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDeleteModal}
          onRequestClose={() => {
            Alert.alert("Zmiany nie zostały wprowadzone!");
            setShowdeleteModal(false);
          }}
        >
          <View style={styles.modalLayout}>
            <View style={[styles.modalView]}>
              <Text style={styles.header}>Na pewno ?</Text>
              <Text style={styles.modalInfo}>
                Wszystkie wydatki, które zostały zarejestrowane zostaną w
                pamięci aplikacji i będą uwzględniane przy generowaniu
                podsumowań.
              </Text>
              <View style={styles.modalButtonsBox}>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => setShowdeleteModal(false)}
                >
                  <Text style={styles.modalButtonText}>Anuluj</Text>
                </Pressable>
                <Text style={styles.textGold}>|</Text>
                <Pressable
                  style={styles.modalButton}
                  onPress={onDeleteSubmitHandler}
                >
                  <Text style={styles.modalButtonText}>Potwierdź</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  modalLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000006b",
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: COLORS_STYLE.tabGrey,
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
  label: {
    color: "white",
    fontSize: 14,
    textAlign: "left",
    width: "100%",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    color: COLORS_STYLE.basicGold,
    fontWeight: "500",
  },
  error: {
    color: COLORS_STYLE.red,
    marginBottom: 10,
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
  },
  textInput: {
    borderColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 0,
    color: "white",
    marginBottom: 20,
  },
  modalButtonsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    justifyContent: "center",
    width: "40%",
  },
  modalButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  textGold: {
    color: COLORS_STYLE.basicGold,
    fontSize: 20,
  },
  modalInfo: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  deleteButtoncontainer: {
    width: "100%",
    marginTop: 30,
  },
  deleteButtonBox: {
    width: "100%",
    backgroundColor: COLORS_STYLE.red,
    borderRadius: 10,
    paddingVertical: 5,
  },
});

export default ModalEditBankAccount;

export type MonthSavings = { month: string; savings: number };
export type YearSavings = {
  year: number;
  sumOfSavings: number;
  months: MonthSavings[];
};
export type PiggyBankInitialState = {
  finantialTargets: FinantialTarget[];
  realisedTargets: RealisedTarget[];
  curentYear: number;
};
export type BankAccountsInitialState = {
  accounts: {
    accountName: string;
    accountId: string;
    currency: string;
    bankAccountStatus: number;
    yearSavings: MonthSavings[];
    yearsSavings: YearSavings[];
    currentYear: number;
  }[];
  activeAccount: { accountName: string; accountId: string; currency: string };
};
export type RealisedTarget = {
  name: string;
  iconName: string;
  targetValue: number;
  id: string;
  dateMonth: number;
};
export type FinantialTarget = {
  name: string;
  iconName: string;
  targetValue: number;
  id: string;
  incomes: {
    dateMonth: number;
    value: number;
    id: string;
    bankAccountId: string;
  }[];
};
export type ModalAddValueProps = {
  targetValue: number;
  sumOfIncomes: number;
  id: string;
  setAddValueModalVisible: (status: boolean) => void;
  addValueModalVisible: boolean;
};
export type ModalEditValueProps = {
  setEditModalVisible: (status: boolean) => void;
  editModalVisible: boolean;
  id: string;
};
export type ModalDeleteTargetProps = {
  setDeleteTargetModalVisible: (status: boolean) => void;
  deleteTargetModalVisible: boolean;
  id: string;
};
export type ModalRealisedTargetProps = {
  setRealisedTargetModalVisible: (status: boolean) => void;
  realisedTargetModalVisible: boolean;
  id: string;
  name: string;
  iconName: string;
  targetValue: number;
};
export type AddTargetFormProps = {
  onSetTargetIcon: (icon: string) => void;
  onSetTargetName: (name: string) => void;
  onSetTargetValue: (value: string) => void;
  onPressHandler: () => void;
  targetIcon: string;
  targetName: string;
  targetValue: string;
};

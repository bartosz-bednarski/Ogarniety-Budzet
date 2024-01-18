export type MonthSavings = { month: string; savings: number };
export type YearSavings = {
  year: number;
  sumOfSavings: number;
  months: MonthSavings[];
};
export type PiggyBankInitialState = {
  bankAccountStatus: number;
  finantialTargets: FinantialTarget[];
  yearSavings: MonthSavings[];
  yearsSavings: YearSavings[];
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
export type AddTargetFormProps = {
  onSetTargetIcon: (icon: string) => void;
  onSetTargetName: (name: string) => void;
  onSetTargetValue: (value: string) => void;
  onPressHandler: () => void;
  targetIcon: string;
  targetName: string;
  targetValue: string;
};

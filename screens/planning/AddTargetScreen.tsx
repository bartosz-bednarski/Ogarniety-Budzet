import AddTargetForm from "../../components/piggyBank/actualTargets/AddTargetForm";
import { useState } from "react";
import { OnPressHandler } from "../../types/settings";
import { useAppDispatch } from "../../redux/hooks";
import { setFinantialTarget } from "../../redux/piggyBank-slice";
const AddTargetScreen: React.FC<{
  route: any;
  navigation: any;
}> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const [targetName, setTargetName] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [targetIcon, setTargetIcon] = useState("add-circle-outline");
  const onSetTargetIcon = (icon: string) => {
    setTargetIcon(icon);
  };
  const onSetTargetName = (text: string) => {
    setTargetName(text);
  };
  const onSetTargetValue = (value: string) => {
    setTargetValue(value);
  };
  const onPressHandler: OnPressHandler = () => {
    if (
      targetName.length < 20 &&
      targetName.length > 0 &&
      targetValue.length > 0 &&
      targetValue.length < 11 &&
      targetIcon !== "add-circle-outline"
    ) {
      const randomId = function (length = 6) {
        return Math.random()
          .toString(36)
          .substring(2, length + 2);
      };
      const id = randomId(4);
      const incomeId = randomId(5);
      dispatch(
        setFinantialTarget({
          name: targetName,
          iconName: targetIcon,
          targetValue: targetValue,
          id: id,
          incomeId: incomeId,
        })
      );
      navigation.navigate("actualTargets");
    }
  };
  return (
    <AddTargetForm
      onSetTargetIcon={onSetTargetIcon}
      onSetTargetName={onSetTargetName}
      onSetTargetValue={onSetTargetValue}
      targetIcon={targetIcon}
      targetName={targetName}
      targetValue={targetValue}
      onPressHandler={onPressHandler}
    />
  );
};
export default AddTargetScreen;

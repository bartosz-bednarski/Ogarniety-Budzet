import { Text } from "react-native";
import COLORS_STYLE from "../styles/colors";

const Label: React.FC<{ value: string }> = ({ value }) => {
  return (
    <Text
      style={{
        color: COLORS_STYLE.labelGrey,
        fontSize: 10,
        marginVertical: 10,
        width: "100%",
        textAlign: "left",
      }}
    >
      {value}
    </Text>
  );
};

export default Label;

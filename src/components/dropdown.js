import { Select } from "@chakra-ui/react";
import useSize from "@/utilities/useSize";

const DropDown = ({ title, options, value, setter }) => {
  const size = useSize();
  return (
    <div className="dropdown" style={{ marginRight: "1vw" }}>
      <div className="dropdown-title">{title}</div>
      <Select
        placeholder="Select option"
        bg="rgba(242, 242, 242, 0.4)"
        focusBorderColor="#38B2AC"
        value={value}
        size={size > 1600 ? "lg" : size > 1280 ? "md" : size > 1024 ? "sm" : "xs"}
        marginBottom="2vw"
        marginTop="1vw"
        marginRight="1vw"
        onChange={(select) => setter(select.target.value)}
      >
        {options.map((option, i) => {
          return (
            <option key={i} value={option}>
              {option}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

export default DropDown;

import { Select } from "@chakra-ui/react";

const DropDown = ({ title, options, value, setter }) => {
  return (
    <div className="dropdown">
      <div className="dropdown-title">{title}</div>
      <Select
        placeholder="Select option"
        bg="rgba(242, 242, 242, 0.4)"
        focusBorderColor="#38B2AC"
        value={value}
        marginTop="1vw"
        marginBottom="2vw"
        pr={3}
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

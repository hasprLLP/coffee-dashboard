import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import useSize from "@/utilities/useSize";
import { useState } from "react";

const DropDown = ({ title, options, value, setter, isRequired }) => {
  const [invalid, setInvalid] = useState(false);

  const size = useSize();
  return (
    <div className="dropdown" style={{ marginRight: "1vw" }}>
      <FormControl isRequired={isRequired || false}>
        <FormLabel>{title}</FormLabel>
        <Select
          placeholder="Select option"
          bg="rgba(242, 242, 242, 0.4)"
          onBlur={() => !value && isRequired ? setInvalid(true) : setInvalid(false)}
          isInvalid={invalid}
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
                {typeof option === "object" ? option?.name : option}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropDown;

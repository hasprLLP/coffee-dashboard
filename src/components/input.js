import { Input, InputGroup, InputLeftAddon, FormControl, FormLabel } from "@chakra-ui/react";
import useSize from "@/utilities/useSize";

const TextField = ({ title, placeholder, value, setter, type, prefix, color, isRequired }) => {
  const size = useSize();
  return (
    <div className="input">
      <FormControl isRequired={isRequired}>
        <FormLabel>{title}</FormLabel>
        <InputGroup size={size > 1600 ? "lg" : size > 1280 ? "md" : size > 1024 ? "sm" : "xs"}>
          {prefix && (
            <InputLeftAddon marginBottom="2vw" marginTop="0.5vw" fontSize="0.9vw">
              {prefix}
            </InputLeftAddon>
          )}
          <Input
            value={value}
            onChange={(e) => setter(e.target.value)}
            bg={color ? "white" : "rgba(242, 242, 242, 0.4)"}
            focusBorderColor="#38B2AC"
            type={type}
            isDisabled={type === "fix" || false}
            isRequired={isRequired || false}
            marginBottom="2vw"
            marginTop="0.5vw"
            marginRight="1vw"
            fontSize="0.9vw"
            placeholder={placeholder}
          />
        </InputGroup>
      </FormControl>
    </div>
  );
};

export default TextField;

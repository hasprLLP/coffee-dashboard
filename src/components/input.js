import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import useSize from "@/utilities/useSize";

const TextField = ({ title, placeholder, value, setter, type, prefix, color }) => {
  const size = useSize();
  return (
    <div className="input">
      <div className="input-title">{title}</div>
      <InputGroup>
        {prefix && (
          <InputLeftAddon size={size > 1600 ? "lg" : size > 1280 ? "md" : size > 1024 ? "sm" : "xs"} marginBottom="2vw" marginTop="1vw">
            {prefix}
          </InputLeftAddon>
        )}
        <Input
          value={value}
          onChange={(e) => setter(e.target.value)}
          size={size > 1600 ? "lg" : size > 1280 ? "md" : size > 1024 ? "sm" : "xs"}
          bg={color ? "white" : "rgba(242, 242, 242, 0.4)"}
          focusBorderColor="#38B2AC"
          type={type}
          marginBottom="2vw"
          marginTop="1vw"
          marginRight="1vw"
          fontSize="0.9vw"
          placeholder={placeholder}
        />
      </InputGroup>
    </div>
  );
};

export default TextField;

import { Input } from "@chakra-ui/react";
import useSize from "@/utilities/useSize";

const TextField = ({ title, placeholder, value, setter }) => {
  const size = useSize();
  return (
    <div className="input">
      <div className="input-title">{title}</div>
      <Input
        value={value}
        onChange={(e) => setter(e.target.value)}
        size={size > 1600 ? "lg" : size > 1280 ? "md" : size > 1024 ? "sm" : "xs"}
        bg="rgba(242, 242, 242, 0.4)"
        focusBorderColor="#38B2AC"
        marginBottom="2vw"
        marginTop="1vw"
        fontSize="0.9vw"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;

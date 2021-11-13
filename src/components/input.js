import { Input } from "@chakra-ui/react";

const TextField = ({ title, placeholder, value, setter }) => {
  return (
    <div className="input">
      <div className="input-title">{title}</div>
      <Input
        value={value}
        onChange={(e) => setter(e.target.value)}
        size="md"
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

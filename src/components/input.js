import { Input } from "@chakra-ui/react";

const TextField = ({ title, placeholder }) => {
  console.log("title,placeholder",title,placeholder);
  
  return (
    <div className="input">
      <div className="input-title">{title}</div>
      <Input size="md" bg="rgba(242, 242, 242, 0.4)" focusBorderColor="#38B2AC" marginBottom="1vw" marginTop="0.5vw" placeholder={placeholder} />
    </div>
  );
};

export default TextField;

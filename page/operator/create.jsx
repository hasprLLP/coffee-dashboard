//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import SaveButton from "@/components/button";
import { useState } from "react";

//& Create & Export Driver [#FUNCTION#]
export default function CreateOperator() {
  const [name, setName] = useState("");
  // useState for address , email , password , phone , and photo ,
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState(false);
  const [photo, setPhoto] = useState("");

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: "Name", placeholder: "Please enter full name", value: name, setter: setName },
    { title: "Address", placeholder: "Address, with city ", value: address, setter: setAddress },
    { title: "Email", placeholder: "Email to login and contact", type: "email", value: email, setter: setEmail },
    { title: "Phone number", placeholder: "Provide a valid phone number", type: "number", value: phone, setter: setPhone },
    { title: "Alternative Phone number", placeholder: "Not mandatory", type: "number", value: alternatePhone, setter: setAlternatePhone },
    { title: "Password", placeholder: "Password", value: password, setter: setPassword },
    { title: "Photo", placeholder: "Select a photo", type: "file", value: photo, setter: setPhoto },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Create Driver</div>
        <div className="layout-form">
          {fields.map((item, i) => {
            return <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />;
          })}
        </div>
        <SaveButton />
      </div>
    </div>
  );
}

//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import SaveButton from "@/components/saveButton";
import { useState } from "react";

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [name, setName] = useState("");
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState();

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: "School Name", isRequired: true,placeholder: "Enter School Name", value: name, setter: setName },
    { title: "City", isRequired: true,placeholder: "City of the school", value: city, setter: setCity },
    { title: "Address",isRequired: true, placeholder: "Address of the school", value: address, setter: setAddress },
    { title: "Zip Code",isRequired: true, type: "number", placeholder: "Enter Zip Code", value: zip, setter: setZip },
    { title: "Phone", placeholder: "School Contact Number", type: "tel", prefix: "+91", value: phone, setter: setPhone },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Add School</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
        {fields.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                type={item.type}
                key={i}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                setter={item.setter}
                prefix={item.prefix}
                isRequired={item.isRequired}
              />
            );
          })}
        </div>
        <SaveButton
          collection={"school"}
          data={{
            name,
            city,
            address,
            zip,
            phone,
            location: {
              type: "Point",
              coordinates: [23.854080641497234, 78.7799817655712],
              address: "Adarsh Nagar, Anand Nagar, Makroniya, Madhya Pradesh 470001",
            },
          }}
        />
      </div>
    </div>
  );
}

//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import SaveButton from "@/components/button";
import { useState } from "react";

//& Create & Export Driver [#FUNCTION#]
export default function Driver() {

  const [driver, setDriver] = useState("");

  console.log("driver",driver);
  
  
  //$ States and Hooks [#STATES#]
  const fields = [
    { title: "Name", placeholder: "Enter Name", value: driver, setter: setDriver },
    { title: "Place", placeholder: "Enter Name" },
    { title: "Ok", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
    { title: "Name", placeholder: "Enter Name" },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="driver">
        <div className="driver-title">Create Driver</div>
        <div className="driver-form">
          {fields.map((item,i) => {
            return <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />;
          })}
        </div>
        <SaveButton />
      </div>
    </div>
  );
}

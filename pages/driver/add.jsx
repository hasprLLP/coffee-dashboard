//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import FilePicker from "@/components/filepicker";
import SaveButton from "@/components/saveButton";
import { useState } from "react";

//& Create & Export Driver [#FUNCTION#]
export default function Create() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [school, setSchool] = useState("");
  const [photo, setPhoto] = useState("");
  const [sign, setSign] = useState("");
  const [dl, setDl] = useState("");

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: "Driver Name", placeholder: "Bus Operator Name", value: name, setter: setName },
    { title: "Date of Birth", placeholder: "ex 09/11/2021", value: age, setter: setAge },
    { title: "Mobile No", placeholder: "Operator Phone no", type: "number", value: phone, setter: setPhone },
    { title: "Landline (Optional)", placeholder: "Additional Contact no", value: phone2, setter: setPhone2 },
    { title: "School Name", options: ["DMA", "St Mary", "Joseph"], value: school, setter: setSchool, type: "dropdown" },
    { title: "Upload Passport Photo", value: photo, setter: setPhoto, type: "upload" },
    { title: "Upload Signature", value: sign, setter: setSign, type: "upload" },
    { title: "Upload Driving License", value: dl, setter: setDl, type: "upload" },
  ];

  // FIXME:className 'driver', 'driver-form' & 'driver-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="driver">
        <div className="driver-form" style={{ justifyContent: "flex-start" }}>
          {fields.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === "upload" ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            );
          })}
        </div>
        <SaveButton
          collection={"bus"}
          // data={{ name, busNumber, capacity }}
        />
      </div>
    </div>
  );
}

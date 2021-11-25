//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import SaveButton from "@/components/saveButton";
import { useState } from "react";

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [join, setJoin] = useState("");
  const [guardian, setGuardian] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [address, setAddress] = useState("");
  const [classs, setClasss] = useState("");
  const [section, setSection] = useState("");
  const [school, setSchool] = useState("");
  const [bus, setBus] = useState("");
  const [route, setRoute] = useState("");
  const [fee, setFee] = useState("");

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: "Student Name", placeholder: "Enter Passenger name", value: name, setter: setName },
    { title: "Date of Birth", placeholder: "eg 02/07/2003", value: dob, setter: setDob },
    { title: "Joining Date", placeholder: "eg 21/09/2021", value: join, setter: setJoin },
    { title: "Guardian Name", placeholder: "Father/Mother etc", value: guardian, setter: setGuardian },
    { title: "Guardian Mobile", placeholder: "Parent Contact No", value: phone, setter: setPhone, type: "tel", prefix: "+91" },
    { title: "Guardian Landline (Optional)", placeholder: "Guardian Landline no", value: phone2, setter: setPhone2, type: "tel" },
    { title: "Guardian Address", placeholder: "Full Address", value: address, setter: setAddress },
    { title: "Student Class", placeholder: "Current Standard", value: classs, setter: setClasss },
    { title: "Student Section", placeholder: "Section if any", value: section, setter: setSection },
    { title: "School", options: ["School Some", "School More"], value: school, setter: setSchool, type: "dropdown" },
    { title: "Bus", options: ["Bus Some", "Bus More"], value: bus, setter: setBus, type: "dropdown" },
    { title: "Route", options: ["Route Some", "Route More"], type: "number", value: route, setter: setRoute, type: "dropdown" },
    { title: "Monthly Fee", placeholder: "Student Fee Monthly", type: "number", value: fee, setter: setFee, prefix: "₹" },
  ];

  // FIXME:className 'driver', 'driver-form' & 'driver-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="driver">
        <div className="driver-title">Add Student</div>
        <div className="driver-form">
          {fields.map((item, i) => {
            return item.type !== "dropdown" ? (
              <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} prefix={item.prefix} />
            ) : (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
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

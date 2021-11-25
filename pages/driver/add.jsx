//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import SaveButton from "@/components/saveButton";
import { useState } from "react";

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [no, setNo] = useState("");
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [capacity, setCapacity] = useState(8);
  const [school, setSchool] = useState("");
  const [route, setRoute] = useState("");

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: "Bus No (RC)", placeholder: "Provide RC No", value: no, setter: setNo },
    { title: "Bus Name", placeholder: "Enter a name for the bus", value: name, setter: setName },
    { title: "Owner Name", placeholder: "Bus Owner", value: owner, setter: setOwner },
    { title: "Student Capacity", placeholder: "Capacity Information", type: "number", value: capacity, setter: setCapacity },
  ];

  const dropdowns = [
    { title: "School Name", options: ["DMA", "St Mary", "Joseph"], value: school, setter: setSchool },
    { title: "Route", options: ["Makronia to DMA", "Church to Home"], value: route, setter: setRoute },
  ];

  // FIXME:className 'driver', 'driver-form' & 'driver-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="driver">
        <div className="driver-title">Add Bus</div>
        <div className="driver-form">
          {fields.map((item, i) => {
            return <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />;
          })}
          {dropdowns.map((item, i) => {
            return <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />;
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

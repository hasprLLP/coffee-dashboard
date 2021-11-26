//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import UpdateButton from "@/components/updateButton";
import DeleteButton from "@/components/deleteButton";
import { useState } from "react";
import { useRouter } from "next/router";

//& Create & Export Driver [#FUNCTION#]
export default function EditBus() {
  const router = useRouter();
  const { id } = router.query;
  // const data = JSON.parse(router.query.data);

  const [no, setNo] = useState("MP15CB9474");
  const [name, setName] = useState("Dma Bus");
  const [owner, setOwner] = useState("Abhay Rohit");
  const [capacity, setCapacity] = useState(20);
  const [school, setSchool] = useState("DMA");
  const [route, setRoute] = useState("Makronia to DMA");

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
        <div className="driver-title">Modify Bus Details</div>
        <div className="driver-form" style={{ justifyContent: "flex-start" }}>
          {fields.map((item, i) => {
            return <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />;
          })}
          {dropdowns.map((item, i) => {
            return <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />;
          })}
        </div>
        <div className="driver-edit-row">
          <UpdateButton
            collection={"bus"}
            // data={{ name, busNumber, capacity }}
          />
          <DeleteButton
            collection={"bus"}
            // data={{ name, busNumber, capacity }}
          />
        </div>
      </div>
    </div>
  );
}

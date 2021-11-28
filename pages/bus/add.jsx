//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import SaveButton from "@/components/saveButton";
import { useState } from "react";
//import server from '@/functions/server';

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [busNumber, setBusNumber] = useState("");
  const [RCNumber, setRCNumber] = useState();
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [capacity, setCapacity] = useState(20);
  const [vehicleType, setVehicleType] = useState("Bus");

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: "Bus Name (or ID)", isRequired: true, placeholder: "Bus Name for Reference", value: name, setter: setName },
    { title: "Bus No (RC)", isRequired: true, placeholder: "Provide Registration No", value: RCNumber, setter: setRCNumber },
    { title: "Owner Name", placeholder: "Bus Owner Name", value: owner, setter: setOwner },
    { title: "Owner Phone", placeholder: "Bus Owner Phone", value: ownerPhone, setter: setOwnerPhone },
    { title: "Capacity", placeholder: "Bus Seating Capacity", type: "number", value: capacity, setter: setCapacity },
    { title: "Vehicle Type", options: ["Bus", "Mini-Bus", "Van"], value: vehicleType, setter: setVehicleType, type: "dropdown" },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Add Bus</div>
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
          collection={"bus"}
          data={{
            busNumber,
            RCNumber,
            name,
            owner,
            capacity,
          }}
        />
      </div>
    </div>
  );
}

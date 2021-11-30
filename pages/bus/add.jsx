//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import SaveButton from "@/components/saveButton";
import FilePicker from "@/components/filepicker";
import { useState } from "react";
import { Switch } from "@chakra-ui/react";
//import server from '@/functions/server';

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [RCNumber, setRCNumber] = useState();
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [capacity, setCapacity] = useState(40);
  const [commission, setCommission] = useState(10);
  const [vehicleType, setVehicleType] = useState("Bus");
  const [selfOwn, setSelfOwn] = useState(false);
  const [RCPhoto, setRCPhoto] = useState("");
  const [permitPhoto, setPermitPhoto] = useState("");
  const [pucPhoto, setPucPhoto] = useState("");

  const setterArray = [setRCNumber, setName, setOwnerName, setOwnerPhone, setRCPhoto, setPermitPhoto, pucPhoto];

  //$ States and Hooks [#STATES#]
  const basicFields = [
    { title: "Bus Name (or ID)", isRequired: true, placeholder: "Bus Name for Reference", value: name, setter: setName },
    { title: "Bus No (RC)", isRequired: true, placeholder: "Provide Registration No", value: RCNumber, setter: setRCNumber },
    { title: "Capacity", placeholder: "Bus Seating Capacity", type: "number", value: capacity, setter: setCapacity },
    { title: "Commission", placeholder: "Owner Commission", type: "number", value: commission, setter: setCommission },
    { title: "Vehicle Type", options: ["Bus", "Mini-Bus", "Van"], value: vehicleType, setter: setVehicleType, type: "dropdown" },
    { title: "RC Photo", value: RCPhoto, setter: setRCPhoto, type: "upload" },
    { title: "Permit Photo", value: permitPhoto, setter: setPermitPhoto, type: "upload" },
    { title: "PUC Photo", value: pucPhoto, setter: setPucPhoto, type: "upload" },
  ];
  const ownerFields = [
    { title: "Owner Name", placeholder: "Bus Owner Name", value: ownerName, setter: setOwnerName },
    { title: "Owner Phone", placeholder: "Bus Owner Phone", value: ownerPhone, setter: setOwnerPhone },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Add Bus</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          {basicFields.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === "upload" ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
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
          {!selfOwn
            ? ownerFields.map((item, i) => {
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
              })
            : null}
        </div>
        <div className="layout-not-student">
          <h1>Self Own Bus ?</h1>
          <Switch
            onChange={(e) => {
              setSelfOwn(e.target.checked);
            }}
            value={selfOwn}
            size="md"
            defaultIsChecked={false}
          />
        </div>
        <SaveButton
          collection={"bus"}
          reset={setterArray}
          data={{
            name,
            RCNumber,
            ownerName,
            ownerPhone,
            capacity,
            selfOwn,
            vehicleType,
            commission,
          }}
        />
      </div>
    </div>
  );
}

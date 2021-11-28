//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import GoBack from "@/helpers/goback";
import DropDown from "@/components/dropdown"
import UpdateButton from "@/components/updateButton";
import DeleteButton from "@/components/deleteButton";
import { useState } from "react";
import { useRouter } from "next/router";

//& Create & Export Driver [#FUNCTION#]
export default function EditBus() {
  const router = useRouter();
  const { id } = router.query;
  const data = JSON.parse(router.query.data);

  const [RCNumber, setRCNumber] = useState(data.RCNumber);
  const [name, setName] = useState(data.name);
  const [owner, setOwner] = useState(data.owner);
  const [ownerPhone, setOwnerPhone] = useState(data.ownerPhone);
  const [capacity, setCapacity] = useState(data.capacity);
  const [vehicleType, setVehicleType] = useState(data.vehicleType || "Bus")

//$ States and Hooks [#STATES#]
const fields = [
  { title: "Bus Name (or ID)", isRequired: true, placeholder: "Bus Name for Reference", value: name, setter: setName },
  { title: "Bus No (RC)", isRequired: true, placeholder: "Provide Registration No", value: RCNumber, setter: setRCNumber },
  { title: "Owner Name", placeholder: "Bus Owner Name", value: owner, setter: setOwner },
  { title: "Owner Phone", placeholder: "Bus Owner Phone", value: ownerPhone, setter: setOwnerPhone },
  { title: "Capacity", placeholder: "Bus Seating Capacity", type: "number", value: capacity, setter: setCapacity },
  { title: "Vehicle Type", options: ["Bus", "Mini-Bus", "Van"], value: vehicleType, setter: setVehicleType, type: "dropdown" },
];

  // FIXME:className 'driver', 'layout-form' & 'layout-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Modify Bus Details
        </div>
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
        <div className="layout-edit-row">
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

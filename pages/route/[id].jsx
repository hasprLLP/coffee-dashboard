//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import UpdateButton from "@/components/updateButton";
import DeleteButton from "@/components/deleteButton";
import { LoadScript } from "@react-google-maps/api";
import Map from "@/utilities/map";
import { useState } from "react";
import { useRouter } from "next/router";

//& Create & Export Driver [#FUNCTION#]
export default function EditBus() {
  const router = useRouter();
  const { id } = router.query;
  // const data = JSON.parse(router.query.data);

  const lib = ["places"];
  const key = "AIzaSyCHvfKSXzV5-wKUkV5XvwJwp4n5RHc9lNA";

  const [name, setName] = useState("Makronia DMA Route");
  const [start, setStart] = useState("Makronia Chowraha");
  const [school, setSchool] = useState("DMA");
  const [stops, setStops] = useState("Makronia,Civil Line,Katra");

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: "Route Name", placeholder: "Route Name", value: name, setter: setName },
    { title: "Starting Point", placeholder: "Starting Point Full Address", value: start, setter: setStart },
    { title: "School Name", options: ["DMA", "St Mary", "Joseph"], value: school, setter: setSchool, type: "dropdown" },
    { title: "Add Stops (Optional)", placeholder: "Makronia,Katra,Tili... etc", value: stops, setter: setStops },
  ];


  // FIXME:className 'driver', 'driver-form' & 'driver-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="driver">
        <div className="driver-title">Modify Route Details</div>
        <div className="driver-form">
          {fields.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            );
          })}
        </div>
        <LoadScript googleMapsApiKey={key} libraries={lib}>
            <Map />
          </LoadScript>
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

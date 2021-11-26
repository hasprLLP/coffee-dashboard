//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import SaveButton from "@/components/button";
import { LoadScript } from "@react-google-maps/api";
import Map from "@/utilities/map";

import { useState } from "react";

//& Create & Export Driver [#FUNCTION#]
export default function AddRoute() {
  const lib = ["places"];
  const key = "AIzaSyCHvfKSXzV5-wKUkV5XvwJwp4n5RHc9lNA";

  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [school, setSchool] = useState("");
  const [stops, setStops] = useState("");

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: "Route Name", placeholder: "Route Name", value: name, setter: setName },
    { title: "Starting Point", placeholder: "Starting Point Full Address", value: start, setter: setStart },
    { title: "School Name", options: ["DMA", "St Mary", "Joseph"], value: school, setter: setSchool, type: "dropdown" },
    { title: "Add Stops (Optional)", placeholder: "Makronia,Katra,Tili... etc", value: stops, setter: setStops },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="driver">
        <div className="driver-title">Add Route</div>
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
        <SaveButton />
      </div>
    </div>
  );
}

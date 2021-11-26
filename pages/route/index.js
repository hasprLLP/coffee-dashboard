//& Input Components [#IMPORTS#]
import SimpleCard from "@/components/simplecard";
import TextField from "@/components/input";
import SaveButton from "@/components/button";
import { useState } from "react";

//& Create & Export Driver [#FUNCTION#]
export default function ViewRoute() {
  const [routeName, setRouteName] = useState("");

  //$ States and Hooks [#STATES#]
  const fields = [
    { name: "Route Name", school: "DMA School", start: "Starting Point", end: "Destination Point", type: "route" },
    { name: "Route Name", school: "DMA School", start: "Starting Point", end: "Destination Point", type: "route" },
    { name: "Route Name", school: "DMA School", start: "Starting Point", end: "Destination Point", type: "route" },
    { name: "Route Name", school: "DMA School", start: "Starting Point", end: "Destination Point", type: "route" },
    { name: "Route Name", school: "DMA School", start: "Starting Point", end: "Destination Point", type: "route" },
    { name: "Route Name", school: "DMA School", start: "Starting Point", end: "Destination Point", type: "route" },
    { name: "Route Name", school: "DMA School", start: "Starting Point", end: "Destination Point", type: "route" },
    { name: "Route Name", school: "DMA School", start: "Starting Point", end: "Destination Point", type: "route" },
    { name: "Route Name", school: "DMA School", start: "Starting Point", end: "Destination Point", type: "route" },
    { name: "Route Name", school: "DMA School", start: "Starting Point", end: "Destination Point", type: "route" },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home" style={{ backgroundColor: "var(--chakra-colors-gray-100)" }}>
      <div className="driver">
        <TextField title={"Search Route Name"} placeholder={"Type Route Details"} value={routeName} setter={setRouteName} color={"white"} />
        <div className="driver-form" style={{ justifyContent: "flex-start" }}>
          {fields.map((item, i) => {
            return <SimpleCard key={i} name={item.name} school={item.school} start={item.start} end={item.end} type={item.type} />;
          })}
        </div>
      </div>
    </div>
  );
}

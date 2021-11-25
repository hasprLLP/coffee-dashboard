//& Input Components [#IMPORTS#]
import SimpleCard from "@/components/simplecard";
import SaveButton from "@/components/button";
import { useState } from "react";

//& Create & Export Driver [#FUNCTION#]
export default function ViewRoute() {
  //$ States and Hooks [#STATES#]
  const fields = [
    { name: "Route Name", id: "Route ID", start: "Starting Point", end: "Destination Point" },
    { name: "Route Name", id: "Route ID", start: "Starting Point", end: "Destination Point" },
    { name: "Route Name", id: "Route ID", start: "Starting Point", end: "Destination Point" },
    { name: "Route Name", id: "Route ID", start: "Starting Point", end: "Destination Point" },
    { name: "Route Name", id: "Route ID", start: "Starting Point", end: "Destination Point" },
    { name: "Route Name", id: "Route ID", start: "Starting Point", end: "Destination Point" },
    { name: "Route Name", id: "Route ID", start: "Starting Point", end: "Destination Point" },
    { name: "Route Name", id: "Route ID", start: "Starting Point", end: "Destination Point" },
    { name: "Route Name", id: "Route ID", start: "Starting Point", end: "Destination Point" },
    { name: "Route Name", id: "Route ID", start: "Starting Point", end: "Destination Point" },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home" style={{ backgroundColor: "var(--chakra-colors-gray-100)" }}>
      <div className="driver">
        <div className="driver-title">View and Modify Routes</div>
        <div className="driver-form" style={{ justifyContent: "flex-start"}}>
          {fields.map((item, i) => {
            return <SimpleCard key={i} name={item.name} id={item.id} start={item.start} end={item.end} />;
          })}
        </div>
      </div>
    </div>
  );
}

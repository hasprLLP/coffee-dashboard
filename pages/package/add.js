//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import SaveButton from "@/components/saveButton";
import axios from "axios";
import { LoadScript } from "@react-google-maps/api";
import Map from "@/utilities/map";
import { useState, useEffect } from "react";
import server from "src/backend/node/server";

//& Create & Export Driver [#FUNCTION#]
export default function AddRoute() {
  const lib = ["places"];
  const key = "AIzaSyCHvfKSXzV5-wKUkV5XvwJwp4n5RHc9lNA";

  const [name, setName] = useState();
  const [monthly, setMonthly] = useState();
  const [quarterly, setQuarterly] = useState();
  const [halfYearly, setHalfYearly] = useState();
  const [annually, setAnnually] = useState();

  const setterArray = [setName, setMonthly, setQuarterly, setHalfYearly, setAnnually];

  //$ States and Hooks [#STATES#]
  const basic = [
    {
      title: "Package Name",
      placeholder: "Name of Fee Template",
      isRequired: true,
      value: name,
      setter: setName,
    },
  ];
  const fee = [
    { title: "Monthly",  isRequired: true,placeholder: "1 Month Fee", value: monthly, setter: setMonthly, prefix: "₹" },
    { title: "Quarterly", isRequired: true, placeholder: "3 Month Fee", value: quarterly, setter: setQuarterly, prefix: "₹" },
    { title: "Half Yearly", isRequired: true, placeholder: "6 Month Fee", value: halfYearly, setter: setHalfYearly, prefix: "₹" },
    { title: "Annually",  isRequired: true,placeholder: "12 Month Fee", value: annually, setter: setAnnually, prefix: "₹" },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Add Package</div>
        <div className="layout-sub-title">Package Details</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          {basic.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField isRequired={item.isRequired} type={item.type} key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            );
          })}
        </div>
        <div className="layout-sub-title">Fee Details</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          {fee.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                type={item.type}
                isRequired={item.isRequired} 
                key={i}
                title={item.title}
                placeholder={item.placeholder}
                prefix={item.prefix}
                value={item.value}
                setter={item.setter}
              />
            );
          })}
        </div>
        <SaveButton
          collection={"package"}
          reset={setterArray}
          data={{
            name,
            monthly,
            quarterly,
            halfYearly,
            annually,
          }}
        />
      </div>
    </div>
  );
}

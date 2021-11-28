//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import UpdateButton from "@/components/updateButton";
import DeleteButton from "@/components/deleteButton";
import { LoadScript } from "@react-google-maps/api";
import GoBack from "@/helpers/goback";
import Map from "@/utilities/map";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import server from "@/functions/server";

//& Create & Export Driver [#FUNCTION#]
export default function EditRoute() {
  const router = useRouter();
  const { id } = router.query;
  const data = JSON.parse(router.query.data);

  const lib = ["places"];
  const key = "AIzaSyCHvfKSXzV5-wKUkV5XvwJwp4n5RHc9lNA";
  const getSchool = async () => {
    try {
      const response = await server.get(`${process.env.SERVER_URL}school/`);
      setSchool(response.data.data);
      const tempSchoolName = [];
      response.data.data.map((school) => {
        tempSchoolName.push(school.name);
      });
      setSchoolNames(tempSchoolName);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getBus = async () => {
    try {
      const response = await server.get(`${process.env.SERVER_URL}bus/`);
      setBus(response.data.data);
      const tempSchoolName = [];
      response.data.data.map((school) => {
        tempSchoolName.push(school.name);
      });
      setBusNames(tempSchoolName);
    } catch (error) {
      console.log("error", error);
    }
  };

  const setSchoolID = (name) => {
    // get the object with name = school from array of schools
    const schoolObj = school?.find((school) => school.name === name);
    setSchool(schoolObj.id);
  };
  const setBusID = (name) => {
    // get the object with name = school from array of schools
    const busObj = bus?.find((bus) => bus.name === name);
    setBus(busObj.id);
  };

  useEffect(() => {
    getSchool();
    getBus();
  }, []);

  const [name, setName] = useState(data.name);
  const [morningDeparture, setMorningDeparture] = useState(data.morningDeparture);
  const [morningArrival, setMorningArrival] = useState(data.morningArrival);
  const [eveningDeparture, setEveningDeparture] = useState(data.eveningDeparture);
  const [note, setNote] = useState(data.not);
  const [school, setSchool] = useState();
  const [schoolNames, setSchoolNames] = useState([]);
  const [bus, setBus] = useState();
  const [busNames, setBusNames] = useState([]);

  //$ States and Hooks [#STATES#]
  const timing = [
    {
      title: "Bus Starts (Morning)",
      type: "time",
      placeholder: "Time of departure in morning",
      value: morningDeparture,
      setter: setMorningDeparture,
    },
    {
      title: "Bus Reaches School (Morning)",
      type: "time",
      placeholder: "Time of arrival at school in morning",
      value: morningArrival,
      setter: setMorningArrival,
    },
    {
      title: "Bus Leaves School (Evening)",
      type: "time",
      placeholder: "Time of departure in evening",
      value: eveningDeparture,
      setter: setEveningDeparture,
    },
  ];
  const details = [
    { title: "Name", placeholder: "Route Name", value: name, setter: setName },
    { title: "Starts from", placeholder: "Starting Point Address", value: name, setter: setName },
    { title: "Destination (School)", options: schoolNames, value: school?.name, setter: setSchoolID, type: "dropdown" },
    { title: "Assign Bus", options: busNames, value: bus?.name, setter: setBusID, type: "dropdown" },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Modify Route
        </div>
        <div className="layout-sub-title">Timing Details</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          {timing.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField type={item.type} key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            );
          })}
        </div>
        <div className="layout-sub-title">Basic Details</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          {details.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField type={item.type} key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            );
          })}
        </div>
        <LoadScript googleMapsApiKey={key} libraries={lib}>
          <Map />
        </LoadScript>
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

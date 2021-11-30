//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import FilePicker from "@/components/filepicker";
import SaveButton from "@/components/saveButton";
import { Switch } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import server from "src/functions/server";

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [name, setName] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [DOB, setDOB] = useState("");
  const [guardian, setGuardian] = useState("");
  const [phone, setPhone] = useState();
  const [landline, setLandline] = useState();
  const [guardianPhone, setGuardianPhone] = useState();
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [schools, setSchools] = useState("");
  const [school, setSchool] = useState("");
  const [routes, setRoutes] = useState();
  const [route, setRoute] = useState();
  const [feeDuration, setFeeDuration] = useState("");
  const [fee, setFee] = useState("");
  const [discount, setDiscount] = useState("");
  const [photo, setPhoto] = useState("");
  const [finalAmount, setFinalAmount] = useState((fee && discount && fee - discount) || 0);
  const [bus, setBus] = useState();
  const [cls, setCls] = useState("");
  const [section, setSection] = useState("");

  const setterArray = [
    setName,
    setDOB,
    setGuardian,
    setPhone,
    setLandline,
    setGuardianPhone,
    setAddress,
    setLocation,
    setSchool,
    setRoute,
    setFeeDuration,
    setFee,
    setDiscount,
    setPhoto,
    setFinalAmount,
    setBus,
    setSection,
    setCls
  ];

  useEffect(() => {
    if (fee && discount) {
      setFinalAmount(fee - discount);
    } else setFinalAmount(0);
  }, [fee, discount]);

  const [schoolNames, setSchoolNames] = useState([]);
  const [routeNames, setRouteNames] = useState([]);

  const setSchoolID = (name) => {
    // get the object with name = school from array of schools
    const schoolObj = schools?.find((school) => school.name === name);
    setSchool(schoolObj.id);
  };
  const setRouteID = (name) => {
    // get the object with name = school from array of schools
    const routeObj = routes?.find((bus) => bus.name === name);
    setRoute(routeObj.id);
  };

  //$ States and Hooks [#STATES#]
  const basicFields = [
    { title: "Name", isRequired: true, placeholder: "Enter Passenger name", value: name, setter: setName },
    { title: "Mobile", isRequired: true, placeholder: "Contact No", value: phone, setter: setPhone, type: "tel", prefix: "+91" },
    { title: "Upload Photo", value: photo, setter: setPhoto, type: "upload" },
    { title: "Date of Birth", type: "date", placeholder: "eg 02/07/2003", value: DOB, setter: setDOB },
  ];

  const guardianDetails = [
    { title: "Guardian Name", isRequired: true, placeholder: "Father/Mother etc", value: guardian, setter: setGuardian },
    {
      title: "Guardian Mobile",
      isRequired: true,
      placeholder: "Parent Contact No",
      value: guardianPhone,
      setter: setGuardianPhone,
      type: "tel",
      prefix: "+91",
    },
    { title: "Guardian Landline (Optional)", placeholder: "Guardian Landline no", value: landline, setter: setLandline, type: "tel" },
  ];

  const boardingDetails = [
    { title: "Full Address", isRequired: true, placeholder: "Boarding Point Address", value: address, setter: setAddress },
    { title: "School", isRequired: true, options: schoolNames, value: school?.name, setter: setSchoolID, type: "dropdown" },
    { title: "Route", isRequired: true, options: routeNames, type: "number", value: route?.name, setter: setRouteID, type: "dropdown" },
  ];
  const feeDetails = [
    {
      title: "Fee Duration",
      options: ["Monthly (1 Month)", "Quarterly (3 Months)", "Half-Yearly (6 Months)", "Anually (12 Months)"],
      value: feeDuration,
      setter: setFeeDuration,
      type: "dropdown",
    },
    { title: "Fee Amount", placeholder: "Fee for Selected Duration", type: "number", value: fee, setter: setFee, prefix: "₹" },
    { title: "Discount", placeholder: "Discount on Fee", type: "number", value: discount, setter: setDiscount, prefix: "₹" },
    { title: "Final Amount", placeholder: "Final AMount", type: "fix", value: finalAmount, setter: setFinalAmount, prefix: "₹" },
  ];

  const getSchool = async () => {
    try {
      const response = await server.get(`${process.env.SERVER_URL}school/`);
      setSchools(response.data.data);
      const tempSchoolName = [];
      response.data.data.map((school) => {
        tempSchoolName.push(school.name);
      });
      setSchoolNames(tempSchoolName);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getRoutes = async () => {
    try {
      const response = await server.get(`${process.env.SERVER_URL}route${school ? `?school=${school}` : ""}`);
      setRoutes(response.data.data);
      const tempSchoolName = [];
      response.data.data.map((school) => {
        tempSchoolName.push(school.name);
      });
      setRouteNames(tempSchoolName);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };

  useEffect(() => {
    getSchool();
  }, []);

  useEffect(() => {
    getRoutes();
  }, [school]);

  // FIXME:className 'driver', 'layout-form' & 'layout-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Add {isStudent ? "Student" : "Teacher"}</div>
        <div className="layout-sub-title">{isStudent ? "Student" : "Teacher"} Details</div>
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
        </div>
        {isStudent ? (
          <>
            <div className="layout-sub-title">Guardian Details</div>
            <div className="layout-form" style={{ justifyContent: "flex-start" }}>
              {guardianDetails.map((item, i) => {
                return item.type === "dropdown" ? (
                  <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
                ) : item.type === "upload" ? (
                  <FilePicker title={item.title} value={item.value} setter={item.setter} />
                ) : (
                  <TextField
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
          </>
        ) : null}
        <div className="layout-sub-title">Boarding Details</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          {boardingDetails.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} isRequired={item.isRequired} />
            ) : item.type === "upload" ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
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
        <div className="layout-sub-title">Fee Details</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          {feeDetails.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === "upload" ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                key={i}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                setter={item.setter}
                prefix={item.prefix}
                type={item.type}
              />
            );
          })}
        </div>
        <div className="layout-not-student">
          <h1>Adding Teacher/Passenger ?</h1>
          <Switch
            onChange={(e) => {
              setIsStudent(!e.target.checked);
            }}
            value={!isStudent}
            size="md"
            defaultIsChecked={false}
          />
        </div>
        <SaveButton
          collection={"admin/passenger"}
          reset={setterArray}
          data={{
            name,
            phone,
            photo,
            DOB,
            guardian: {
              name: guardian,
              phone: guardianPhone,
              landline: landline,
            },
            route,
            location: {
              type: "Point",
              coordinates: [23.861998, 78.803366],
              address: "MIG 71, Gour Nagar , Makronia , Sagar",
            },
            fee,
            isStudent,
          }}
        />
      </div>
    </div>
  );
}

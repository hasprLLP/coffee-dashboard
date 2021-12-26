//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import FilePicker from "@/components/filepicker";
import SaveButton from "@/components/saveButton";
import { Switch } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { async } from "@firebase/util";

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [name, setName] = useState();
  const [studentID, setStudentID] = useState();
  const [isStudent, setIsStudent] = useState(true);
  const [DOB, setDOB] = useState();
  const [joiningDate, setJoiningDate] = useState();
  const [dueDate, setDueDate] = useState();
  const [guardian, setGuardian] = useState();
  const [phone, setPhone] = useState();
  const [landline, setLandline] = useState();
  const [address, setAddress] = useState();
  const [location, setLocation] = useState();
  const [school, setSchool] = useState({});
  const [schools, setSchools] = useState([]);
  const [schoolNames, setSchoolNames] = useState([]);
  const [route, setRoute] = useState({});
  const [routes, setRoutes] = useState([]);
  const [routeNames, setRouteNames] = useState([]);
  const [photo, setPhoto] = useState();
  const [amount, setAmount] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState();
  const [cls, setCls] = useState();

  const setterArray = [
    setName,
    setDOB,
    setGuardian,
    setPhone,
    setLandline,
    setAddress,
    setLocation,
    setRoute,
    setPhoto,
    setJoiningDate,
    setDueDate,
    setCls,
    setAmount,
    setDeposit,
    setRemainingAmount,
  ];

  const getSchools = async () => {
    try {
      const response = await axios.get(`school/`);
      setSchools(response.data.data);
      const tempSchoolNames = [];
      response.data.data.map((school) => {
        tempSchoolNames.push(school.name);
      });
      setSchoolNames(tempSchoolNames);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getRoutes = async () => {
    try {
      const response = await axios.get(`route${school ? `?school=${school?.id}` : ""}`);
      setRoutes(response.data.data);
      const tempRoutesName = [];
      response.data.data.map((route) => {
        tempRoutesName.push(route.name);
      });
      setRouteNames(tempRoutesName);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };

  const setSchoolID = (schoolName) => {
    const schoolObj = schools?.find((school) => school?.name === schoolName);
    setSchool(schoolObj);
  };
  const setRouteID = (routeName) => {
    const routeObj = routes?.find((route) => route?.name === routeName);
    setRoute(routeObj);
  };

  useEffect(() => {
    getSchools();
  }, []);

  //$ Get Count
  // const getCount = async (school) => {
  //   try {
  //     let prefix = school?.prefix;
  //     let count = await axios.get(`misc/get_passenger_school/${school?.id}`);
  //     console.log(prefix);
      
  //     console.log(count.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };

  useEffect(() => {
    getRoutes();
    // if (school?.id) {
    //   getCount(school);
    // }
  }, [school]);

  useEffect(() => {
    setRemainingAmount(amount - deposit);
  }, [amount, deposit]);

  //$ States and Hooks [#STATES#]
  const basicFields = [
    { title: "Name", isRequired: true, placeholder: "Enter Passenger name", value: name, setter: setName },

    { title: "Upload Photo", value: photo, setter: setPhoto, type: "upload" },
    { title: "Date of Birth", type: "date", placeholder: "eg 02/07/2003", value: DOB, setter: setDOB },
  ];

  const guardianDetails = [
    { title: "Guardian Name", isRequired: true, placeholder: "Father/Mother etc", value: guardian, setter: setGuardian },
    {
      title: "Guardian Mobile",
      isRequired: true,
      placeholder: "Parent Contact No",
      value: phone,
      setter: setPhone,
      type: "tel",
      prefix: "+91",
    },
    { title: "Whatsapp (Optional)", placeholder: "Whatsapp no", value: landline, setter: setLandline, type: "tel" },
  ];

  const boardingDetails = [
    { title: "Full Address", isRequired: true, placeholder: "Boarding Point Address", value: address, setter: setAddress },
    { title: "School", isRequired: true, page: "/school/add", options: schoolNames, value: school?.name, setter: setSchoolID, type: "dropdown" },
    { title: "Route", isRequired: true, options: routeNames, type: "number", value: route?.name, setter: setRouteID, type: "dropdown" },
  ];
  const feeDetails = [
    { title: "Joining Date", type: "date", placeholder: "eg 02/07/2003", value: joiningDate, setter: setJoiningDate },
    { title: "Due Date", type: "date", placeholder: "eg 02/07/2003", value: dueDate, setter: setDueDate },
    { title: "Fee Amount", placeholder: "Fee for Selected Duration", type: "number", value: amount, setter: setAmount, prefix: "₹" },
    { title: "Deposit", placeholder: "Enter the Deposited", type: "number", value: deposit, setter: setDeposit, prefix: "₹" },
    { title: "Remaining", type: "fix", placeholder: "Remaining", value: remainingAmount, setter: setRemainingAmount, prefix: "₹" },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Add {isStudent ? "Student" : "Teacher"}</div>
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
        <div className="layout-sub-title">{isStudent ? "Student" : "Teacher"} Details</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          {!isStudent ? (
            <TextField type={"tel"} title={"Mobile"} placeholder={"Contact No"} value={phone} setter={setPhone} prefix={"+91"} isRequired={true} />
          ) : null}
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
          {!isStudent ? <TextField type={"tel"} title={"Whatsapp"} placeholder={"Landline no"} value={landline} setter={setLandline} /> : null}
          {isStudent ? <TextField type={"number"} title={"Class"} placeholder={"Class"} value={cls} setter={setCls} /> : null}
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
              <DropDown
                key={i}
                page={item.page}
                title={item.title}
                options={item.options}
                value={item.value}
                setter={item.setter}
                isRequired={item.isRequired}
              />
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
        <SaveButton
          collection={"passenger"}
          reset={setterArray}
          data={{
            name,
            phone,
            photo,
            DOB,
            whatsApp: landline,
            route: route.id,
            school: school.id,
            location: {
              type: "Point",
              coordinates: [0, 0],
              address,
            },
            amount,
            deposit,
            remainingAmount,
            isStudent,
            cls,
            joiningDate,
            dueDate,
            guardian: {
              name: guardian,
            },
          }}
        />
      </div>
    </div>
  );
}

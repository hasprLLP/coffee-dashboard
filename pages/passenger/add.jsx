//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import FilePicker from "@/components/filepicker";
import SaveButton from "@/components/saveButton";
import { Switch } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [name, setName] = useState();
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
  const [discount, setDiscount] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState();
  const [cls, setCls] = useState();
  const [passengerID, setPassengerID] = useState();
  const [package_, setPackage] = useState({});
  const [packages, setPackages] = useState([]);
  const [packageNames, setPackageNames] = useState([]);

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
  const getPackages = useCallback(async () => {
    try {
      const response = await axios.get(`package`);
      console.log(response.data.data);
      setPackages(response.data.data);
      const tempPackageNames = [];
      response.data.data.map((bus) => {
        tempPackageNames.push(bus.name);
      });
      setPackageNames(tempPackageNames);
    } catch (error) {
      console.log("Error while fetching Packages: ", error);
    }
  }, []);
  const setPackageID = (packageName) => {
    const packageObj = packages?.find((_package) => _package?.name === packageName);
    setPackage(packageObj);
  };
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

  const setSchoolID = async (schoolName) => {
    try {
      const schoolObj = schools?.find((school) => school?.name === schoolName);
      setSchool(schoolObj);
      const response = await axios.get(`route${schoolObj ? `?school=${schoolObj?.id}` : ""}`);
      const res = await axios.get(`misc/generate_passenger_id/${schoolObj.id}`);
      setPassengerID(res.data.data);
      setRoutes(response.data.data);
      const tempRoutesName = [];
      response.data.data.map((route) => {
        tempRoutesName.push(route.name);
      });
      setRouteNames(tempRoutesName);
    } catch (error) {
      console.log("error", error);
      setPassengerID("");
      setRoutes([]);
    }
  };
  const setRouteID = (routeName) => {
    const routeObj = routes?.find((route) => route?.name === routeName);
    setRoute(routeObj);
  };

  useEffect(() => {
    getSchools();
    getPackages();
  }, []);

  useEffect(() => {
    setRemainingAmount(amount - deposit);
  }, [amount, deposit]);

  const classesList = [
    "Pre-School",
    "Nursery",
    "LKG",
    "UKG",
    "Class I (1)",
    "Class II (2)",
    "Class III (3)",
    "Class IV (4)",
    "Class V (5)",
    "Class VI (6)",
    "Class VII (7)",
    "Class VIII (8)",
    "Class IX (9)",
    "Class X (10)",
    "Class XI (11)",
    "Class XII (12)",
  ];

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
    {
      title: "School",
      isRequired: true,
      page: "/school/add",
      options: schoolNames,
      value: school?.name,
      setter: setSchoolID,
      type: "dropdown",
    },
    { title: "Route", isRequired: true, options: routeNames, type: "number", value: route?.name, setter: setRouteID, type: "dropdown" },
  ];
  const feeDetails = [
    { title: "Select Package", isRequired: true, options: packageNames, value: package_?.name, setter: setPackageID, type: "dropdown" },
    { title: "Joining Date", type: "date", placeholder: "eg 02/07/2003", value: joiningDate, setter: setJoiningDate },
    { title: "Due Date", type: "date", placeholder: "eg 02/07/2003", value: dueDate, setter: setDueDate },
    { title: "Fee Amount", placeholder: "Fee for Selected Duration", type: "number", value: amount, setter: setAmount, prefix: "₹" },
    { title: "Discount", placeholder: "Discount on Fee", type: "number", value: discount, setter: setDiscount, prefix: "₹" },
    { title: "Total Amount", placeholder: "Total Amount", type: "fix", value: parseInt(amount) + parseInt(discount), prefix: "₹" },
    { title: "Deposit", placeholder: "Enter the Deposited", type: "number", value: deposit, setter: setDeposit, prefix: "₹" },
    { title: "Remaining", type: "fix", placeholder: "Remaining", value: remainingAmount, setter: setRemainingAmount, prefix: "₹" },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Add {isStudent ? "Student" : "Teacher"}</div>
        <div className="layout-sub-title">Passenger ID - {passengerID}</div>
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
        <div className="layout-sub-title">{isStudent ? "Student" : "Teacher"} Details</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          {!isStudent ? (
            <TextField type={"tel"} title={"Mobile"} placeholder={"Contact No"} value={phone} setter={setPhone} prefix={"+91"} isRequired={true} />
          ) : null}
          {basicFields.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} onChange={item.onChange} />
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
          {isStudent ? <DropDown title={"Class"} options={classesList} value={cls} setter={setCls} /> : null}
        </div>
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
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} onChange={item.onChange} />
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
            phone: `+91${phone}`,
            photo,
            DOB,
            whatsApp: landline,
            route: route?.id,
            passengerID,
            school: school?.id,
            location: {
              type: "Point",
              coordinates: [0, 0],
              address,
            },
            amount,
            deposit,
            remainingAmount,
            discount,
            isStudent,
            cls,
            joiningDate,
            dueDate,
            feePackage: package_?.id,
            guardian: {
              name: guardian,
            },
          }}
        />
      </div>
    </div>
  );
}

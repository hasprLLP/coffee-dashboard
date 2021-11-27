//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import UpdateButton from "@/components/updateButton";
import DeleteButton from "@/components/deleteButton";
import FilePicker from "@/components/filepicker";
import GoBack from "@/helpers/goback";
import { useState } from "react";
import { useRouter } from "next/router";

//& Create & Export Driver [#FUNCTION#]
export default function EditBus() {
  const router = useRouter();
  const { id } = router.query;
  // const data = JSON.parse(router.query.data);

  const [name, setName] = useState("Pintu Raj");
  const [dob, setDob] = useState("02/07/1998");
  const [join, setJoin] = useState("21/10/2021");
  const [guardian, setGuardian] = useState("Anju Raj");
  const [phone, setPhone] = useState("7887458565");
  const [phone2, setPhone2] = useState("07582-262021");
  const [address, setAddress] = useState("MIG 170, Gaur Nagar, Makronia, Sagar");
  const [boarding, setBoarding] = useState("MIG 170, Gaur Nagar, Makronia, Sagar");
  const [classs, setClasss] = useState("11");
  const [section, setSection] = useState("A");
  const [school, setSchool] = useState("DMA");
  const [bus, setBus] = useState("Bus Some");
  const [route, setRoute] = useState("Route Some");
  const [fee, setFee] = useState("6520");
  const [photo, setPhoto] = useState("");

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: "Student Name", placeholder: "Enter Passenger name", value: name, setter: setName },
    { title: "Date of Birth", placeholder: "eg 02/07/2003", value: dob, setter: setDob },
    { title: "Joining Date", placeholder: "eg 21/09/2021", value: join, setter: setJoin },
    { title: "Guardian Name", placeholder: "Father/Mother etc", value: guardian, setter: setGuardian },
    { title: "Guardian Mobile", placeholder: "Parent Contact No", value: phone, setter: setPhone, type: "tel", prefix: "+91" },
    { title: "Guardian Landline (Optional)", placeholder: "Guardian Landline no", value: phone2, setter: setPhone2, type: "tel" },
    { title: "Guardian Address", placeholder: "Full Address", value: address, setter: setAddress },
    { title: "Boarding Point", placeholder: "Bus Boarding Point", value: boarding, setter: setBoarding },
    { title: "Student Class", placeholder: "Current Standard", value: classs, setter: setClasss },
    { title: "Student Section", placeholder: "Section if any", value: section, setter: setSection },
    { title: "School", options: ["School Some", "School More"], value: school, setter: setSchool, type: "dropdown" },
    { title: "Bus", options: ["Bus Some", "Bus More"], value: bus, setter: setBus, type: "dropdown" },
    { title: "Route", options: ["Route Some", "Route More"], type: "number", value: route, setter: setRoute, type: "dropdown" },
    { title: "Monthly Fee", placeholder: "Student Fee Monthly", type: "number", value: fee, setter: setFee, prefix: "₹" },
    { title: "Upload Student Photo", value: photo, setter: setPhoto, type: "upload" },
  ];

  // FIXME:className 'driver', 'driver-form' & 'driver-title' are same for most of the pages, make something like className - 'title' , 'form' & 'container'
  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="driver">
        <div className="driver-title">
        <GoBack />
          Modify Student Details
        </div>
        <div className="driver-form" style={{ justifyContent: "flex-start" }}>
          {fields.map((item, i) => {
            return item.type === "dropdown" ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === "upload" ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} prefix={item.prefix} />
            );
          })}
        </div>
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

//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import Notification from "@/components/notification";
import { Button } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

//& Create & Export Driver [#FUNCTION#]
export default function Notifications() {
  const [target, setTarget] = useState();
  const [schoolList, setSchoolList] = useState([]);

  const getSchools = async () => {
    try {
      const response = await axios.get(`school/`);
      const tempSchoolNames = [];
      response.data.data.map((school) => {
        tempSchoolNames.push({ id: school.id, name: school.name });
      });
      setSchoolList(tempSchoolNames);
    } catch (error) {
      console.log("error", error);
    }
  };

  //@ Get Schools Full List on Page Load
  const got = useRef(false); //` Initial False
  useEffect(() => {
    if (!got.current) {
      getSchools(); //@ Get Schools List
    }
    got.current = true; //` Set To True After Getting Data
  }, []);

  const sendAlert = () => {
    try {
      alert("notificaltons");
    } catch (error) {
      console.log(error);
    }
  };

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Notifications Panel</div>
        <div className="layout-sub-title">Choose Target Audience for Notification</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          <DropDown
            title={"Target"}
            options={[{ id: 0, name: "All Students" }, { id: 1, name: "Pending Dues" }, ...schoolList]}
            value={target}
            setter={setTarget}
          />
        </div>
        <div className="button">
          <Button onClick={sendAlert} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Sending">
            Send Alert
          </Button>
          <Notification type={""} />
        </div>
      </div>
    </div>
  );
}

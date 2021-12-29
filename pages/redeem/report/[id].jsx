/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import GoBack from "@/helpers/goback";
import DropDown from "@/components/dropdown";
import TextField from "@/components/input";
import Notification from "@/components/notification";
import { Button } from "@chakra-ui/react";
import axios from "axios";

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  //$ Path and Page Data
  const router = useRouter();
  const { id } = router.query;

  //$ State to Store API Data
  const [data, setData] = useState();

  //$ Function to Get Data from API using api route and set to State
  const getStudentData = async () => {
    try {
      const response = await axios.get(`passenger/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //@ Get Student Full Data on Page Load
  const got = useRef(false); //` Initial False
  useEffect(() => {
    if (router?.query?.data) {
      if (!got.current) {
        getStudentData(`passenger/${id}`, setData); //@ Get Student List
      }
      got.current = true; //` Set To True After Getting Data
    }
  }, [router.query.data, data]);

  //$ Get Routes List and Update Route
  const [route, setRoute] = useState();
  const [routeList, setRouteList] = useState([]);
  const routeField = { title: "Route Name", options: routeList, value: route?.name, setter: setRoute, type: "dropdown" };
  const [routeLoading, setRouteLoading] = useState(false);

  //@ Fetch Routes API Function
  const getRoutes = async () => {
    try {
      const response = await axios.get(`route${data?.school ? `?school=${data?.school?.id}` : ""}`);
      let tempRoutesName = [];
      response.data.data.map((route) => {
        tempRoutesName.push(route.name);
      });
      setRouteList(tempRoutesName);
    } catch (error) {
      console.log("error", error);
    }
  };
  //@ Get Route according to Selected School
  useEffect(() => {
    getRoutes();
  }, [data?.school]);

  //$` Function To Update Route
  const updateRoute = () => {
    alert("Update");
  };

  //$ Due date
  const [dueDateChange, setDueDateChange] = useState();

  //$ Package
  const [pack, setPackage] = useState();

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Details
        </div>
        {/* //$ Students Info Left Row */}
        <div className="layout-sub-title" style={{ color: "black", width: "40%" }}>
          BUS OWNER INFO
        </div>
        <div className="layout-row" style={{ alignItems: "flex-start" }}>
          <div className="layout-row-item">
            <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
              {/* //$ Student Info */}
              <div style={{ width: "100%" }}>
                <div style={{ width: "12vw", height: "12vw", marginTop: "1vw", marginBottom: "2vw", resizeMode: "cover" }}>
                  <img
                    alt="No Photo Available"
                    src={data?.photo}
                    style={{ width: "12vw", height: "12vw", resizeMode: "cover", borderRadius: "100%" }}
                  />
                </div>
              </div>
              <TextField type={"show"} title={"Student Name"} placeholder={"No Name"} value={data?.name} />
              <TextField type={"show"} title={"Student ID"} placeholder={"No ID"} value={data?.studentID} />
              <TextField type={"show"} title={"Student Address"} placeholder={"No Address"} value={data?.location?.address} />
              <TextField type={"show"} title={"Student DOB"} placeholder={"No DOB"} value={data?.DOB.substring(0, 10)} />
            </div>
            {/* //$ School Details */}
            <div className="layout-sub-title">School Details</div>
            <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
              <TextField type={"show"} title={"School Name"} placeholder={"No School"} value={data?.school?.name} />
            </div>
            {/* //$ Package */}
            <div className="layout-sub-title">Package Information</div>
            <div className="layout-form" style={{ justifyContent: "flex-start" }}>
              <TextField type={"show"} title={"Package"} placeholder={"No Package"} value={"0-4KM"} />
              <TextField type={"show"} title={"Duration"} placeholder={"No Duration"} value={"3 Months"} />
            </div>
            {/* //$ Transactions */}
            <div className="layout-sub-title">Transaction Details</div>
            <div className="layout-form" style={{ justifyContent: "flex-start" }}>
              <TextField type={"show"} title={"Total Amount"} placeholder={"No Amount"} value={"5000"} />
              <TextField type={"show"} title={"Amount Paid"} placeholder={"No Paid"} value={"3000"} />
              <TextField type={"show"} title={"Amount Remaining"} placeholder={"No Amount"} value={"2000"} />
              <TextField type={"fix"} title={"Last Transaction"} placeholder={"Transactionn"} value={data?.lastTransaction?.date?.substring(0, 10)} />
              <TextField type={"fix"} title={"Remaining Amount"} placeholder={"Amount"} value={data?.lastTransaction?.remainingAmount} />
              <TextField type={"fix"} title={"Total Amount"} placeholder={"Amount"} value={data?.lastTransaction?.amount} />
            </div>
          </div>
          {/* //$ Notifications Right Row */}
          <div className="layout-row-item">
            <div className="layout-sub-title" style={{ color: "black" }}>
              NOTIFICATIONS PANEL
            </div>
            {/* //$ Students Verified  */}
            <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
              <div className="layout-sub-title" style={{ color: "red", width: "100%" }}>
                {data?.isVerified ? "Student Verifed and Route is Assigned" : "Student Not Verified ! Assign a Route"}
              </div>
              <DropDown title={routeField.title} options={routeField.options} value={routeField.value} setter={routeField.setter} />
              <div className="button">
                <Button onClick={updateRoute} colorScheme="teal" size="md" isFullWidth isLoading={routeLoading} loadingText="Submitting">
                  Assign
                </Button>
                <Notification type={""} />
              </div>
            </div>
            {/* //$ Due Date Change */}
            <div className="layout-sub-title">Payment/Package Info</div>
            <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
              <div className="layout-sub-title" style={{ color: "red", width: "100%" }}>
                {data?.dueDate ? `Due date is ${data?.dueDate.substring(0, 10)}` : "No Dues"}
              </div>
              <TextField type={"date"} title={"Extend Due Date"} value={dueDateChange} setter={setDueDateChange} />
              <div className="button">
                <Button onClick={updateRoute} colorScheme="teal" size="md" isFullWidth isLoading={routeLoading} loadingText="Submitting">
                  Extend Date
                </Button>
                <Notification type={""} />
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}

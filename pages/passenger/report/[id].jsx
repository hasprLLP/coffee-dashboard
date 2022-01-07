/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import GoBack from "@/helpers/goback";
import DropDown from "@/components/dropdown";
import TextField from "@/components/input";
import Notification from "@/components/notification";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import BasicModal from "@/components/basicModal";

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  //$ Path and Page Data
  const router = useRouter();
  const { id } = router.query;

  //$ State to Store API Data
  const [data, setData] = useState();

  //$ Page State
  const [package_, setPackage] = useState({});
  const [packages, setPackages] = useState([]);
  const [packageNames, setPackageNames] = useState([]);
  const [route, setRoute] = useState({});
  const [routes, setRoutes] = useState([]);
  const [routeNames, setRouteNames] = useState([]);

  //$ API request
  //@ Function to Get Data from API using api route and set to State
  const getStudentData = useCallback(async () => {
    try {
      const response = await axios.get(`passenger/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  //@ Fetch Packages
  const getPackages = useCallback(async () => {
    try {
      const response = await axios.get(`package`);
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

  //@ Fetch Routes <with school>
  const getRoutes = useCallback(async () => {
    try {
      const response = await axios.get(`route?school=${data?.school?.id}`);
      console.log(response?.data?.data);
      setRoutes(response?.data?.data);
      let tempRoutesName = [];
      response?.data?.data.map((route) => {
        tempRoutesName.push(route.name);
      });
      setRouteNames(tempRoutesName);
    } catch (error) {
      console.log("Error while fetching Routes", error);
    }
  }, [data?.school?.id]);

  //$ Setters
  const setPackageID = (packageName) => {
    const packageObj = packages?.find(
      (_package) => _package?.name === packageName
    );
    setPackage(packageObj);
  };

  const setRouteID = (routeName) => {
    const routeObj = routes?.find((route) => route?.name === routeName);
    setRoute(routeObj);
  };

  const routeField = {
    title: "",
    options: routeNames,
    value: route?.name,
    setter: setRouteID,
    type: "dropdown",
  };

  const feePackageField = {
    title: "",
    options: packageNames,
    value: package_?.name,
    setter: setPackageID,
    type: "dropdown",
  };

  const [routeLoading, setRouteLoading] = useState(false);
  const [unsetRouteLoading, setUnsetRouteLoading] = useState(false);
  const [packageLoading, setPackageLoading] = useState(false);
  const [unsetPackageLoading, setUnsetPackageLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [extendDueDateLoading, setExtendDueDateLoading] = useState(false);

  const assignRoute = async () => {
    setRouteLoading(true);
    try {
      const res = await axios.post(
        `passenger/assign_route/${data.id}?route=${route.id}`
      );
      setData((data) => ({ ...data, route: res.data.data }));

      setRouteLoading(false);
    } catch (error) {
      console.log(error);
      setRouteLoading(false);
    }
  };

  const UnassignRoute = async () => {
    setUnsetRouteLoading(true);
    try {
      await axios.delete(`passenger/assign_route/${data.id}`);
      setData((data) => ({ ...data, route: null }));

      setUnsetRouteLoading(false);
    } catch (error) {
      console.log(error);
      setUnsetRouteLoading(false);
    }
  };

  const assignPackage = async () => {
    setPackageLoading(true);
    try {
      const res = await axios.post(
        `passenger/assign_fee_package/${data.id}?fee_package=${package_.id}`
      );
      setData((data) => ({ ...data, feePackage: res.data.data }));

      setPackageLoading(false);
    } catch (error) {
      console.log(error);
      setPackageLoading(false);
    }
  };

  const UnassignPackage = async () => {
    setUnsetPackageLoading(true);
    try {
      await axios.delete(`passenger/assign_fee_package/${data.id}`);
      setData((data) => ({ ...data, feePackage: null }));

      setUnsetPackageLoading(false);
    } catch (error) {
      console.log(error);
      setUnsetPackageLoading(false);
    }
  };

  const verifyPassenger = async () => {
    setVerifyLoading(true);
    try {
      const res = await axios.post(`passenger/verify/${data.id}`);

      setData((data) => ({ ...data, isVerified: res.data.data }));

      setVerifyLoading(false);
    } catch (error) {
      console.log(error);
      setVerifyLoading(false);
    }
  };

  const extendDueDate = async () => {
    setExtendDueDateLoading(true);
    if (!dueDateChange) {
      alert("Please Enter Due Date");
    }
    try {
      const res = await axios.post(
        `passenger/extend_due_date/${data.id}?due_date=${dueDateChange}`
      );

      setData((data) => ({ ...data, dueDate: res.data.data }));

      setExtendDueDateLoading(false);
    } catch (error) {
      console.log(error);
      setExtendDueDateLoading(false);
    }
  };

  //$ Due date
  const [dueDateChange, setDueDateChange] = useState();

  useEffect(() => {
    getPackages();
    getStudentData();
    getRoutes();
  }, [getPackages, getStudentData, getRoutes]);

  //$ Modal
  const onOpenRoute = useRef();
  const onOpenPackage = useRef();
  const onOpenVerify = useRef();

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Details
        </div>
        {/* //$ Students Info Left Row */}
        <div
          className="layout-sub-title"
          style={{ color: "black", width: "40%" }}
        >
          STUDENT INFO
        </div>
        <div className="layout-row" style={{ alignItems: "flex-start" }}>
          <div className="layout-row-item" style={{ flex: 1.25 }}>
            <div
              className="layout-form"
              style={{ justifyContent: "flex-start", alignItems: "flex-end" }}
            >
              {/* //$ Student Info */}
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    width: "12vw",
                    height: "12vw",
                    marginTop: "1vw",
                    marginBottom: "2vw",
                    resizeMode: "cover",
                  }}
                >
                  <img
                    alt="No Photo Available"
                    src={data?.photo}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "contain",
                      borderRadius: "100%",
                    }}
                  />
                </div>
              </div>
              <TextField
                type={"show"}
                title={"Student Name"}
                placeholder={"No Name"}
                value={data?.name}
              />
              <TextField
                type={"show"}
                title={"Student ID"}
                placeholder={"No ID"}
                value={data?.passengerID}
              />
              <TextField
                type={"show"}
                title={"Student Address"}
                placeholder={"No Address"}
                value={data?.location?.address}
              />
              <TextField
                type={"show"}
                title={"Student DOB"}
                placeholder={"No DOB"}
                value={data?.DOB?.substring(0, 10)}
              />
            </div>
            {/* //$ School Details */}
            <div className="layout-sub-title">School Details</div>
            <div
              className="layout-form"
              style={{ justifyContent: "flex-start", alignItems: "flex-end" }}
            >
              <TextField
                type={"show"}
                title={"School Name"}
                placeholder={"No School"}
                value={data?.school?.name}
              />
            </div>
            {/* //$ Package */}
            <div className="layout-sub-title">Package Information</div>
            <div
              className="layout-form"
              style={{ justifyContent: "flex-start" }}
            >
              <TextField
                type={"show"}
                title={"Package"}
                placeholder={"No Package"}
                value={"0-4KM"}
              />
              <TextField
                type={"show"}
                title={"Duration"}
                placeholder={"No Duration"}
                value={"3 Months"}
              />
            </div>epo
          </div>
          {/* //$ Notifications Right Row */}
          <div className="layout-row-item">
            <div className="layout-sub-title" style={{ color: "black" }}>
              NOTIFICATIONS PANEL
            </div>
            {/* //$ Students Verified Route  */}
            <div className="layout-sub-title">
              Assign/Change Route{" "}
              <span style={{ color: "red" }}>{!data?.route ? "⚠️" : ""}</span>
            </div>

            <div
              className="layout-form"
              style={{ justifyContent: "flex-start", alignItems: "flex-end" }}
            >
              <div
                className="layout-sub-title"
                style={{ color: "teal", width: "100%" }}
              >
                Route Assigned :{" "}
                {data?.route?.name ? data?.route?.name : "Nothing"}
              </div>

              <DropDown
                title={routeField.title}
                options={routeField.options}
                value={routeField.value}
                setter={routeField.setter}
              />
              <div
                className="button"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  onClick={assignRoute}
                  colorScheme="teal"
                  size="md"
                  isLoading={routeLoading}
                  loadingText=""
                >
                  ✔️
                </Button>
                {data?.route ? (
                  <Button
                    onClick={() => {
                      onOpenRoute.current.showAlert();
                    }}
                    colorScheme="red"
                    size="md"
                    isLoading={unsetRouteLoading}
                    loadingText=""
                  >
                    ❌
                  </Button>
                ) : null}
                <Notification type={""} />
              </div>
            </div>
            {/* //$ Due Date Change */}
            <div className="layout-sub-title">Payment Info</div>
            <div
              className="layout-form"
              style={{ justifyContent: "flex-start", alignItems: "flex-end" }}
            >
              <div
                className="layout-sub-title"
                style={{ color: "red", width: "100%" }}
              >
                {data?.dueDate
                  ? `Due date is ${data?.payDate.substring(0, 10)}`
                  : "No Dues"}
              </div>
              <TextField
                type={"date"}
                title={"Extend Due Date"}
                value={dueDateChange}
                setter={setDueDateChange}
              />
              <div className="button">
                <Button
                  onClick={extendDueDate}
                  colorScheme="teal"
                  size="md"
                  isFullWidth
                  isLoading={extendDueDateLoading}
                  loadingText="Changing Due Date"
                >
                  Extend Date
                </Button>
                <Notification type={""} />
              </div>
            </div>
            {/* //$ Package Assign */}
            <div className="layout-sub-title">
              Assign/Change Package{" "}
              <span style={{ color: "red" }}>
                {!data?.feePackage ? "⚠️" : ""}
              </span>
            </div>
            <div
              className="layout-form"
              style={{ justifyContent: "flex-start", alignItems: "flex-end" }}
            >
              <div
                className="layout-sub-title"
                style={{ color: "teal", width: "100%" }}
              >
                Fee Package Assigned :{" "}
                {data?.feePackage?.name ? data?.feePackage?.name : "Nothing"}
              </div>
              <DropDown
                title={feePackageField.title}
                options={feePackageField.options}
                value={feePackageField.value}
                setter={feePackageField.setter}
              />
              <div
                className="button"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  onClick={assignPackage}
                  colorScheme="teal"
                  size="md"
                  isLoading={packageLoading}
                  loadingText="Submitting"
                >
                  ✔️
                </Button>
                {data?.feePackage ? (
                  <Button
                    onClick={() => {
                      onOpenPackage.current.showAlert();
                    }}
                    colorScheme="red"
                    size="md"
                    isLoading={unsetPackageLoading}
                    loadingText=""
                  >
                    ❌
                  </Button>
                ) : null}
                <Notification type={""} />
              </div>
            </div>
            {/* //$Verify Passenger */}
            <div className="layout-sub-title">
              Verify/Unverify Passenger
              <span style={{ color: "red" }}>
                {!data?.feePackage ? "⚠️" : ""}
              </span>
            </div>
            <div
              className="layout-form"
              style={{ justifyContent: "flex-start", alignItems: "flex-end" }}
            >
              <div
                className="button"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {data?.isVerified ? (
                  <Button
                    onClick={() => {
                      onOpenVerify.current.showAlert();
                    }}
                    colorScheme="red"
                    size="md"
                    isLoading={verifyLoading}
                    loadingText="Verifing"
                    isFullWidth
                  >
                    Unverify
                  </Button>
                ) : (
                  <Button
                    onClick={verifyPassenger}
                    colorScheme="teal"
                    size="md"
                    isFullWidth
                    isLoading={verifyLoading}
                    loadingText="Unverifing"
                  >
                    Verify
                  </Button>
                )}
                <Notification type={""} />
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>

      <BasicModal
        Head="Warning Removing Route! ⚠️"
        Message="Passenger no longer will be able to use Application."
        ref={onOpenRoute}
        fun={UnassignRoute}
        type="warning"
      />
      <BasicModal
        Head="Warning Removing Fee Package ! ⚠️"
        Message="Passenger no longer will be able to use Application."
        ref={onOpenPackage}
        fun={UnassignPackage}
        type="warning"
      />
      <BasicModal
        Head="Warning Passenger Unverifying  ! ⚠️"
        Message="Passenger no longer will be able to use Application."
        ref={onOpenVerify}
        fun={verifyPassenger}
        type="warning"
      />
    </div>
  );
}

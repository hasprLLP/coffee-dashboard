import { useRouter } from "next/router";
import GoBack from "@/helpers/goback";
import GoogleMapReact from "google-map-react";
import { JSONToHTMLTable } from "@kevincobain2000/json-to-html-table";
import { useState, useEffect } from "react";
import DropDown from "@/components/dropdown";
import TextField from "@/components/input";
import Notification from "@/components/notification";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import axios from "axios";

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();
  const getPassenger = async () => {
    try {
      const response = await axios.get(`passenger/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router?.query?.data) {
      getPassenger();
    }
  }, [router.query.data, data]);

  //$ Update Route
  const [route, setRoute] = useState();
  const [routeList, setRouteList] = useState([]);
  const routeField = { title: "Route Name", options: routeList, value: route?.name, setter: setRoute, type: "dropdown" };
  const [routeLoading, setRouteLoading] = useState(false);

  const getRoutes = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}route${data?.school ? `?school=${data?.school?.id}` : ""}`);
      let tempRoutesName = [];
      response.data.data.map((route) => {
        tempRoutesName.push(route.name);
      });
      setRouteList(tempRoutesName);
    } catch (error) {
      console.log("error", error);
    }
  };
  const updateRoute = () => {
    alert("Update");
  };

  useEffect(() => {
    getRoutes();
  }, [data?.school]);

  //$ Due date
  const [dueDateChange, setDueDateChange] = useState();
  const dueDateField = {
    title: "Current Due Date",
    type: "fix",
    placeholder: "eg 02/07/2003",
    value: data?.dueDate.substring(0, 10),
    setter: setDueDateChange,
  };
  const extendDateField = {
    title: "Extend Due Date",
    type: "date",
    placeholder: "eg 02/07/2003",
    value: dueDateChange || data?.dueDate.substring(0, 10),
    setter: setDueDateChange,
  };

  //$ Package
  const [pack, setPackage] = useState();
  const packageNameField = {
    title: "Current Fee Package",
    type: "fix",
    placeholder: "Package Name",
    value: data?.route?.package || pack,
    setter: setPackage,
  };

  const packageDurationField = {
    title: "Duration (in Months)",
    type: "fix",
    placeholder: "Package Duration",
    value: "3 Months",
    setter: setPackage,
  };

  const packageAmountField = {
    title: "Package Amount",
    type: "fix",
    placeholder: "Package Amount",
    value: "₹5600",
    setter: setPackage,
  };

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Details
        </div>
        {/* //$ Student Info */}
        <div className="layout-sub-title">Student Basic Info</div>
        <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
          {data && (
            <div className="layout-sub-title" style={{ color: "black" }}>
              {data?.name} - {data?.studentID} (data?.isVerified ? Verified : Not Verified)
            </div>
          )}
        </div>
        {/* //$ Route Changes */}
        <div className="layout-sub-title">Assign / Update Route</div>
        <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
          <DropDown title={routeField.title} options={routeField.options} value={routeField.value} setter={routeField.setter} />
          <div className="button">
            <Button onClick={updateRoute} colorScheme="teal" size="md" isFullWidth isLoading={routeLoading} loadingText="Submitting">
              Save
            </Button>
            <Notification type={"success"} />
          </div>
        </div>
        {/* //$ Due Date Chnages */}
        <div className="layout-sub-title">Extend Fees Due Date</div>
        <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
          <TextField
            type={dueDateField.type}
            title={dueDateField.title}
            placeholder={dueDateField.placeholder}
            value={dueDateField.value}
            setter={dueDateField.setter}
          />
          <TextField
            type={extendDateField.type}
            title={extendDateField.title}
            placeholder={extendDateField.placeholder}
            value={extendDateField.value}
            setter={extendDateField.setter}
          />
          <div className="button">
            <Button onClick={updateRoute} colorScheme="teal" size="md" isFullWidth isLoading={routeLoading} loadingText="Submitting">
              Extend Date
            </Button>
            <Notification type={"success"} />
          </div>
        </div>
        {/* //$ Package */}
        <div className="layout-sub-title">Package Information</div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          <TextField
            type={packageNameField.type}
            title={packageNameField.title}
            placeholder={packageNameField.placeholder}
            value={packageNameField.value}
            setter={packageNameField.setter}
          />
          <TextField
            type={packageDurationField.type}
            title={packageDurationField.title}
            placeholder={packageDurationField.placeholder}
            value={packageDurationField.value}
            setter={packageDurationField.setter}
          />
          <TextField
            type={packageAmountField.type}
            title={packageAmountField.title}
            placeholder={packageAmountField.placeholder}
            value={packageAmountField.value}
            setter={packageAmountField.setter}
          />
        </div>
        {/* //$ Boarding Point */}
        <div className="layout-sub-title">Student Boarding Point</div>
        <div className="layout-sub-title" style={{ color: "black" }}>
          {data?.location?.address}
        </div>
        <div className="layout-form" style={{ height: "75%", width: "95%", borderRadius: "var(--chakra-radii-md)", overflow: "hidden" }}>
          {data?.location?.coordinates && (
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.MAP_KEY }}
              defaultCenter={{
                lat: data?.location?.coordinates[0],
                lng: data?.location?.coordinates[1],
              }}
              defaultZoom={18}
              yesIWantToUseGoogleMapApiInternals={true}
            >
              <div className="drawer-item-icon" style={{ width: "2.5vw", height: "2.5vw" }}>
                <Image alt="owner" src={`/static/svg/bus-on.svg`} layout="fill" size="2.5vw" objectFit="contain" />
              </div>
            </GoogleMapReact>
          )}
        </div>
        {/* //$ Leaves / Holidays */}
        <div className="layout-sub-title">Student Attendance and Leaves</div>
        <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
          <div className="layout-sub-title" style={{ color: "black" }}>
            The Student was Absent on {data?.location?.address}
          </div>
          <div className="button">
            <Button onClick={updateRoute} colorScheme="teal" size="md" isFullWidth isLoading={routeLoading} loadingText="Submitting">
              Extend Date
            </Button>
            <Notification type={"success"} />
          </div>
        </div>
                {/* //$ Activate Deactvate */}
                <div className="layout-sub-title">Student Account Settings</div>
        <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
          <div className="layout-sub-title" style={{ color: "black" }}>
            Activate Student
          </div>
          <div className="button">
            <Button onClick={updateRoute} colorScheme="teal" size="md" isFullWidth isLoading={routeLoading} loadingText="Submitting">
             Activate
            </Button>
            <Notification type={"success"} />
          </div>
          <div className="layout-sub-title" style={{ color: "black" }}>
            Deactivate Student
          </div>
          <div className="button">
            <Button onClick={updateRoute} colorScheme="teal" size="md" isFullWidth isLoading={routeLoading} loadingText="Submitting">
             Deactivate
            </Button>
            <Notification type={"success"} />
          </div>
        </div>
        <div className="layout-sub-title">Advanced Information</div>
        <div style={{ textTransform: 'capitalize' }} className='table-report'>
          {data && <JSONToHTMLTable data={data} />}
        </div>

        <br />
      </div>
    </div>
  );
}

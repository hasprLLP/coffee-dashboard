/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import GoBack from "@/helpers/goback";
import DropDown from "@/components/dropdown";
import TextField from "@/components/input";
import useFetch from "@/hooks/useFetch";
import Notification from "@/components/notification";
import GeneralCard from "@/components/generalcard";
import GeneralTable from "@/components/generaltable";
import GeneralMoney from "@/components/generalmoney";
import { Button } from "@chakra-ui/react";
import BasicModal from "@/components/basicModal";
import getMidPoint from "@/utilities/getMidPoint";
import convertAMPM from "@/utilities/convertAMPM";
import GoogleMapReact from "google-map-react";

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  //& PART 1: Path and Page Data
  const router = useRouter();
  const { id } = router.query; //` Doc ID of Bus Owner

  //& PART 2: Panel Sections

  //$ 1: Basic Details
  //@ Data
  const fetchData = useFetch(`route/${id}`); //` Get Owner Details API
  const data = fetchData?.data; //` Response from API

  //@ UI
  function BasicView() {
    return (
      <div className="layout-row-item">
        {/* //$ Bus Owner Title */}
        <div className="layout-sub-title" style={{ color: "black", width: "40%" }}>
          ROUTE INFO
        </div>
        {data && (
          <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
            <TextField type={"show"} title={"Route Name"} placeholder={"No Name"} value={data.name} />
            <TextField type={"show"} title={"Starts From"} placeholder={"No Start Address"} value={data.startsFrom?.address} />
            <TextField type={"show"} title={"School"} placeholder={"No School"} value={data.school?.name} />
          </div>
        )}
      </div>
    );
  }

  //$ 1.5: Time Details

  //@ UI
  function TimingView() {
    return (
      <div className="layout-row-item">
        {/* //$ Bus Owner Title */}
        <div className="layout-sub-title" style={{ color: "black", width: "40%" }}>
          TIMING INFO
        </div>
        {data && (
          <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
            <TextField type={"show"} title={"Route Name"} placeholder={"No Name"} value={convertAMPM(data?.morningDeparture)} />
            <TextField type={"show"} title={"Starts From"} placeholder={"No Start Address"} value={convertAMPM(data?.morningArrival)} />
            <TextField type={"show"} title={"Departure"} placeholder={"No Password"} value={convertAMPM(data?.eveningDeparture)} />
          </div>
        )}
      </div>
    );
  }

  //$ 2: Control Panel Actions
  //@ Data
  const ref1 = useRef(); //` Modal Ref 1
  const ref2 = useRef(); //` Modal Ref 2
  //@ Function 1
  const change1 = () => {
    try {
      alert("Do Something");
    } catch (error) {
      console.log(error);
    }
  };
  //@ Function 2
  const change2 = () => {
    try {
      alert("Do Something");
    } catch (error) {
      console.log(error);
    }
  };
  //@ UI
  function ControlsView() {
    return (
      <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
        <DropDown title={"Change Bus"} options={[]} value={""} setter={null} />
        <div className="button">
          <Button onClick={() => ref1.current.showAlert()} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
            Modify
          </Button>
          <Notification type={""} />
        </div>
        <BasicModal Head="Warning 1!⚠️" Message="Message 1." ref={ref1} fun={change1} type="warning" />
      </div>
    );
  }

  //$ 3: List of Passengers
  //@ Data
  const passengersList = data?.passengers;
  //@ UI
  function StudentsView() {
    return (
      <>
        <div style={{ width: "100%" }}>
          <div className="layout-sub-title" style={{ color: "black", width: "40%", marginBottom: "1vw" }}>
            Passengers under {data?.name}
          </div>
        </div>
        {/* //@ Buses Mapped */}
        <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
          {passengersList?.map((kid, i) => {
            return (
              <GeneralCard key={i} id={kid.id} page={"passenger"} first={kid.name} second={kid.passengerID} third={kid.cls} photo={kid?.photo?.url} />
            );
          })}
        </div>
      </>
    );
  }

  //$ 4: Fee Statistics
  //@ Data
  const [month, setMonth] = useState();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let curMonthNo = new Date().getMonth() + 1;
  let curYearNo = new Date().getYear();
  const currentMonth = monthNames[new Date().getMonth()];

  //@ Stats
  const fetchStats = useFetch(`route/stats/${id}`); //` Get Owner Details API
  const dataStats = fetchStats?.data; //` Response from API
  console.log(dataStats);

  //@ UI
  function FeesView() {
    return (
      <>
        {/* //@ Choose Month */}
        <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
          <DropDown title={false} options={monthNames} value={month || currentMonth} setter={setMonth} />
          <div className="button">
            <Button onClick={() => alert("Change Month")} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
              Change
            </Button>
            <Notification type={""} />
          </div>
        </div>
        {/* //@ Show Money Cards */}
        {data && (
          <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
            <GeneralMoney
              type={"green"}
              title={"Collected Fee"}
              amount={dataStats.collectedMonthlyFeeByPackage}
              line1={dataStats.totalActivePassengers + " Active Passengers"}
              line2={dataStats.paidPassengers + " Passengers Paid Already"}
            />
            <GeneralMoney type={"green"} title={"Cashback"} />
            <GeneralMoney type={"blue"} title={"Unverified"} />
            <GeneralMoney type={"red"} title={"Pending"} />
          </div>
        )}
      </>
    );
  }

  //$ 5: List of Bus
  //@ UI
  function StudentsView() {
    const busCurrent = data?.bus;
    return (
      <>
        <div style={{ width: "100%" }}>
          <div className="layout-sub-title" style={{ color: "black", width: "40%", marginTop: "1vw", marginBottom: "1vw" }}>
            Bus on this Route : {data?.bus?.name}
          </div>
        </div>
        <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
          <GeneralCard
            id={busCurrent?.id}
            photo={busCurrent?.photo}
            page={"bus"}
            first={busCurrent?.name}
            second={busCurrent?.RCNumber}
            third={"Commission : ₹ " + busCurrent?.commission}
          />
          ;
        </div>
      </>
    );
  }

  //$ 7: Previous Transactions
  //@ Data
  const tableData = [
    { id: 0, name: "Transaction", phone: 9874654123, date: "02-01-2022" },
    { id: 0, name: "Transaction", phone: 9874654123, date: "02-01-2022" },
    { id: 0, name: "Transaction", phone: 9874654123, date: "02-01-2022" },
  ];
  //@ Columns
  const tableColumn = [
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Phone", field: "phone" },
    { title: "Date", field: "date" },
  ];

  //$ 8: View Route
  const route = [
    {
      coordinates: [23.86362509727341, 78.80081381534576],
      timestamp: { type: new Date() },
      passenger: {
        location: {
          coordinates: [23.86362509727341, 78.80081381534576],
        },
      },
    },
    {
      coordinates: [23.862864677645935, 78.80082454189913],
      timestamp: { type: new Date() },
    },
    {
      coordinates: [23.862864697615935, 78.80082754179913],
      timestamp: { type: new Date() },
      passenger: {
        location: {
          coordinates: [23.864, 78.8001],
        },
      },
    },
    {
      coordinates: [23.862864677615935, 78.80072454179913],
      timestamp: { type: new Date() },
    },
    {
      coordinates: [23.862869677615935, 78.80092454179913],
      timestamp: { type: new Date() },
    },
    {
      coordinates: [23.864, 78.8001],
      timestamp: { type: new Date() },
    },
  ];


  const routeMapped = route.map((path) => {
    return { lat: path.coordinates[0], lng: path.coordinates[1],passenger: path.passenger };
  });

  //@ Function To Draw Path
  const drawPath = (google) => {
    var flightPath = new google.maps.Polyline({
      path: routeMapped,
      geodesic: true,
      strokeColor: "#38b2ac",
      strokeOpacity: 0.3,
      strokeWeight: 7,
    });

    flightPath.setMap(google.map);
  };

  //@ Get Middle Point of All Students
  const { midLat, midLng } = getMidPoint(routeMapped);

  //@ UI
  function RouteView() {
    return (
      <div
        className="layout-form"
        style={{ height: "75%", width: "95%", borderRadius: "var(--chakra-radii-lg)", overflow: "hidden", marginBottom: "2vw" }}
      >
        {/* //@ Map */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.MAP_KEY, libraries: ["places", "geometry", "drawing", "visualization"] }}
          defaultCenter={{
            lat: midLat || 0,
            lng: midLng || 0,
          }}
          defaultZoom={13}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={drawPath}
        >
          {/* //@ Students on Map */}
          {routeMapped.map((route, i) => {
            return route?.passenger?.location ? (
              <div key={i} lat={route.passenger.location.coordinates[0]} lng={route.passenger.location.coordinates[1]} text="My Marker">
                <img
                  alt="tracking"
                  style={{ width: "2.5vw", height: "100%", objectFit: "contain", transform: "translate(-50%,-90%)" }}
                  src={"/static/svg/tracking.svg"}
                />
              </div>
            ) : null;
          })}
        </GoogleMapReact>
      </div>
    );
  }

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Details
        </div>
        {/* //& 1: Owner Info Left Row */}
        <div className="layout-row" style={{ alignItems: "flex-start" }}>
          <BasicView />
          <TimingView />
          {/* //& 2: Notifications Right Row */}
          <div className="layout-row-item">
            <div className="layout-sub-title" style={{ color: "black" }}>
              CONTROL PANEL
            </div>
            {/* //$ Bus Owner Verified  */}
            <ControlsView />
          </div>
        </div>
        {/* //& 3:  Bus Owner Buses */}
        <div className="layout-form" style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
          <StudentsView />
          {/* //& 4: Fee Statistics */}
          <div style={{ width: "100%", marginTop: "2vw" }}>
            <div className="layout-sub-title" style={{ color: "black", width: "40%" }}>
              Fee Statistics
            </div>
          </div>
          <FeesView />
          {/* //& 5: List of Students */}
          <StudentsView />
        </div>
        {/* //& 8: Route Display */}
        <div style={{ width: "100%", marginTop: "2vw" }}>
          <div className="layout-sub-title" style={{ color: "black", width: "100%", marginBottom: "1vw" }}>
            Route On Map
          </div>
        </div>
        <RouteView />
        <br />
      </div>
    </div>
  );
}

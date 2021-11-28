import DropDown from "@/components/dropdown";
import GoogleMapReact from "google-map-react";
import { useState } from "react";

export default function Locate() {
  const [bus, setBus] = useState("");
  return (
    <div className="home">
      <div className="home-shift">
        <DropDown title={"Select Bus"} options={["D 0 1", "D 0 2", "D  0 3 "]} value={bus} setter={setBus} />
        <div className="layout-form" style={{ height: "75%", width: "95%", borderRadius: "var(--chakra-radii-md)", overflow: "hidden" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCHvfKSXzV5-wKUkV5XvwJwp4n5RHc9lNA" }}
            defaultCenter={{
              lat: 59.95,
              lng: 30.33,
            }}
            defaultZoom={11}
            yesIWantToUseGoogleMapApiInternals={true}
          >
            <div style={{ fontSize: "2vw", color: "white" }}>Apni Bus here</div>
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}

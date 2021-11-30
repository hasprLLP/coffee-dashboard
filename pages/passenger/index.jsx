//& Input Components [#IMPORTS#]
import PhotoCard from "@/components/photoCard";
import { useState, useEffect } from "react";
import server from "src/backend/node/server";
import TextField from "@/components/input";
import Filler from "@/components/filler";
import Fuse from "fuse.js";
import { useRouter } from "next/router";

//& Create & Export Driver [#FUNCTION#]
export default function Passenger() {
  const [student, setStudent] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [passengers, setPassengers] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(`/passenger`);
      setPassengers(data.data);
      setLoading(true);
    };

    fetch();
  }, []);

  //$ States and Hooks [#STATES#]
  const onEdit = (id, data) => {
    router.push({ pathname: `/passenger/edit/${id}`, query: { data: JSON.stringify(data) } });
  };
  const onDetail = (id, data) => {
    router.push({ pathname: `/passenger/report/${id}`, query: { data: JSON.stringify(data) } });
  };

  //& Fuse JS [#FUSE#]
  //$ New Fuse Instance with Settings
  const fuse = new Fuse(passengers, {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: true,
    includeMatches: true,
    findAllMatches: true,
    minMatchCharLength: 0,
    keys: ["name", "guardian.name", "phone", "DOB"],
  });

  const result = student !== "" && fuse.search(student);
  const resultFilter = result && result.map((result) => result.item);
  const searchResultDisplay = resultFilter || passengers;

  //& Return UI [#RETURN#]
  return (
    <div className="home" style={{ backgroundColor: "var(--chakra-colors-gray-100)" }}>
      <div className="home-shift">
        <TextField title={"Search Student Name"} placeholder={"Type student name"} value={student} setter={setStudent} color={"white"} />
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
        {!loading && <Filler cards={4} />}
          {!searchResultDisplay.length && loading && <div className="home-empty">No Passengers Added</div>}
          {searchResultDisplay.map((passenger, i) => {
            return <PhotoCard key={i} id={passenger.id} onEdit={onEdit} onDetail={onDetail} passenger={passenger} />;
          })}
        </div>
      </div>
    </div>
  );
}

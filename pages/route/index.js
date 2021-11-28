//& Input Components [#IMPORTS#]
import SimpleCard from "@/components/simpleCard";
import TextField from "@/components/input";
import server from "@/functions/server";
import Fuse from "fuse.js"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//& Create & Export Driver [#FUNCTION#]
export default function ViewRoute() {
  const router = useRouter();

  const [routeName, setRouteName] = useState("");
  //$ Getting all the routes
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(`/route?populate=school,bus`);
      setRoutes(data.data);
    };

    fetch();
  }, []);

  const onEdit = (id, data) => {
    router.push({ pathname: `/route/edit/${id}`, query: { data: JSON.stringify(data) } });
  };
  const onDetails = (id, data) => {
    router.push({ pathname: `/route/report/${id}`, query: { data: JSON.stringify(data) } });
  };

    //& Fuse JS [#FUSE#]
  //$ New Fuse Instance with Settings
  const fuse = new Fuse(routes, {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: true,
    includeMatches: true,
    findAllMatches: true,
    minMatchCharLength: 0,
    keys: ["name", "guardian.name", "phone","DOB"],
  });

  const result = routeName !== "" && fuse.search(routeName);
  const resultFilter = result && result.map((result) => result.item);
  const searchResultDisplay = resultFilter || routes;

  //& Return UI [#RETURN#]
  return (
    <div className="home" style={{ backgroundColor: "var(--chakra-colors-gray-100)" }}>
      <div className="home-shift">
        <TextField title={"Search Route Name"} placeholder={"Type Route Details"} value={routeName} setter={setRouteName} color={"white"} />
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          {searchResultDisplay && searchResultDisplay.map((route, i) => {
            return (
              <SimpleCard
                key={i}
                id={route._id}
                name={route.name}
                data={route}
                heading={["Start", "School"]}
                info={[route.school.name,route.school.name]}
                onEdit={onEdit}
                onDetails={onDetails}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

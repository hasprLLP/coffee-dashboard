import { useRouter } from "next/router";
import GoBack from "@/helpers/goback";
import { JSONToHTMLTable } from "@kevincobain2000/json-to-html-table";
import { useState, useEffect } from "react";
import server from "src/backend/node/server";

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  const router = useRouter();
  const { report } = router.query;
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await server.get(`/passenger/${report}?select=name`);
      setData(data.data);
    };

    fetch();
  }, [report]);
  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Details{" "}
        </div>
        <div style={{ textTransform: "capitalize" }} className="table-report">
          {data && <JSONToHTMLTable data={data} />}
        </div>
        <br />
      </div>
    </div>
  );
}

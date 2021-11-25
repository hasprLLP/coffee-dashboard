//& Input Components [#IMPORTS#]
import SimpleCard from "@/components/simplecard";
import { useState, useEffect } from "react";
import server from "functions/server";
import TextField from "@/components/input";
import { useRouter } from "next/router";

//& Create & Export Driver [#FUNCTION#]
export default function ViewBus() {
  const [student, setStudent] = useState("");

  const router = useRouter();
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetch = async () => {
  //     const { data } = await server.get(`/bus`);
  //     setData(data.data);
  //   };

  //   fetch();
  // }, []);

  //$ States and Hooks [#STATES#]
  const fields = [
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
    { name: "D-01", id: "MP15CB7898", start: "DMA School", end: "Makronia to DMA", type: "bus" },
  ];

  //& Return UI [#RETURN#]
  return (
    <div className="home" style={{ backgroundColor: "var(--chakra-colors-gray-100)" }}>
      <div className="driver">
        <TextField title={"Search Bus No"} placeholder={"Type Bus No"} value={student} setter={setStudent} color={"white"} />
        <div className="driver-form" style={{ justifyContent: "flex-start" }}>
          {fields.map((item, i) => {
            return <SimpleCard key={i} name={item.name} id={item.id} start={item.start} end={item.end} type={item.type} />;
          })}
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className='home'>
  //     <h1 style={{ fontSize: '40px' }}>List Of all Bus</h1>
  //     <div style={{ display: 'flex', flexDirection: 'column' }}>
  //       {data.map((bus, index) => {
  //         return (
  //           <button
  //             key={index}
  //             onClick={() => {
  //               router.push({ pathname: `/bus/${bus.id}`, query: { data: JSON.stringify(bus) } });
  //             }}
  //           >
  //             {bus.name}
  //           </button>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
}

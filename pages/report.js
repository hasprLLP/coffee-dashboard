import Table from "@/components/table";
import DropDown from "@/components/dropdown";
import axios from "axios";
import { useState } from "react";
axios.defaults.withCredentials = true;

export default function Report() {
  const [report, setReport] = useState("");

  return (
    <div className="home">
      <div style={{ marginLeft: "5vw", width: "85%", height: "100%", marginTop: "5vw" }}>
        <DropDown title={"Select Report"} options={["Monthly Report", "Fee Report", "More Adding"]} value={report} setter={setReport} />
        <div style={{paddingBottom: "2vw"}}><Table /></div>
      </div>
    </div>
  );
}

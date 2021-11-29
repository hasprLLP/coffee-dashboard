import FilePicker from "@/components/filepicker";
import axios from "axios";
import { useState } from "react";
axios.defaults.withCredentials = true;

export default function Home() {
  const [photo, setPhoto] = useState("");

  return (
    <div className="home">
      <div style={{ marginLeft: "5vw", width: "85%", height: "100%", marginTop: "5vw" }}>
        Dashboard
        <FilePicker value={photo} setter={setPhoto} />
      </div>
    </div>
  );
}

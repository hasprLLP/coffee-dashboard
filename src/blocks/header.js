import Image from "next/image";
import Lottie from "react-lottie";
import darkmode from "@/helpers/darkmode.json";
import { useState } from "react";

export default function Header() {
  const [playing, setPlaying] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: darkmode,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="header">
      <div
        className="header-dark-mode"
        onClick={() => {
          setPlaying(true);
          document.body.classList.toggle("-dark-mode");
        }}
      >
        <Lottie options={defaultOptions} width={"3.5vw"} height={"1.5vw"} isStopped={!playing} />
      </div>
      <div className="header-logo">
        <img alt="header" src="/static/svg/tmpLogo.svg" />
      </div>
    </div>
  );
}

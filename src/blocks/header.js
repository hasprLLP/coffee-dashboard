import Image from "next/image";
import Lottie from "react-lottie-player";
import darkmode from "@/helpers/darkmode.json";
import { useState } from "react";

export default function Header() {
  const [playing, setPlaying] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <div className="header">
      <div
        className="header-dark-mode"
        onClick={() => {
          setPlaying(!playing);
          setDark(!dark);
          document.body.classList.toggle("-dark-mode");
          setTimeout(() => {
            document.body.classList.toggle("-normalize-colors");
            document.querySelector(".header-logo").classList.toggle("-hue-fix");
          }, 600);
        }}
      >
        <Lottie
          loop={false}
          speed={1}
          play={playing}
          animationData={darkmode}
          direction={dark ? 1 : -1}
          segments={dark ? [20, 120] : [0, 100]}
          style={{ width: "3.5vw" }}
          onComplete={() => setPlaying(false)}
          // onComplete={() => addLog('complete')}
          // onLoopComplete={() => addLog('loopComplete')}
          // onEnterFrame={() => { /* addLog('enterFrame') */ }}
          // onSegmentStart={() => addLog('segmentStart')}
          // onLoad={() => addLog('load')}
        />
      </div>
      <div className="header-logo">
        <Image alt="header" src="/static/svg/tmpLogo.svg" layout="fill" objectFit="contain" />
      </div>
    </div>
  );
}

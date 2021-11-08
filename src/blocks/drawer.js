import Image from "next/image";

export default function Drawer() {
  return (
    <div className="drawer">
      <Image alt="logo" src="/static/svg/logo.svg" layout="responsive" width="14.5vw" height="4.5vw" objectFit="contain" />
      <div className="drawer-gap" />
      <Image alt="logo" src="/static/svg/dash-off.svg" layout="responsive" width="14.5" height="4.5vw" objectFit="contain" />
      <Image alt="logo" src="/static/svg/report-off.svg" layout="responsive" width="14.5" height="4.5vw" objectFit="contain" />
    </div>
  );
}

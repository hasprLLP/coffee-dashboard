import Image from "next/image";
import { Accordion } from "@chakra-ui/react";
import DrawerItem from "@/components/accordionItem";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Drawer() {
  const [activePage, setActivePage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (activePage === "Create Driver") router.push("/driver");
    return () => {};
  }, [activePage]);

  return (
    <div className="drawer fixed">
      <Image alt="logo" src="/static/svg/logo.svg" layout="responsive" width="14.5vw" height="4.5vw" objectFit="contain" />
      <div className="drawer-gap" />
      <Image alt="logo" src="/static/svg/dash-off.svg" layout="responsive" width="14.5vw" height="4.5vw" objectFit="contain" />
      <Image alt="logo" src="/static/svg/report-off.svg" layout="responsive" width="14.5vw" height="4.5vw" objectFit="contain" />
      <div className="drawer-gap" />
      <Accordion allowToggle>
        <DrawerItem icon="owner" name="Owner" pages={["User Profile", "Create Driver", "Drivers List"]} active={activePage} setter={setActivePage} />
        <DrawerItem icon="route" name="Route" pages={["Bus Profile", "Create Bus", "Bus List"]} active={activePage} setter={setActivePage} />
        <DrawerItem
          icon="driver"
          name="Driver"
          pages={["User Profile", "Create Driver", "Drivers List"]}
          active={activePage}
          setter={setActivePage}
        />
        <DrawerItem icon="bus" name="Bus" pages={["User Profile", "Create Driver", "Drivers List"]} active={activePage} setter={setActivePage} />
        <DrawerItem icon="user" name="User" pages={["User Profile", "Create Driver", "Drivers List"]} active={activePage} setter={setActivePage} />
        <DrawerItem
          icon="redeem"
          name="Redeem"
          pages={["User Profile", "Create Driver", "Drivers List"]}
          active={activePage}
          setter={setActivePage}
        />
      </Accordion>
    </div>
  );
}

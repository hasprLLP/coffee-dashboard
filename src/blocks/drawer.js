import Image from "next/image";
import { Accordion } from "@chakra-ui/react";
import DrawerItem from "@/components/accordionItem";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Logout from "@/utilities/logout";

export default function Drawer() {
  const [activePage, setActivePage] = useState(null);
  const router = useRouter();
  const [dashboard, setDashboard] = useState(false);
  const [report, setReport] = useState(false);

  const dashButton = () => {
    setDashboard(true);
    setReport(false);
  };
  const reportButton = () => {
    setDashboard(false);
    setReport(true);
  };
  // #Function to navigate to a page and pass sub pages as a query string
  const navigate = (page) => {
    setDashboard(false);
    setReport(false);
    router.push({
      pathname: page,
    });
    // Setting current active page
    setActivePage(page);
  };

  useEffect(() => {
    if (dashboard) router.replace("/");
    else if (report) router.replace("/report");
  }, [dashboard, report]);

  return (
    <div className="drawer fixed">
      <Image alt="logo" src="/icons/logo/logo.png" layout="responsive" width="14.5vw" height="4.5vw" objectFit="contain" />
      <div className="drawer-gap" />
      <div onClick={dashButton} className="drawer-button">
        <Image
          alt="logo"
          src={`/static/svg/dash-${dashboard ? "on" : "off"}.svg`}
          layout="responsive"
          width="14.5vw"
          height="4.5vw"
          objectFit="contain"
        />
      </div>
      <div onClick={reportButton} className="drawer-button">
        <Image
          alt="logo"
          src={`/static/svg/report-${report ? "on" : "off"}.svg`}
          layout="responsive"
          width="14.5vw"
          height="4.5vw"
          objectFit="contain"
        />
      </div>
      <div className="drawer-gap" />
      <Accordion allowToggle>
        <DrawerItem
          icon="user"
          heading="Student"
          pages={[
            { name: "View", path: "/passenger" },
            { name: "Report", path: "/passenger/table" },
            { name: "Add", path: "/passenger/add" },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem
          icon="redeem"
          heading="Bus Owner"
          pages={[
            { name: "View", path: "/redeem" },
            { name: "Report", path: "/redeem/table" },
            { name: "Add", path: "/redeem/add" },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem
          icon="bus"
          heading="Bus"
          pages={[
            { name: "View", path: "/bus" },
            { name: "Report", path: "/bus/table" },
            { name: "Add", path: "/bus/add" },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem
          icon="driver"
          heading="Driver"
          pages={[
            { name: "View", path: "/driver" },
            { name: "Report", path: "/driver/table" },
            { name: "Add", path: "/driver/add" },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem
          icon="school"
          heading="School"
          pages={[
            { name: "View", path: "/school" },
            { name: "Report", path: "/school/table" },
            { name: "Add", path: "/school/add" },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem
          icon="redeem"
          heading="Package"
          pages={[
            { name: "View", path: "/package" },
            { name: "Report", path: "/package/table" },
            { name: "Add", path: "/package/add" },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem
          icon="route"
          heading="Route"
          pages={[
            { name: "View", path: "/route" },
            { name: "Report", path: "/route/table" },
            { name: "Add", path: "/route/add" },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem
          icon="user"
          heading="More Settings"
          pages={[
            { name: "Notifications", path: "/extra/notifications" },
            { name: "Announcements", path: "/extra/announcements" },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
      </Accordion>
    </div>
  );
}

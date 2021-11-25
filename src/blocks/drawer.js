import Image from "next/image";
import { Accordion } from "@chakra-ui/react";
import DrawerItem from "@/components/accordionItem";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Drawer() {
  const [activePage, setActivePage] = useState(null);
  const router = useRouter();
  // #Function to navigate to a page and pass sub pages as a query string
  const navigate = (page) => {
    router.push({
      pathname: page,
    });
    // Setting current active page
    setActivePage(page);
  };
  return (
    <div className="drawer fixed">
      <Image alt="logo" src="/static/svg/logo.svg" layout="responsive" width="14.5vw" height="4.5vw" objectFit="contain" />
      <div className="drawer-gap" />
      <Image alt="logo" src="/static/svg/dash-off.svg" layout="responsive" width="14.5vw" height="4.5vw" objectFit="contain" />
      <Image alt="logo" src="/static/svg/report-off.svg" layout="responsive" width="14.5vw" height="4.5vw" objectFit="contain" />
      <div className="drawer-gap" />
      <Accordion allowToggle>
      <DrawerItem
          icon="user"
          heading="Student"
          pages={[
            { name: "View", path: "/student" },
            { name: "Add", path: "/student/add" },
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
            { name: "Add", path: "/bus/add" },
            { name: "Locate", path: "/bus/locate" },
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
            { name: "Add", path: "/driver/add" },
          ]}
          active={activePage}
          setter={setActivePage}
          fun={navigate}
        />
        <DrawerItem
          icon="route"
          heading="Route"
          pages={[
            { name: "View", path: "profile" },
            { name: "Add", path: "create" },
          ]}
          active={activePage}
          setter={setActivePage}
        />

        <DrawerItem
          icon="user"
          heading="User"
          pages={[
            { name: "View", path: "profile" },
            { name: "Add", path: "create" },
          ]}
          active={activePage}
          setter={setActivePage}
        />
        <DrawerItem
          icon="redeem"
          heading="Redeem"
          pages={["User Profile", "Create Driver", "Drivers List"]}
          active={activePage}
          setter={setActivePage}
        />
        <DrawerItem
          icon="owner"
          heading="Owner"
          pages={["User Profile", "Create Driver", "Drivers List"]}
          active={activePage}
          setter={setActivePage}
        />
      </Accordion>
    </div>
  );
}

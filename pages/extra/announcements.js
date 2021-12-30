//& Input Components [#IMPORTS#]
import TextField from "@/components/input";
import DropDown from "@/components/dropdown";
import SaveButton from "@/components/saveButton";
import Notification from "@/components/notification";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

//& Create & Export Driver [#FUNCTION#]
export default function Announcements() {
  const [option, setOption] = useState("Add");

  const [name, setName] = useState();
  const [edit, setEdit] = useState({});

  const setterArray = [setName];

  const saveButton = () => {
    try {
      alert("Save Announcemnet");
    } catch (error) {
      console.log(error);
    }
  };

  const list = [
    { id: "12", name: "Help Me Plix" },
    { id: "154", name: "Bus Is Kidnapped" },
    { id: "178", name: "Allahu Akbar Case" },
    { id: "789", name: "911 Emergency" },
    { id: "657", name: "Driver Is Pedophile" },
  ];

  const AddAnnouncement = () => {
    return (
      <>
        <div className="layout-sub-title" style={{ marginTop: "2vw" }}>
          Add New Announcement for Operators
        </div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          <TextField isRequired={true} title={"Announcement Title"} placeholder={"Type here..."} value={name} setter={setName} />
        </div>
        <SaveButton
          // collection={'package'}
          reset={setterArray}
          data={{
            name,
          }}
        />
      </>
    );
  };

  const ViewAnnouncement = () => {
    return (
      <>
        <div className="layout-sub-title" style={{ marginTop: "2vw" }}>
          List of All Announcements
        </div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          {list.map((item, i) => {
            return <TextField key={i} type={"show"} title={`Announcement ${i + 1}`} value={item.name} />;
          })}
        </div>
      </>
    );
  };

  console.log("edit?.name",edit?.name);

  const EditAnnouncement = () => {
    return (
      <>
        <div className="layout-sub-title" style={{ marginTop: "2vw" }}>
          Choose and Edit Announcement
        </div>
        <div className="layout-form" style={{ justifyContent: "flex-start" }}>
          <DropDown title={"Choose Announcement to Edit"} options={list} value={edit?.name} setter={setEdit} />
          {edit?.name && <TextField isRequired={true} title={"Announcement Title"} placeholder={"Type here..."} value={name} setter={setName} />}
        </div>
      </>
    );
  };

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Announcements Panel</div>
        <RadioGroup onChange={setOption} value={option}>
          <Stack direction="row">
            <Radio value="Add" colorScheme="teal" pr="6">
              Add New Announcement
            </Radio>
            <Radio value="View" colorScheme="teal" pr="6">
              View All Announcements
            </Radio>
            <Radio value="Edit" colorScheme="teal" pr="6">
              Edit Existing Announcement
            </Radio>
          </Stack>
        </RadioGroup>
        {option === "Add" ? AddAnnouncement() : option === "View" ? ViewAnnouncement() : option === "Edit" ? EditAnnouncement() : null}
      </div>
    </div>
  );
}

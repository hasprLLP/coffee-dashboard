import { Button } from "@chakra-ui/react";
import Notification from "@/components/notification";
import axios from "axios";
import { useState } from "react";

axios.defaults.withCredentials = true;

const DeleteButton = ({ collection, data }) => {
  const [status, setStatus] = useState(null);

  const onSave = async () => {
    // setStatus("success");
    // const response = await axios.post(`${process.env.SERVER_URL}${collection}`, data);
    // console.log("response", response);
    // if (response.status === 201) {
    //   setStatus("success");
    // } else {
    //   setStatus("error");
    // }
  };
  return (
    <div className="button">
      {/* <Button onClick={onSave} colorScheme="red" size="md" isFullWidth>
        Delete
      </Button> */}
      <Notification type={status} />
    </div>
  );
};

export default DeleteButton;

import { Button } from "@chakra-ui/react";
import Notification from "@/components/notification";
import axios from "axios";
import { useState } from "react";
import server from "src/functions/server";

const SaveButton = ({ collection, data, reset }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false)

  const onSave = async () => {
    setLoading(true);
    try {
      const response = await server.post(`${process.env.SERVER_URL}${collection}/`, data);
      console.log("response", response);
      if (response.status === 201) {
        setStatus("success");
        reset.map((setter) => setter(""));
        setLoading(false);
      } else {
        setStatus("error");
        setLoading(false);
      }
    } catch (error) {
      setStatus("error");
      setLoading(false);
    }
  };
  return (
    <div className="button">
      <Button onClick={onSave} colorScheme="teal" size="md" isFullWidth isLoading={loading} loadingText="Submitting">
        Save
      </Button>
      <Notification type={status} />
    </div>
  );
};

export default SaveButton;

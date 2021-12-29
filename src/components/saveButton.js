import { Button } from "@chakra-ui/react";
import Notification from "@/components/notification";
import axios from "axios";
import { useState } from "react";

const SaveButton = ({ collection, data, reset }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${collection}/`, data);
      console.log("response", response);
      if (response.status === 201) {
        setStatus("success");
        reset.map((setter) => {
          setter("");
        });
        setLoading(false);
      }
    } catch (error) {
      setStatus(error.message);
      console.log(error);
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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Notification = ({ type }) => {
  const push = (type) => {
    type === "success"
      ? toast.success("Saved Successfully !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      : toast.error("Please Check Details !" + type, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
  };

  useEffect(() => {
    if (type) {
      push(type);
    }
  }, [type]);

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default Notification;

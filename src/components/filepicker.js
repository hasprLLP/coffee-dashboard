import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from "@chakra-ui/react";
import { CloudUpload } from "@material-ui/icons";
import Image from "next/image";
import firebaseApp from "../../backend/firebase/index";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FilePicker = ({ title, value, setter }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const storage = getStorage();
  const onFilePick = async (e) => {
    const file = e.target.files[0];
    onOpen();
    const storageRef = ref(storage, file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        setter(downloadURL);
      });
    });
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      //setter(`data:image/png;base64,${base64String}`);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="dropdown" style={{ marginRight: "0.5vw" }}>
      <div className="dropdown-title">{title}</div>
      <input
        type="file"
        accept="image/*"
        className="file-picker css-13vuage"
        onChange={onFilePick}
        style={{ marginBottom: "2vw", marginTop: "1vw" }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify Uploaded Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img
              alt="verify"
              src={value}
              style={{ display: "flex", borderRadius: "0.5vw", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Verify
            </Button>
            <Button onClick={onClose}>Re-upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FilePicker;

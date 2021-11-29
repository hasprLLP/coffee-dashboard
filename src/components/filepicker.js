import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";

const FilePicker = ({ title, value, setter }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onFilePick = (e) => {
    const file = e.target.files[0];
    onOpen();

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setter(`data:image/png;base64,${base64String}`);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="dropdown" style={{ marginRight: "0.5vw" }}>
      <div className="dropdown-title">{title}</div>
      <input type="file" accept="image/*" className="file-picker css-13vuage" onChange={onFilePick} style={{ marginBottom: "2vw", marginTop: "1vw" }} />
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

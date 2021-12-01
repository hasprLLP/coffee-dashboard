import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { useState, useRef } from "react";

export default function Logout() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    // logout code
    setIsOpen(false);
  };
  const cancelRef = useRef();

  return (
    <>
      <Button colorScheme="red" onClick={() => setIsOpen(true)}>
        Logout
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout of Admin Panel
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? Press Confirm to Logout.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

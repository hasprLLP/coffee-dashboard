import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import { useEffect, useImperativeHandle ,useCallback, forwardRef, useRef } from 'react';

// eslint-disable-next-line react/display-name
const BasicModal = forwardRef((props, ref) => {

  //$ Model States
  const { isOpen, onOpen, onClose } = useDisclosure();

   useImperativeHandle(ref, () => ({
    showAlert() {
      onOpen()
    },
  }))

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader style={{ color: props.type == 'warning ' ? 'yellow' : 'teal', fontWeight: 'bold' }}>{props.Head}</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ fontWeight: 'bold' }}>{props.Message}</ModalBody>

        <ModalFooter>
          <Button colorScheme='green' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.fun();
              onClose();
            }}
            colorScheme='red'
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default BasicModal;
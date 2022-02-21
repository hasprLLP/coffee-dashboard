/* eslint-disable @next/next/no-img-element */
import {
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import firebaseApp from '@/firebase/index'
import TextField from '@/components/input'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const FilePicker = ({ title, value, setter }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [expiry, setExpiry] = useState()
  const [photo, setPhoto] = useState({})
  const [loading, setLoading] = useState(false)

  const storage = getStorage()

  const onFilePick = async e => {
    setLoading(true)

    const file = e.target.files[0]

    onOpen()

    if (file) {
      const storageRef = ref(storage, file.name)

      uploadBytes(storageRef, file).then(snapshot => {
        getDownloadURL(snapshot.ref).then(downloadURL => {
          setPhoto(downloadURL)
          setLoading(false)
        })
      })
    } else {
      onClose()
    }

  }

  const submitPhoto = () => {
    setter({ date: expiry || null, url: photo })
    onClose()
  }

  return (
    <div className="dropdown" style={{ marginRight: '0.5vw' }}>
      <div className="dropdown-title">{title}</div>
      <input
        type="file"
        accept="image/*"
        className="file-picker css-13vuage"
        onChange={onFilePick}
        style={{ marginBottom: '2vw', marginTop: '1vw' }}
      />
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify Uploaded Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Skeleton isLoaded={!loading} height="100%" rounded="xl">
              <img
                alt="verify"
                src={photo}
                style={{
                  display: 'flex',
                  borderRadius: '0.5vw',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '60vh',
                  objectFit: 'contain',
                }}
              />
              <TextField type={'date'} title={'Choose Expiry'} placeholder={'Expiry Date'} value={expiry} setter={setExpiry} />
            </Skeleton>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={submitPhoto}>
              Verify
            </Button>
            <Button onClick={onClose}>Re-upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default FilePicker

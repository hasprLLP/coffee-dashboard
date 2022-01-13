import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import DropDown from '@/components/dropdown'
import { useEffect, useState } from 'react'

const ViewPDF = dynamic(() => import('./generateInvoice'), {
  ssr: false,
})

export default function PrintInvoice() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [size, setSize] = useState('A4')
  const [orientation, setOrientation] = useState('PORTRAIT')

  const data = { name: 'Hello Print', phone: 7987751602 }

  useEffect(() => {
    onOpen()
  }, [])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Invoice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DropDown
              title={'Choose Page Size'}
              options={['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'EXECUTIVE', 'FOLIO', 'LEGAL', 'LETTER', 'TABLOID']}
              value={size}
              setter={setSize}
            />
            <DropDown title={'Download Orientation'} options={['PORTRAIT', 'LANDSCAPE']} value={orientation} setter={setOrientation} />
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
              <ViewPDF data={data} size={size} orientation={orientation} />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

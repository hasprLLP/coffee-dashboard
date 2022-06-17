import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react'
import { useState, useRef } from 'react'
import Cookies from 'js-cookie'
var ls = require('local-storage')
import { useRouter } from 'next/router'

export default function Logout() {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    // logout code
    try {
      ls.clear()
      Cookies.remove('authorization')
      router.push('/login')
    } catch (error) {
      // console.log(error);
    }
    setIsOpen(false)
  }
  const cancelRef = useRef()

  return (
    <>
      <Button mt={4} mb={10} colorScheme="red" onClick={() => setIsOpen(true)}>
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
  )
}

//& Input Components [#IMPORTS#]
import TextField from '@/components/input'
import DropDown from '@/components/dropdown'
import FilePicker from '@/components/filepicker'
import Notification from '@/components/notification'
import { Button } from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

//& Create & Export Driver [#FUNCTION#]
export default function Notifications() {
  const [target, setTarget] = useState()
  const [school, setSchool] = useState()
  const [route, setRoute] = useState()
  const [schoolList, setSchoolList] = useState([])
  const [routeList, setRouteList] = useState([])
  const [message, setMessage] = useState()
  const [heading, setHeading] = useState()
  const [photo, setPhoto] = useState({})
  const [status, setStatus] = useState()

  const getSchools = async () => {
    try {
      const response = await axios.get(`school/`)
      const tempSchoolNames = []
      response.data.data.map(school => {
        tempSchoolNames.push(school.name)
      })
      setSchoolList(tempSchoolNames)
    } catch (error) {
      // console.log('error', error)
    }
  }

  const getRoutes = async () => {
    try {
      const response = await axios.get(`route/`)
      const tempRouteNames = []
      response.data.data.map(route => {
        tempRouteNames.push(route.name)
      })
      setRouteList(tempRouteNames)
    } catch (error) {
      // console.log('error', error)
    }
  }

  //@ Get Full List on Page Load
  const got = useRef(false) //` Initial False
  useEffect(() => {
    if (!got.current) {
      getSchools() //@ Get Schools List
      getRoutes() //@ Get Routes List
    }
    got.current = true //` Set To True After Getting Data
  }, [])

  const sendAlert = () => {
    try {
      setStatus('success')
    } catch (error) {
      // console.log(error)
    }
  }

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Notifications Panel</div>
        <div className="layout-sub-title">Choose Target Audience for Notification</div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          <DropDown
            title={'General'}
            isRequired={true}
            options={['All Students', 'Pending Dues', 'Unverified Students', 'School', 'Route']}
            value={target}
            setter={setTarget}
          />
          {target === 'School' && <DropDown title={'Specify School'} isRequired={true} options={schoolList} value={school} setter={setSchool} />}
          {target === 'Route' && <DropDown title={'Specify Route'} isRequired={true} options={routeList} value={route} setter={setRoute} />}
        </div>
        <div className="layout-sub-title">Notification Content</div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          <TextField isRequired={true} title={'Heading'} placeholder={'Type Heading'} value={heading} setter={setHeading} />
          <TextField isRequired={true} title={'Message for Broadcast'} placeholder={'Type Message'} value={message} setter={setMessage} />
          <FilePicker title={'Add a Photo'} value={photo} setter={setPhoto} />
        </div>
        <div className="button">
          <Button onClick={sendAlert} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Sending">
            Send Alert
          </Button>
          <Notification type={status} />
        </div>
      </div>
    </div>
  )
}

//& Input Components [#IMPORTS#]
import TextField from '@/components/input'
import DropDown from '@/components/dropdown'
import UpdateButton from '@/components/updateButton'
import DeleteButton from '@/components/deleteButton'
import { LoadScript } from '@react-google-maps/api'
import GoBack from '@/helpers/goback'
import Map from '@/utilities/map'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

//& Create & Export Driver [#FUNCTION#]
export default function EditRoute() {
  const router = useRouter()
  const { id } = router.query

  const lib = ['places']

  const [name, setName] = useState()
  const [morningDeparture, setMorningDeparture] = useState()
  const [morningArrival, setMorningArrival] = useState()
  const [afternoonDeparture, setAfternoonDeparture] = useState()
  const [startsFrom, setStartsFrom] = useState()
  const [school, setSchool] = useState({})
  const [schools, setSchools] = useState([])
  const [schoolNames, setSchoolNames] = useState([])
  const [bus, setBus] = useState({})
  const [buses, setBuses] = useState([])
  const [busNames, setBusNames] = useState([])

  useEffect(() => {
    if (router.query.data) {
      const data = JSON.parse(router.query.data)
      setName(data?.name)
      setMorningDeparture(data?.morningDeparture)
      setMorningArrival(data?.morningArrival)
      setAfternoonDeparture(data?.afternoonDeparture)
      setStartsFrom(data?.startsFrom?.address)
      setSchool(data?.school)
      setBus(data?.bus)
    }
  }, [router.query.data])

  const getSchools = useCallback(async () => {
    try {
      const response = await axios.get(`school/`)
      setSchools(response.data.data)
      const tempSchoolNames = []
      response.data.data.map(school => {
        tempSchoolNames.push(school.name)
      })
      setSchoolNames(tempSchoolNames)
    } catch (error) {
      // console.log('error', error)
    }
  }, [])

  const getBuses = useCallback(async () => {
    try {
      const response = await axios.get(`bus/`)
      setBuses(response.data.data)
      const tempBusNames = []
      response.data.data.map(bus => {
        tempBusNames.push(bus.name)
      })
      setBusNames(tempBusNames)
    } catch (error) {
      // console.log('error', error)
    }
  }, [])

  const setBusID = busName => {
    const busObj = buses?.find(bus => bus?.name === busName)
    setBus(busObj)
  }
  const setSchoolID = schoolName => {
    const schoolObj = schools?.find(school => school?.name === schoolName)
    setSchool(schoolObj)
  }

  useEffect(() => {
    getSchools()
    getBuses()
  }, [getSchools, getBuses])

  //$ States and Hooks [#STATES#]
  const timing = [
    {
      title: 'Bus Starts (Morning)',
      type: 'time',
      placeholder: 'Time of departure in morning',
      value: morningDeparture,
      setter: setMorningDeparture,
    },
    {
      title: 'Bus Reaches School (Morning)',
      type: 'time',
      placeholder: 'Time of arrival at school in morning',
      value: morningArrival,
      setter: setMorningArrival,
    },
    {
      title: 'Bus Leaves School (Afternoon)',
      type: 'time',
      placeholder: 'Time of departure in Afternoon',
      value: afternoonDeparture,
      setter: setAfternoonDeparture,
    },
  ]

  const details = [
    { title: 'Name', placeholder: 'Route Name', value: name, setter: setName },
    { title: 'Starts from', placeholder: 'Starting Point Address', value: startsFrom, setter: setStartsFrom },
    { title: 'Destination (School)', options: schoolNames, value: school?.name, setter: setSchoolID, type: 'fix' },
    { title: 'Assign Bus', options: busNames, value: bus?.name, setter: setBusID, type: 'fix' },
  ]

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Modify Route
        </div>
        <div className="layout-sub-title">Timing Details</div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {timing.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField type={item.type} key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            )
          })}
        </div>
        <div className="layout-sub-title">Basic Details</div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {details.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : (
              <TextField type={item.type} key={i} title={item.title} placeholder={item.placeholder} value={item.value} setter={item.setter} />
            )
          })}
        </div>
        {/* //! TODO <LoadScript googleMapsApiKey={key} libraries={lib}>
          <Map />
        </LoadScript> */}
        <div className="layout-edit-row">
          <UpdateButton
            collection={`route/${id}`}
            data={{
              name,
              morningDeparture,
              morningArrival,
              afternoonDeparture,
              startsFrom: {
                type: 'Point',
                coordinates: [],
                address: startsFrom,
              },
              school: school?.id,
              bus: bus?.id,
            }}
          />
          <DeleteButton
            collection={'bus'}
            // data={{ name, busNumber, capacity }}
          />
        </div>
      </div>
    </div>
  )
}

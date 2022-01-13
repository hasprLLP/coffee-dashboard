//& Input Components [#IMPORTS#]
import TextField from '@/components/input'
import GoBack from '@/helpers/goback'
import DropDown from '@/components/dropdown'
import UpdateButton from '@/components/updateButton'
import DeleteButton from '@/components/deleteButton'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Switch } from '@chakra-ui/react'
import FilePicker from '@/components/filepicker'

//& Create & Export Driver [#FUNCTION#]
export default function EditBus() {
  const router = useRouter()
  const { id } = router.query

  const [RCNumber, setRCNumber] = useState()
  const [name, setName] = useState()
  const [owner, setOwner] = useState({})
  const [owners, setOwners] = useState()
  const [ownerNames, setOwnerNames] = useState([])
  const [capacity, setCapacity] = useState(40)
  const [commission, setCommission] = useState(10)
  const [vehicleType, setVehicleType] = useState('')
  const [selfOwn, setSelfOwn] = useState(false)
  const [RCPhoto, setRCPhoto] = useState()
  const [permitPhoto, setPermitPhoto] = useState()
  const [pucPhoto, setPucPhoto] = useState()
  const [fitnessPhoto, setFitnessPhoto] = useState()
  const [insurancePhoto, setInsurancePhoto] = useState()

  useEffect(() => {
    if (router.query.data) {
      const data = JSON.parse(router.query.data)
      setName(data?.name)
      setCapacity(data?.capacity)
      setVehicleType(data?.vehicleType)
      setCommission(data?.commission)
      setSelfOwn(data?.selfOwn)
      setOwner(data?.owner?.name)
      setRCNumber(data?.RCNumber)
    }
  }, [router.query.data])

  const getOwners = useCallback(async () => {
    try {
      const response = await axios.get(`owner`)
      setOwners(response.data.data)
      const tempOwnerName = []
      response.data.data.map(bus => {
        tempOwnerName.push(bus.name)
      })
      setOwnerNames(tempOwnerName)
    } catch (error) {
      console.log('Error while fetching Owner: ', error)
    }
  }, [])

  const setOwnerID = ownerName => {
    const ownerObj = owners?.find(owner => owner?.name === ownerName)
    setOwner(ownerObj)
  }

  //$ States and Hooks [#STATES#]
  //$ States and Hooks [#STATES#]
  const basicFields = [
    { title: 'Bus Name (or ID)', isRequired: true, placeholder: 'Bus Name for Reference', value: name, setter: setName },
    { title: 'Bus No (RC)', isRequired: true, placeholder: 'Provide Registration No', value: RCNumber, setter: setRCNumber },
    { title: 'Capacity', placeholder: 'Bus Seating Capacity', type: 'number', value: capacity, setter: setCapacity },
    { title: 'Vehicle Type', options: ['Bus', 'Mini-Bus', 'Van'], value: vehicleType, setter: setVehicleType, type: 'dropdown' },
    { title: 'RC Photo', value: RCPhoto, setter: setRCPhoto, type: 'upload' },
    { title: 'Permit Photo', value: permitPhoto, setter: setPermitPhoto, type: 'upload' },
    { title: 'PUC Photo', value: pucPhoto, setter: setPucPhoto, type: 'upload' },
  ]
  const ownerFields = [
    {
      title: 'Owner',
      isRequired: true,
      options: ownerNames,
      type: 'dropdown',
      placeholder: 'Bus Owner Name',
      value: owner?.name,
      setter: setOwnerID,
    },
    { title: 'Commission', placeholder: 'Owner Commission', type: 'number', value: commission, setter: setCommission, type: selfOwn ? 'fix' : null },
  ]

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Modify Bus Details
        </div>
        <div className="layout-not-student">
          <h1>Self Own Bus ?</h1>
          <Switch
            onChange={e => {
              setSelfOwn(e.target.checked)
            }}
            value={selfOwn}
            size="md"
            defaultIsChecked={false}
          />
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {basicFields.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                type={item.type}
                key={i}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                setter={item.setter}
                prefix={item.prefix}
                isRequired={item.isRequired}
              />
            )
          })}
          {!selfOwn
            ? ownerFields.map((item, i) => {
                return item.type === 'dropdown' ? (
                  <DropDown key={i} isRequired={item.isRequired} title={item.title} options={item.options} value={item.value} setter={item.setter} />
                ) : (
                  <TextField
                    type={item.type}
                    key={i}
                    title={item.title}
                    placeholder={item.placeholder}
                    value={item.value}
                    setter={item.setter}
                    prefix={item.prefix}
                    isRequired={item.isRequired}
                  />
                )
              })
            : null}
        </div>

        <div className="layout-edit-row">
          <UpdateButton
            collection={`bus/${id}`}
            data={{ name, RCNumber, capacity, vehicleType, RCPhoto, permitPhoto, pucPhoto, fitnessPhoto, insurancePhoto }}
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

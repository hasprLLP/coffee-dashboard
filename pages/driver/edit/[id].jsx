//& Input Components [#IMPORTS#]
import TextField from '@/components/input'
import DropDown from '@/components/dropdown'
import FilePicker from '@/components/filepicker'
import UpdateButton from '@/components/updateButton'
import DeleteButton from '@/components/deleteButton'
import GoBack from '@/helpers/goback'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

//& Create & Export Driver [#FUNCTION#]
export default function EditBus() {
  const router = useRouter()
  const { id } = router.query

  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [pin, setPin] = useState()
  const [DOB, setDOB] = useState()
  const [photo, setPhoto] = useState()
  const [sign, setSign] = useState()
  const [drivingLicense, setDrivingLicense] = useState()
  const [aadharFront, setAadharFront] = useState()
  const [aadharBack, setAadharBack] = useState()
  const [covid, setCovid] = useState()

  const setterArray = [setName, setPhone, setPin, setPhoto, setSign, setDrivingLicense, setAadharFront, setAadharBack, setCovid, setDOB]

  useEffect(() => {
    if (router.query.data) {
      const data = JSON.parse(router.query.data)
      const DOB = data?.DOB?.split('T') || ''
      setName(data?.name)
      setPhone(data?.phone)
      setPin(data?.pin)
      setDOB(DOB[0])
      setPhoto(data?.photo)
      setSign(data?.sign)
      setAadharFront(data?.aadharFront)
      setAadharBack(data?.aadharBack)
      setDrivingLicense(data?.drivingLicense)
      setCovid(data?.covid)
    }
  }, [router.query.data])

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: 'Driver Name', isRequired: true, placeholder: 'Bus Operator Name', value: name, setter: setName },
    {
      title: 'Mobile No',
      isRequired: true,
      placeholder: 'Operator Phone no',
      type: 'number',
      value: phone,
      setter: setPhone,
      type: 'tel',
      prefix: '+91',
    },
    { title: 'Pin', isRequired: true, placeholder: 'Pin', value: pin, setter: setPin },
    { title: 'Date of Birth', type: 'date', placeholder: 'eg 02/07/2003', value: DOB, setter: setDOB },
    { title: 'Upload Passport Size Photo', value: photo, setter: setPhoto, type: 'upload' },
    { title: 'Upload Aadhar Card Front', value: aadharFront, setter: setAadharFront, type: 'upload' },
    { title: 'Upload Aadhar Card Back', value: aadharBack, setter: setAadharBack, type: 'upload' },
    { title: 'Upload Signature', value: sign, setter: setSign, type: 'upload' },
    { title: 'Upload Driving License', value: drivingLicense, setter: setDrivingLicense, type: 'upload' },
    { title: 'Upload COVID Certificate', value: covid, setter: setCovid, type: 'upload' },
  ]

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Modify Driver Details
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {fields.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                key={i}
                isRequired={item.isRequired}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                setter={item.setter}
                prefix={item.prefix}
                type={item.type}
              />
            )
          })}
        </div>
        <div className="layout-edit-row">
          <UpdateButton
            collection={`operator/${id}`}
            data={{
              name,
              phone,
              pin,
              DOB,
              photo,
              sign,
              drivingLicense,
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

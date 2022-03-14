//& Input Components [#IMPORTS#]
import TextField from '@/components/input'
import DropDown from '@/components/dropdown'
import GoBack from '@/helpers/goback'
import UpdateButton from '@/components/updateButton'
import DeleteButton from '@/components/deleteButton'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

//& Create & Export Driver [#FUNCTION#]
export default function EditSchool() {
  const router = useRouter()
  const { id } = router.query

  const [name, setName] = useState()
  const [city, setCity] = useState()
  const [prefix, setPrefix] = useState()
  const [address, setAddress] = useState()
  const [zip, setZip] = useState()
  const [phone, setPhone] = useState()

  useEffect(() => {
    if (router.query.data) {
      const data = JSON.parse(router.query.data)
      setName(data?.name)
      setPrefix(data?.prefix)
      setCity(data?.city)
      setAddress(data?.location?.address)
      setPhone(data?.phone)
      setZip(data?.zip)
    }
  }, [router.query.data])

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: 'School Name', isRequired: true, placeholder: 'Enter School Name', value: name, setter: setName },
    { title: 'School Prefix (for Student ID)', type: 'fix', isRequired: true, placeholder: 'Enter Prefix', value: prefix, setter: setPrefix },
    { title: 'City', isRequired: true, placeholder: 'City of the school', value: city, setter: setCity },
    { title: 'Address', isRequired: true, placeholder: 'Address of the school', value: address, setter: setAddress },
    { title: 'Zip Code', isRequired: true, type: 'number', placeholder: 'Enter Zip Code', value: zip, setter: setZip },
    { title: 'Phone', placeholder: 'School Contact Number', type: 'tel', prefix: '+91', value: phone, setter: setPhone },
  ]

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Modify School Details
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {fields.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
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
        </div>
        <div className="layout-edit-row">
          <UpdateButton
            collection={`school/${id}`}
            data={{
              name,
              city,
              address,
              zip,
              phone,
              location: {
                type: 'Point',
                coordinates: [0, 0],
                address,
              },
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

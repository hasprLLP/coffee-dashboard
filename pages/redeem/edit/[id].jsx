//& Input Components [#IMPORTS#]
import TextField from '@/components/input'
import DropDown from '@/components/dropdown'
import GoBack from '@/helpers/goback'
import UpdateButton from '@/components/updateButton'
import DeleteButton from '@/components/deleteButton'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FilePicker from '@/components/filepicker'

//& Create & Export Driver [#FUNCTION#]
export default function EditSchool() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState()

  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [photo, setPhoto] = useState({})
  const [note, setNote] = useState()
  const [password, setPassword] = useState()
  const [passwordConfirm, setPasswordConfirm] = useState()
  useEffect(() => {
    if (router.query.data) {
      const data = JSON.parse(router.query.data)
      console.log(data)
      setName(data?.name)
      setPhone(data?.phone)
      setPhoto(data?.photo)
      setNote(data?.note)
      setPassword(data?.password)
      setPasswordConfirm(data?.passwordConfirm)
    }
  }, [router.query.data])

  //$ States and Hooks [#STATES#]
  const fields = [
    { title: 'Owner Name', isRequired: true, placeholder: 'Owner Name', value: name, setter: setName },
    {
      title: 'Mobile No',
      isRequired: true,
      placeholder: 'Operator Phone no',
      type: 'number',
      value: phone,
      setter: setPhone,
      type: 'tel',
      prefix: '+91',
      type: 'fix',
    },

    { title: 'Upload Passport Size Photo', value: photo, setter: setPhoto, type: 'upload' },
    { title: 'Password', type: 'fix', value: password, placeholder: 'Password', setter: setPassword },
    { title: 'Confirm Password', type: 'fix', value: passwordConfirm, placeholder: 'Confirm Password', setter: setPasswordConfirm },
  ]
  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Edit Bus Owner
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
        <UpdateButton collection={`owner/${id}`} data={{ name, photo }} />
      </div>
    </div>
  )
}

//& Input Components [#IMPORTS#]
import TextField from '@/components/input'
import DropDown from '@/components/dropdown'
import FilePicker from '@/components/filepicker'
import SaveButton from '@/components/saveButton'
import { useState, useEffect } from 'react'

//& Create & Export Driver [#FUNCTION#]
export default function Create() {
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [pin, setPin] = useState()
  const [photo, setPhoto] = useState({})
  const [note, setNote] = useState()
  const [password, setPassword] = useState()
  const [passwordConfirm, setPasswordConfirm] = useState()

  const setterArray = [setName, setPhone, setPin, setPhoto, setNote, setPasswordConfirm, setPassword]

  const [clean, setClean] = useState(false)

  useEffect(() => {
    setName('')
    setPhone('')
    setPin('')
    setPhoto('')
    setNote('')
    setPassword('')
    setPasswordConfirm('')
  }, [clean])

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
    },

    { title: 'Upload Passport Size Photo', value: photo, setter: setPhoto, type: 'upload' },
    { title: 'Set Note', placeholder: 'Enter a Note', value: note, setter: setNote },
    { title: 'Password', value: password, placeholder: 'Password', setter: setPassword },
    { title: 'Confirm Password', value: passwordConfirm, placeholder: 'Confirm Password', setter: setPasswordConfirm },
  ]

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Add Bus Owner</div>
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
        <SaveButton reset={setClean} collection={'owner'} data={{ name, phone, pin, photo, note, password, passwordConfirm }} />
      </div>
    </div>
  )
}

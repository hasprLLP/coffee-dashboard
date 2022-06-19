//& Input Components [#IMPORTS#]
import TextField from '@/components/input'
import DropDown from '@/components/dropdown'
import SaveButton from '@/components/saveButton'
import UpdateButton from '@/components/updateButton'
import DeleteButton from '@/components/deleteButton'
import Notification from '@/components/notification'
import FilePicker from '@/components/filepicker'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'

//& Create & Export Driver [#FUNCTION#]
export default function Announcements() {
  const [option, setOption] = useState('Add')

  const [name, setName] = useState()
  const [edit, setEdit] = useState()
  const [time, setTime] = useState()
  const [photo, setPhoto] = useState({
    url: null,
    date: null,
  })

  const setterArray = [setName]

  const saveButton = () => {
    try {
      alert('Save Announcemnet')
    } catch (error) {
      // console.log(error)
    }
  }

  const urls = [
    'https://haspr.in/static/images/about/haspr-office-1.webp',
    'https://haspr.in/static/images/about/haspr-office-2.webp',
    'https://haspr.in/static/images/about/haspr-office-3.webp',
  ]

  const list = ['Help Me Plix', 'Bus Is Kidnapped', 'Allahu Akbar Case', '911 Emergency', 'Driver Is Pedophile']
  const timeList = ['5 Min', '10 Min', '15 Min', '30 Min', '45 Min', '1 Hour', '2 Hour', '3 Hour', '6 Hour', 'On Return Trip', 'Next Day']

  const AddAnnouncement = () => {
    return (
      <>
        <div className="layout-sub-title" style={{ marginTop: '2vw' }}>
          Add New Banner Ad
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          <TextField isRequired={true} title={'Ad Title'} placeholder={'Type here...'} value={name} setter={setName} />
          <FilePicker title={'Upload Image'} value={photo} setter={setPhoto} />
        </div>
        <SaveButton
          // collection={'package'}
          reset={setterArray}
          data={{
            name,
          }}
        />
      </>
    )
  }

  const ViewAnnouncement = () => {
    return (
      <>
        <div className="layout-sub-title" style={{ marginTop: '2vw' }}>
          View All Banner Ads
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start', marginLeft: '-2vw' }}>
          {urls.map((item, i) => {
            return (
              <img key={i} alt="ads" src={item} style={{ width: '15vw', height: '6vw', borderRadius: '0.5vw', objectFit: 'cover', margin: '2vw' }} />
            )
          })}
        </div>
      </>
    )
  }

  const EditAnnouncement = () => {
    return (
      <>
        <div className="layout-sub-title" style={{ marginTop: '2vw' }}>
          Choose and Edit Banner Ad
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          <DropDown title={'Choose Announcement to Edit'} options={list} value={edit} setter={setEdit} />
        </div>
        {edit && (
          <>
            <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
              <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
                <TextField isRequired={true} title={'Ad Title'} placeholder={'Type here...'} value={name} setter={setName} />
                <FilePicker title={'Upload Image'} value={photo} setter={setPhoto} />
              </div>
            </div>
            <div className="layout-edit-row">
              <UpdateButton
                // collection={'package'}
                reset={setterArray}
                data={{
                  name,
                }}
              />
              <DeleteButton
                collection={'bus'}
                // data={{ name, busNumber, capacity }}
              />
            </div>
          </>
        )}
      </>
    )
  }

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">Customer App Banner Ads</div>
        <RadioGroup onChange={setOption} value={option}>
          <Stack direction="row">
            <Radio value="Add" colorScheme="teal" pr="6">
              Add New Banner Ad
            </Radio>
            <Radio value="View" colorScheme="teal" pr="6">
              View All Banner Ads
            </Radio>
            <Radio value="Edit" colorScheme="teal" pr="6">
              Edit Existing Banner Ad
            </Radio>
          </Stack>
        </RadioGroup>
        {option === 'Add' ? AddAnnouncement() : option === 'View' ? ViewAnnouncement() : option === 'Edit' ? EditAnnouncement() : null}
      </div>
    </div>
  )
}

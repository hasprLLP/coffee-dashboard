//& Input Components [#IMPORTS#]
import TextField from '@/components/input'
import DropDown from '@/components/dropdown'
import SaveButton from '@/components/saveButton'
import UpdateButton from '@/components/updateButton'
import DeleteButton from '@/components/deleteButton'
import Notification from '@/components/notification'
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

  const setterArray = [setName]

  const saveButton = () => {
    try {
      alert('Save Announcemnet')
    } catch (error) {
      console.log(error)
    }
  }

  const list = ['Help Me Plix', 'Bus Is Kidnapped', 'Allahu Akbar Case', '911 Emergency', 'Driver Is Pedophile']
  const timeList = ['5 Min', '10 Min', '15 Min', '30 Min', '45 Min', '1 Hour', '2 Hour', '3 Hour', '6 Hour', 'On Return Trip', 'Next Day']

  const AddAnnouncement = () => {
    return (
      <>
        <div className="layout-sub-title" style={{ marginTop: '2vw' }}>
          Add New Announcement for Operators
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          <TextField isRequired={true} title={'Announcement Title'} placeholder={'Type here...'} value={name} setter={setName} />
          <DropDown title={'Approx Time for Resolution'} isRequired={true} options={timeList} value={time} setter={setTime} />
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
          List of All Announcements
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {list.map((item, i) => {
            return <TextField key={i} type={'show'} title={`Announcement ${i + 1}`} value={`${item} - (${time})`} />
          })}
        </div>
      </>
    )
  }

  const EditAnnouncement = () => {
    return (
      <>
        <div className="layout-sub-title" style={{ marginTop: '2vw' }}>
          Choose and Edit Announcement
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          <DropDown title={'Choose Announcement to Edit'} options={list} value={edit} setter={setEdit} />
        </div>
        {edit && (
          <>
            <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
              <TextField isRequired={true} title={'Announcement Title'} placeholder={'Type here...'} value={name} setter={setName} />
              <DropDown title={'Approx Time for Resolution'} isRequired={true} options={timeList} value={time} setter={setTime} />
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
        <div className="layout-title">Announcements Panel</div>
        <RadioGroup onChange={setOption} value={option}>
          <Stack direction="row">
            <Radio value="Add" colorScheme="teal" pr="6">
              Add New Announcement
            </Radio>
            <Radio value="View" colorScheme="teal" pr="6">
              View All Announcements
            </Radio>
            <Radio value="Edit" colorScheme="teal" pr="6">
              Edit Existing Announcement
            </Radio>
          </Stack>
        </RadioGroup>
        {option === 'Add' ? AddAnnouncement() : option === 'View' ? ViewAnnouncement() : option === 'Edit' ? EditAnnouncement() : null}
      </div>
    </div>
  )
}

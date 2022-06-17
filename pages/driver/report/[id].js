/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import GoBack from '@/helpers/goback'
import DropDown from '@/components/dropdown'
import TextField from '@/components/input'
import useFetch from '@/hooks/useFetch'
import Notification from '@/components/notification'
import { Button } from '@chakra-ui/react'
import BasicModal from '@/components/basicModal'

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  //& PART 1: Path and Page Data
  const router = useRouter()
  const { id } = router.query //` Doc ID of Bus Owner

  //& PART 2: Panel Sections

  //$ 1: Basic Details
  //@ Data
  const fetchData = useFetch(`operator/${id}`) //` Get Bus Details API
  const data = fetchData?.data //` Response from API

  //@ UI
  function BasicView() {
    return (
      <div className="layout-row-item">
        {/* //$ Bus Owner Title */}
        <div className="layout-sub-title" style={{ color: 'black', width: '40%' }}>
          DRIVER INFO
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {/* //$ Bus Owner Info */}
          <div style={{ width: '100%' }}>
            <div style={{ width: '12vw', height: '12vw', marginTop: '1vw', marginBottom: '2vw', resizeMode: 'cover' }}>
              <img
                alt="No Photo Available"
                src={data?.photo?.url || '/static/svg/user.svg'}
                style={{ width: '12vw', height: '12vw', objectFit: 'cover', borderRadius: '100%', backgroundColor: 'lightgray' }}
              />
            </div>
          </div>
          <TextField type={'show'} title={'Driver Name'} placeholder={'No Name'} value={data?.name} />
          <TextField type={'show'} title={'Phone No'} placeholder={'No Phone'} value={data?.phone} />
          <TextField type={'show'} title={'DOB'} placeholder={'No DOB'} value={data?.DOB?.substring(0, 10)} />
          <TextField type={'show'} title={'PIN'} placeholder={'No Pin'} value={data?.pin} />
        </div>
      </div>
    )
  }

  //$ 2: Control Panel Actions
  function ControlsView() {
    //@ Data
    const ref1 = useRef() //` Modal Ref 1
    const ref2 = useRef() //` Modal Ref 2
    //@ Function 1
    const change1 = () => {
      try {
        alert('Do Something')
      } catch (error) {
        // console.log(error)
      }
    }
    //@ Function 2
    const change2 = () => {
      try {
        alert('Do Something')
      } catch (error) {
        // console.log(error)
      }
    }
    //@ UI

    return (
      <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
        <DropDown title={'Driver Status'} options={[]} value={''} setter={null} />
        <div className="button">
          <Button onClick={() => ref1.current.showAlert()} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
            Modify
          </Button>
          <Notification type={''} />
        </div>
        <BasicModal Head="Warning 1!⚠️" Message="Message 1." ref={ref1} fun={change1} type="warning" />
        {/* <DropDown title={'Control 2'} options={[]} value={''} setter={null} />
        <div className="button">
          <Button onClick={() => ref2.current.showAlert()} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
            Modify
          </Button>
          <Notification type={''} />
        </div>
        <BasicModal Head="Warning 2 ! ⚠️" Message="Message 2." ref={ref2} fun={change2} type="warning" /> */}
      </div>
    )
  }

  //$ 6: View Documents
  function DocumentsView() {
    //@ Data
    const documents = [
      {
        id: '0123',
        name: 'Aadhar Front',
        date: data?.aadharFront?.date,
        url: data?.aadharFront?.url || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
      },
      {
        id: '0123',
        name: 'Aadhar Back',
        date: data?.aadharBack?.date,
        url: data?.aadharBack?.url || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
      },
      {
        id: '0123',
        name: 'Signature',
        date: data?.sign?.date,
        url: data?.sign?.url || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
      },
      {
        id: '0123',
        name: 'Driving License',
        date: data?.drivingLicense?.date,
        url: data?.drivingLicense?.url || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
      },
      {
        id: '0123',
        name: 'Covid Certificate',
        date: data?.covid?.date,
        url: data?.covid?.url || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
      },
    ]
    //@ UI

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {documents.map((doc, i) => {
          return (
            <div
              key={i}
              onClick={() => window.open(doc.url)}
              style={{
                fontSize: '1vw',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: 'teal',
                textDecoration: 'underline',
                padding: '1vw',
                marginLeft: '-1vw',
              }}
            >
              {doc.name}
              <br />
              <span
                style={{
                  fontSize: '0.85vw',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: 'red',
                  textDecoration: 'none',
                  padding: '1vw',
                  marginLeft: '-1vw',
                }}
              >
                {doc?.date?.substring(0, 10) ? `Expiry: ${doc?.date?.substring(0, 10)}` : 'No Date'}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Details
        </div>
        {/* //& 1: Owner Info Left Row */}
        <div className="layout-row" style={{ alignItems: 'flex-start' }}>
          <BasicView />
          {/* //& 2: Notifications Right Row */}
          <div className="layout-row-item">
            <div className="layout-sub-title" style={{ color: 'black' }}>
              CONTROL PANEL
            </div>
            {/* //$ Bus Owner Verified  */}
            <ControlsView />
          </div>
        </div>
        {/* //& 3:  Bus Owner Buses */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {/* //& 6: View Uploaded Documents */}
          <div style={{ width: '100%' }}>
            <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginTop: '1vw', marginBottom: '1vw' }}>
              View Uploaded Documents
            </div>
            <DocumentsView />
          </div>
        </div>
        <br />
      </div>
    </div>
  )
}

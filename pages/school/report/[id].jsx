/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import GoBack from '@/helpers/goback'
import DropDown from '@/components/dropdown'
import TextField from '@/components/input'
import useFetch from '@/hooks/useFetch'
import Notification from '@/components/notification'
import GeneralCard from '@/components/generalcard'
import GeneralTable from '@/components/generaltable'
import GeneralMoney from '@/components/generalmoney'
import { Button } from '@chakra-ui/react'
import BasicModal from '@/components/basicModal'
import getMidPoint from '@/utilities/getMidPoint'
import GoogleMapReact from 'google-map-react'

//& Create & Export School [#FUNCTION#]
export default function Details() {
  //& PART 1: Path and Page Data
  const router = useRouter()
  const { id } = router.query //` Doc ID of Bus Owner

  //& PART 2: Panel Sections

  //$ 1: Basic Details
  //@ Data
  const fetchData = useFetch(`school/${id}?populate=["routes"]`) //` Get Owner Details API
  const data = fetchData?.data //` Response from API

  //@ UI
  function BasicView() {
    return (
      <div className="layout-row-item">
        {/* //$ Bus Owner Title */}
        <div className="layout-sub-title" style={{ color: 'black', width: '40%' }}>
          SCHOOL INFO
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
          <TextField type={'show'} title={'School Name'} placeholder={'No Name'} value={data?.name} />
          <TextField type={'show'} title={'Phone No'} placeholder={'No Phone'} value={data?.phone} />
          <TextField type={'show'} title={'Prefix'} placeholder={'No Password'} value={data?.prefix} />
          <TextField type={'show'} title={'Address'} placeholder={'No Address'} value={data?.location?.address} />
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
        <TextField title={'Change Prefix'} placeholder={'Input Prefix'} />
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

  //$ 5: List of Routes
  //@ UI
  function RoutesView() {
    return (
      <>
        <div style={{ width: '100%' }}>
          <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginTop: '1vw', marginBottom: '1vw' }}>
            Routes going to {data?.name}
          </div>
        </div>
        {/* //@ Show Kids Mapped */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {data?.routes?.map((kid, i) => {
            return <GeneralCard key={i} id={kid.id} page={'route'} first={kid.name} second={kid.morningDeparture} third={kid.cls} />
          })}
        </div>
      </>
    )
  }

  //$ 8: View School on Map
  //@ UI
  function SchoolOnMap() {
    return (
      <div
        className="layout-form"
        style={{ height: '75%', width: '95%', borderRadius: 'var(--chakra-radii-lg)', overflow: 'hidden', marginBottom: '2vw' }}
      >
        {/* //@ Map */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.MAP_KEY, libraries: ['places', 'geometry', 'drawing', 'visualization'] }}
          defaultCenter={{
            lat: data?.location?.coordinates[0] || 0,
            lng: data?.location?.coordinates[1] || 0,
          }}
          defaultZoom={17}
          yesIWantToUseGoogleMapApiInternals={true}
          // onGoogleApiLoaded={drawPath}
        >
          <div lat={data?.location?.coordinates[0] || 0} lng={data?.location?.coordinates[1] || 0} text="School Location">
            <img
              alt="tracking"
              style={{ width: '2.5vw', height: '100%', objectFit: 'contain', transform: 'translate(-50%,-90%)' }}
              src={'/static/svg/tracking.svg'}
            />
          </div>
        </GoogleMapReact>
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
        {/* //& 3: Routes */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <RoutesView />
        </div>
        {/* //& 8: Route Display */}
        <div style={{ width: '100%', marginTop: '2vw' }}>
          <div className="layout-sub-title" style={{ color: 'black', width: '100%', marginBottom: '1vw' }}>
            School Location On Map
          </div>
        </div>
        <SchoolOnMap />
        <br />
      </div>
    </div>
  )
}

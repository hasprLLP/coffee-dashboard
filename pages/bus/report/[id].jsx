/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import GoBack from '@/helpers/goback'
import DropDown from '@/components/dropdown'
import TextField from '@/components/input'
import useFetch from '@/hooks/useFetch'
import Notification from '@/components/notification'
import GeneralCard from '@/components/generalcard'
import { Button } from '@chakra-ui/react'
import BasicModal from '@/components/basicModal'
import getMidPoint from '@/utilities/getMidPoint'
import GoogleMapReact from 'google-map-react'

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  //& PART 1: Path and Page Data
  const router = useRouter()
  const { id } = router.query //` Doc ID of Bus Owner

  //& PART 2: Panel Sections

  //$ 1: Basic Details
  //@ Bus Data
  const fetchData = useFetch(`bus/${id}?populate=["routes"]`) //` Get Bus Details API
  const data = fetchData?.data //` Response from API
  const thisRoute = fetchData?.data?.routes[0]?.id

  //@ Bus Route Data
  const fetchDataRoute = useFetch(`route/${thisRoute}`) //` Get Owner Details API
  const passengersOnBus = fetchDataRoute?.data?.passengers //` Response from API
  const routeMapping = fetchDataRoute?.data //` Response from API

  //@ UI
  function BasicView() {
    return (
      <div className="layout-row-item">
        {/* //$ Bus Owner Title */}
        <div className="layout-sub-title" style={{ color: 'black', width: '40%' }}>
          BUS INFO
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {/* //$ Bus Owner Info */}
          <div style={{ width: '100%' }}>
            <div style={{ width: '12vw', height: '12vw', marginTop: '1vw', marginBottom: '2vw', resizeMode: 'cover' }}>
              <img
                alt="No Photo Available"
                src={data?.photos[0]?.url || '/static/svg/user.svg'}
                style={{ width: '12vw', height: '12vw', objectFit: 'cover', borderRadius: '100%', backgroundColor: 'lightgray' }}
              />
            </div>
          </div>
          <TextField type={'show'} title={'Bus Name'} placeholder={'No Name'} value={data?.name} />
          <TextField type={'show'} title={'RC Number'} placeholder={'No RC'} value={data?.RCNumber} />
          <TextField type={'show'} title={'Commission'} placeholder={'No Commission'} value={data?.commission} />
          <TextField type={'show'} title={'Capacity'} placeholder={'No Capacity'} value={data?.capacity} />
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
        <DropDown title={'Change Owner'} options={[]} value={''} setter={null} />
        <div className="button">
          <Button onClick={() => ref1.current.showAlert()} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
            Modify
          </Button>
          <Notification type={''} />
        </div>
        <BasicModal Head="Warning 1!⚠️" Message="Message 1." ref={ref1} fun={change1} type="warning" />
        {/* <DropDown title={"Control 2"} options={[]} value={""} setter={null} />
        <div className="button">
          <Button onClick={() => ref2.current.showAlert()} colorScheme="teal" size="md" isFullWidth isLoading={false} loadingText="Submitting">
            Modify
          </Button>
          <Notification type={""} />
        </div>
        <BasicModal Head="Warning 2 ! ⚠️" Message="Message 2." ref={ref2} fun={change2} type="warning" /> */}
      </div>
    )
  }

  //$ 5: List of Students
  //@ UI
  function StudentsView() {
    return (
      <>
        <div style={{ width: '100%' }}>
          <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginTop: '1vw', marginBottom: '1vw' }}>
            Students under {data?.name}
          </div>
        </div>
        {/* //@ Show Kids Mapped */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {passengersOnBus?.map((kid, i) => {
            return <GeneralCard key={i} id={kid.id} page={'passenger'} first={kid.name} second={kid.passengerID} third={kid.cls} />
          })}
        </div>
      </>
    )
  }

  //$ 6: View Documents
  function DocumentsView() {
    //@ Data
    const documents = [
      {
        id: '0123',
        name: 'RC Photo',
        date: data?.RCPhoto?.date,
        url: data?.RCPhoto?.url || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
      },
      {
        id: '0123',
        name: 'Permit Photo',
        date: data?.permitPhoto?.date,
        url: data?.permitPhoto?.url || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
      },
      {
        id: '0123',
        name: 'PUC Photo',
        date: data?.pucPhoto?.date,
        url: data?.pucPhoto?.url || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
      },
      {
        id: '0123',
        name: 'Fitness Photo',
        date: data?.fitnessPhoto?.date,
        url: data?.fitnessPhoto?.url || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
      },
      {
        id: '0123',
        name: 'Insurance Photo',
        date: data?.insurancePhoto?.date,
        url: data?.insurancePhoto?.url || 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
      },
    ]
    //@ UI

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {documents.map((doc, i) => {
          return (
            <>
              <div
                key={i}
                onClick={() => window.open(doc.url)}
                style={{
                  fontSize: '1vw',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: 'teal',
                  textDecoration: 'underline',
                  padding: '2vw',
                  marginLeft: '-2vw',
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
            </>
          )
        })}
      </div>
    )
  }

  //$ 8: View Route
  //@ UI
  function RouteView() {
    const [routeTime, setRouteTime] = useState('Morning')

    const routeMapped =
      routeTime === 'Morning'
        ? routeMapping?.upTrace?.map(path => {
            return { lat: path.coordinates[0], lng: path.coordinates[1], passenger: path.passenger || 'OK' }
          })
        : routeMapping?.downTrace?.map(path => {
            return { lat: path.coordinates[0], lng: path.coordinates[1], passenger: path.passenger || 'OK' }
          })

    //@ Function To Draw Path
    const drawPath = google => {
      var flightPath = new google.maps.Polyline({
        path: routeMapped,
        geodesic: true,
        strokeColor: '#38b2ac',
        strokeOpacity: 0.3,
        strokeWeight: 7,
      })

      flightPath.setMap(google.map)
    }

    //@ Get Middle Point of All Students
    const { midLat, midLng } = getMidPoint(routeMapped)

    return (
      <div
        className="layout-form"
        style={{
          height: '45vw',
          width: '95%',
          borderRadius: 'var(--chakra-radii-lg)',
          overflow: 'hidden',
          marginBottom: '2vw',
        }}
      >
        <DropDown title={'Choose Morning or Evening Route'} options={['Morning', 'Evening']} value={routeTime || 'Morning'} setter={setRouteTime} />
        {/* //@ Map */}
        {routeMapped?.length ? (
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.MAP_KEY, libraries: ['places', 'geometry', 'drawing', 'visualization'] }}
            defaultCenter={{
              lat: midLat || 0,
              lng: midLng || 0,
            }}
            defaultZoom={18}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={drawPath}
          >
            {/* //@ Students on Map */}
            {passengersOnBus?.map((route, i) => {
              return route?.location ? (
                <div key={i} lat={route.location.coordinates[0]} lng={route.location.coordinates[1]} text="My Marker">
                  <img
                    alt="tracking"
                    style={{ width: '2.5vw', height: '100%', objectFit: 'contain', transform: 'translate(-50%,-90%)' }}
                    src={'/static/svg/tracking.svg'}
                  />
                </div>
              ) : null
            })}
          </GoogleMapReact>
        ) : (
          <>
            <br />
            <div className="layout-sub-title" style={{ width: '100%', height: 'auto', color: 'black', marginTop: '1vw', marginLeft: '1vw' }}>
              Route Not Available Yet
            </div>
          </>
        )}
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
        {/* //& 3:  Students */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <StudentsView />
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {/* //& 6: View Uploaded Documents */}
          <div style={{ width: '100%' }}>
            <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginTop: '1vw', marginBottom: '1vw' }}>
              View Uploaded Documents
            </div>
            <DocumentsView />
          </div>
        </div>
        {/* //& 8: Route Display */}
        <div style={{ width: '100%', marginTop: '2vw' }}>
          <div className="layout-sub-title" style={{ color: 'black', width: '100%', marginBottom: '1vw' }}>
            Route On Map
          </div>
        </div>
        <RouteView />
        <br />
        <br />
      </div>
    </div>
  )
}

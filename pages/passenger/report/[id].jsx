/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import GoBack from '@/helpers/goback'
import DropDown from '@/components/dropdown'
import TextField from '@/components/input'
import Notification from '@/components/notification'
import { Button } from '@chakra-ui/react'
import axios from 'axios'
import useFetch from '@/hooks/useFetch'
import BasicModal from '@/components/basicModal'
import getMidPoint from '@/utilities/getMidPoint'
import GeneralCard from '@/components/generalcard'
import GeneralTable from '@/components/generaltable'
import GeneralMoney from '@/components/generalmoney'
import GoogleMapReact from 'google-map-react'
import CollectFee from '@/components/collectFee'
import sendNotification from '@/components/sendNotification'

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  //& PART 1: Path and Page Data
  const router = useRouter()
  const { id } = router.query //` Doc ID of Bus Owner

  //$ 1: Basic Details
  //@ Data
  const fetchData = useFetch(`passenger/${id}`) //` Get Bus Details API
  const freshData = fetchData?.data //` Response from API
  const [data, setData] = useState([])
  useEffect(() => {
    if (freshData) {
      setData(freshData)
    }
  }, [freshData])

  //$ Page States
  const [package_, setPackage] = useState({})
  const [packages, setPackages] = useState([])
  const [packageNames, setPackageNames] = useState([])
  const [route, setRoute] = useState({})
  const [routes, setRoutes] = useState([])
  const [routeNames, setRouteNames] = useState([])
  const fcmToken = data?.appUser?.fcmToken

  //& Get All Dropdowns Data
  useEffect(() => {
    //@ 1: Fetch Packages
    const getPackages = async () => {
      try {
        const response = await axios.get(`package`)
        setPackages(response.data.data)
        const tempPackageNames = []
        response.data.data.map(bus => {
          tempPackageNames.push(bus.name)
        })
        setPackageNames(tempPackageNames)
      } catch (error) {
        console.log('Error while fetching Packages: ', error)
      }
    }

    //@ 2: Fetch Routes <with school>
    const getRoutes = async () => {
      try {
        const response = await axios.get(`route?school=${data?.school?.id}`)
        setRoutes(response?.data?.data)
        let tempRoutesName = []
        response?.data?.data?.map(route => {
          tempRoutesName.push(route.name)
        })
        setRouteNames(tempRoutesName)
        window.scrollTo(0, 0)
      } catch (error) {
        console.log('Error while fetching Routes', error)
      }
    }

    getPackages()
    if (data?.school?.id) {
      getRoutes()
    }
  }, [data?.school?.id])

  //& Control Panel
  function ControlPanel() {
    const setPackageID = packageName => {
      const packageObj = packages?.find(_package => _package?.name === packageName)
      setPackage(packageObj)
    }

    const setRouteID = routeName => {
      const routeObj = routes?.find(route => route?.name === routeName)
      setRoute(routeObj)
    }

    const routeField = {
      title: '',
      options: routeNames,
      value: route?.name,
      setter: setRouteID,
      type: 'dropdown',
    }

    const feePackageField = {
      title: '',
      options: packageNames,
      value: package_?.name,
      setter: setPackageID,
      type: 'dropdown',
    }

    const [routeLoading, setRouteLoading] = useState(false)
    const [unsetRouteLoading, setUnsetRouteLoading] = useState(false)
    const [packageLoading, setPackageLoading] = useState(false)
    const [unsetPackageLoading, setUnsetPackageLoading] = useState(false)
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [extendDueDateLoading, setExtendDueDateLoading] = useState(false)

    const assignRoute = async () => {
      setRouteLoading(true)
      try {
        const res = await axios.post(`passenger/assign_route/${data.id}?route=${route.id}`)
        setData(data => ({ ...data, route: res.data.data }))
        sendNotification(
          {
            title: 'Congratulations',
            body: `${data?.name} been assigned a new route`,
            android_channel_id: 'notification',
            image: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg',
            data: {
              code: 0,
            },
          },
          [fcmToken]
        )
        setRouteLoading(false)
      } catch (error) {
        // console.log(error)
        setRouteLoading(false)
      }
    }

    const UnassignRoute = async () => {
      setUnsetRouteLoading(true)
      try {
        await axios.delete(`passenger/assign_route/${data.id}`)
        setData(data => ({ ...data, route: null }))

        setUnsetRouteLoading(false)
      } catch (error) {
        // console.log(error)
        setUnsetRouteLoading(false)
      }
    }

    const assignPackage = async () => {
      setPackageLoading(true)
      try {
        const res = await axios.post(`passenger/assign_fee_package/${data.id}?fee_package=${package_.id}`)
        setData(data => ({ ...data, feePackage: res.data.data }))
        sendNotification(
          {
            title: 'Congratulations',
            body: `${data?.name} been assigned ${res.data.data.name}`,
            android_channel_id: 'notification',
            image: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg',
            data: {
              code: 0,
            },
          },
          [fcmToken]
        )
        setPackageLoading(false)
      } catch (error) {
        // console.log(error)
        setPackageLoading(false)
      }
    }

    const UnassignPackage = async () => {
      setUnsetPackageLoading(true)
      try {
        await axios.delete(`passenger/assign_fee_package/${data.id}`)
        setData(data => ({ ...data, feePackage: null }))

        setUnsetPackageLoading(false)
      } catch (error) {
        // console.log(error)
        setUnsetPackageLoading(false)
      }
    }

    const verifyPassenger = async () => {
      setVerifyLoading(true)

      try {
        const res = await axios.post(`passenger/verify/${data.id}`)
        setData(data => ({ ...data, isVerified: res.data.data }))
        sendNotification(
          {
            title: `Congratulations ${data?.name}`,
            body: `Make Payment and Let's Start your child's new Journey`,
            android_channel_id: 'notification',
            image: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg',
            data: {
              code: 0,
            },
          },
          [fcmToken]
        )
        setVerifyLoading(false)
      } catch (error) {
        // console.log(error)
        setVerifyLoading(false)
      }
    }

    const extendDueDate = async () => {
      setExtendDueDateLoading(true)
      if (!dueDateChange) {
        alert('Please Enter Due Date')
      }
      try {
        const res = await axios.post(`passenger/extend_due_date/${data.id}?due_date=${dueDateChange}`)

        setData(data => ({ ...data, dueDate: res.data.data }))

        setExtendDueDateLoading(false)
      } catch (error) {
        // console.log(error)
        setExtendDueDateLoading(false)
      }
    }

    //$ Due date
    const [dueDateChange, setDueDateChange] = useState()

    //$ Accept Payment
    const pendingCashRequests = useFetch(`payment/${data?.paymentRequest}`)
    // console.log('going', data)

    const acceptPayment = async () => {
      try {
        const response = await axios.post(`payment/${data?.paymentRequest}`, {
          deposit: pendingCashRequests?.data?.bill?.total,
        })

        sendNotification(
          {
            title: `Congratulations ${data?.name}`,
            body: `Payment has been processed and you can now Track Bus, View Attendance and make payments Online`,
            android_channel_id: 'notification',
            data: {
              code: 0,
            },
          },
          [fcmToken]
        )
        setData(null) //! Testing Fix if Works Keeping Else Remove
        // console.log(response)
      } catch (error) {
        // console.log(error)
      }
    }

    //$ Modal
    const onOpenRoute = useRef()
    const onOpenPackage = useRef()
    const onOpenVerify = useRef()
    const onOpenPayment = useRef()

    return (
      <div className="layout-row-item">
        <div className="layout-sub-title" style={{ color: 'black' }}>
          NOTIFICATIONS PANEL
        </div>
        {/* //$ Students Verified Route  */}
        <div>
          <b>
            Assign Route <span style={{ color: 'red' }}>{!data?.route ? '??????' : ''}</span>
          </b>
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <div style={{ color: 'gray', width: '100%', marginTop: '0.5vw' }}>
            Current Route - <span style={{ color: 'teal' }}>{data?.route?.name ? data?.route?.name : 'Nothing'}</span>
          </div>
          <DropDown title={routeField.title} options={routeField.options} value={routeField.value} setter={routeField.setter} />
          <div className="button" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={assignRoute} size="md" isLoading={routeLoading} loadingText="">
              ??????
            </Button>
            {data?.route ? (
              <Button
                onClick={() => {
                  onOpenRoute.current.showAlert()
                }}
                size="md"
                isLoading={unsetRouteLoading}
                loadingText=""
              >
                ???
              </Button>
            ) : null}
            <Notification type={''} />
          </div>
        </div>
        {/* //$ Package Assign */}
        <div>
          <b>
            Assign Package <span style={{ color: 'red' }}>{!data?.feePackage ? '??????' : ''}</span>
          </b>
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <div style={{ color: 'gray', width: '100%', marginTop: '0.5vw' }}>
            Current Package : <span style={{ color: 'teal' }}>{data?.feePackage?.name ? data?.feePackage?.name : 'Nothing'}</span>
          </div>
          <DropDown title={feePackageField.title} options={feePackageField.options} value={feePackageField.value} setter={feePackageField.setter} />
          <div className="button" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={assignPackage} size="md" isLoading={packageLoading} loadingText="Submitting">
              ??????
            </Button>
            {data?.feePackage ? (
              <Button
                onClick={() => {
                  onOpenPackage.current.showAlert()
                }}
                size="md"
                isLoading={unsetPackageLoading}
                loadingText=""
              >
                ???
              </Button>
            ) : null}
            <Notification type={''} />
          </div>
        </div>
        {/* //$ Due Date Change */}
        <div>
          <b>Payment Info</b>
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <div style={{ color: 'red', width: '100%', marginBottom: '2vw' }}>
            {data?.activeTransaction ? `Due date is ${data?.activeTransaction?.dueDate?.substring(0, 10)}` : 'No Active Transaction'}
          </div>
        </div>
        {/* //$Verify Passenger */}
        <div>
          <b>Passenger Status</b>
          <span style={{ color: 'red' }}>{!data?.feePackage ? '??????' : ''}</span>
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <div className="button" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1vw' }}>
            {data?.isVerified ? (
              <Button
                onClick={() => {
                  onOpenVerify.current.showAlert()
                }}
                colorScheme="red"
                size="md"
                isLoading={verifyLoading}
                loadingText="Verifing"
                isFullWidth
              >
                Unverify
              </Button>
            ) : (
              <Button onClick={verifyPassenger} colorScheme="teal" size="md" isFullWidth isLoading={verifyLoading} loadingText="Unverifing">
                Verify
              </Button>
            )}
            <Notification type={''} />
          </div>
        </div>
        {/* //$ Accept Payment */}
        <div>
          <b>Accept Payment</b>
        </div>
        <div style={{ width: '100%' }}>
          {pendingCashRequests?.data && !pendingCashRequests?.data?.isResolved ? (
            <CollectFee type={'solo'} item={pendingCashRequests?.data} student={data} onButton={() => onOpenPayment.current.showAlert()} />
          ) : (
            <div style={{ color: 'red', width: '100%', marginBottom: '2vw' }}>No New Fees Yet</div>
          )}
        </div>
        <BasicModal
          Head="Warning Removing Route! ??????"
          Message="Passenger no longer will be able to use Application."
          ref={onOpenRoute}
          fun={UnassignRoute}
          type="warning"
        />
        <BasicModal
          Head="Warning Removing Fee Package ! ??????"
          Message="Passenger no longer will be able to use Application."
          ref={onOpenPackage}
          fun={UnassignPackage}
          type="warning"
        />
        <BasicModal
          Head="Warning Passenger Unverifying  ! ??????"
          Message="Passenger no longer will be able to use Application."
          ref={onOpenVerify}
          fun={verifyPassenger}
          type="warning"
        />
        <BasicModal
          Head="Verify as Payment Received!"
          Message="Please Make Sure Money is Received Before Continuing."
          ref={onOpenPayment}
          fun={acceptPayment}
          type="warning"
        />
      </div>
    )
  }

  //$ 2: List of Buses
  function BusesView() {
    return (
      <>
        {data?.route?.bus?.id ? (
          <>
            <div style={{ width: '100%' }}>
              <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginBottom: '1vw' }}>
                {data?.name}&apos;s Bus
              </div>
            </div>
            <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
              <GeneralCard
                id={data?.route?.bus?.id}
                page={'bus'}
                first={data?.route?.bus?.name}
                second={data?.route?.bus?.RCNumber}
                third={data?.route?.bus?.commission}
              />
            </div>
          </>
        ) : (
          <div className="layout-sub-title" style={{ color: 'black', width: '100%', marginBottom: '1vw' }}>
            Bus not assigned Yet
          </div>
        )}
      </>
    )
  }

  //$ 7: Previous Transactions
  function PreviousTransactions() {
    //@ Data
    const fetchDataTrans = useFetch(`transaction?passenger=${id}`) //` Get Owner Details API
    const dataTrans = fetchDataTrans?.data //` Response from API
    console.log('Table : ', dataTrans)
    const dataTransMap = dataTrans?.map((item, i) => {
      return {
        id: i,
        clf: item?.withCLF ? 'CLF' : 'NO CLF',
        total: item?.noDiscountAmount,
        discount: item?.discount,
        amount: item?.amount,
        invoice: item?.invoice,
        mode: item?.mode?.toUpperCase(),
        pack: item?.pack?.toUpperCase(),
        date: item?.payDate?.substring(0, 10),
      }
    })
    // const fetchDataClf = useFetch(`clf_transaction?passenger=${id}`) //` Get Owner Details API
    // const dataClf = fetchDataClf?.data //` Response from API

    //@ Columns
    const tableColumn = [
      { title: 'SNo', field: 'id' },
      { title: 'CLF', field: 'clf' },
      { title: 'Total', field: 'total' },
      { title: 'Discount', field: 'discount' },
      { title: 'Amount', field: 'amount' },
      { title: 'Invoice', field: 'invoice' },
      { title: 'Mode', field: 'mode' },
      { title: 'Pack', field: 'pack' },
      { title: 'Date', field: 'date' },
    ]

    return (
      <div style={{ width: '100%' }}>
        <div className="layout-sub-title" style={{ color: 'black', width: '40%', marginTop: '2vw' }}>
          Previous Transactions
        </div>
        <GeneralTable title="Transactions" data={dataTransMap} column={tableColumn} />
      </div>
    )
  }

  //$ 8: View Boarding Point
  //@ UI
  function RouteView() {
    return (
      <div
        className="layout-form"
        style={{
          height: '45vw',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '95%',
          borderRadius: 'var(--chakra-radii-lg)',
          overflow: 'hidden',
          marginBottom: '2vw',
        }}
      >
        {/* //@ Map */}
        {data?.location?.coordinates[0] !== 0 ? (
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.MAP_KEY }}
            defaultCenter={{
              lat: data?.location?.coordinates[0] || 0,
              lng: data?.location?.coordinates[1] || 0,
            }}
            defaultZoom={17}
            yesIWantToUseGoogleMapApiInternals={true}
            // onGoogleApiLoaded={drawPath}
          >
            <div lat={data?.location?.coordinates[0] || 0} lng={data?.location?.coordinates[1] || 0} text="Boarding Point">
              <img
                alt="tracking"
                style={{ width: '2.5vw', height: '100%', objectFit: 'contain', transform: 'translate(-50%,-90%)' }}
                src={'/static/svg/tracking.svg'}
              />
            </div>
          </GoogleMapReact>
        ) : (
          <>
            <br />
            <div className="layout-sub-title" style={{ width: '100%', height: 'auto', color: 'black', marginTop: '1vw', marginLeft: '1vw' }}>
              Boarding Not Set Yet By Operator or Admin
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
        {/* //& Students Info Left Row */}
        <div className="layout-row" style={{ alignItems: 'flex-start' }}>
          <div className="layout-row-item" style={{ flex: 1.25 }}>
            <div className="layout-sub-title" style={{ color: 'black', width: '40%' }}>
              STUDENT INFO
            </div>
            <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
              {/* //$ Student Info */}
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    width: '12vw',
                    height: '12vw',
                    marginTop: '1vw',
                    marginBottom: '2vw',
                  }}
                >
                  <img
                    alt="No Photo Available"
                    src={data?.photo?.url || '/static/svg/user.svg'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '100%',
                    }}
                  />
                </div>
              </div>
              <TextField type={'show'} title={'Student Name'} placeholder={'No Name'} value={data?.name} />
              <TextField type={'show'} title={'Student ID'} placeholder={'No ID'} value={data?.passengerID} />
              <TextField type={'show'} title={'Student Address'} placeholder={'No Address'} value={data?.location?.address} />
              <TextField type={'show'} title={'Student DOB'} placeholder={'No DOB'} value={data?.DOB?.substring(0, 10)} />
            </div>
            {/* //$ School Details */}
            <div className="layout-sub-title">School Details</div>
            <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
              <TextField type={'show'} title={'School Name'} placeholder={'No School'} value={data?.school?.name} />
            </div>
            {/* //$ Package */}
            <div className="layout-sub-title">Package Information</div>
            <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
              <TextField type={'show'} title={'Package'} placeholder={'No Package'} value={data?.feePackage?.name || 'No Package'} />
              <TextField type={'show'} title={'Duration'} placeholder={'No Duration'} value={data?.activeTransaction?.pack?.toUpperCase()} />
              <TextField type={'show'} title={'Amount'} placeholder={'No Duration'} value={data?.activeTransaction?.amount} />
            </div>
          </div>
          {/* //& Notifications Right Row */}
          <ControlPanel />
        </div>
        {/* //& 3:  Bus Owner Buses */}
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          <BusesView />
          {/* //& 7: Previous Transactions */}
          <PreviousTransactions />
        </div>
        {/* //& 8: Route Display */}
        <div style={{ width: '100%', marginTop: '2vw' }}>
          <div className="layout-sub-title" style={{ color: 'black', width: '100%', marginBottom: '1vw' }}>
            Student Boarding Point
          </div>
        </div>
        <RouteView />
        <br />
      </div>
    </div>
  )
}

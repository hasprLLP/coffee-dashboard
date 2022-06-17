//& Input Components [#IMPORTS#]
import TextField from '@/components/input'
import DropDown from '@/components/dropdown'
import FilePicker from '@/components/filepicker'
import UpdateButton from '@/components/updateButton'
import DeleteButton from '@/components/deleteButton'
import GoBack from '@/helpers/goback'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { format } from 'date-fns'

//& Create & Export Driver [#FUNCTION#]
export default function EditPassenger() {
  const router = useRouter()

  const { id } = router.query
  const [data, setData] = useState()

  const [name, setName] = useState()
  const [isStudent, setIsStudent] = useState(true)
  const [DOB, setDOB] = useState()
  const [gender, setGender] = useState('Male')
  const [joiningDate, setJoiningDate] = useState()
  const [dueDate, setDueDate] = useState()
  const [guardian, setGuardian] = useState()
  const [phone, setPhone] = useState()
  const [landline, setLandline] = useState()
  const [address, setAddress] = useState()
  const [location, setLocation] = useState()
  const [school, setSchool] = useState({})
  const [schools, setSchools] = useState([])
  const [schoolNames, setSchoolNames] = useState([])
  const [route, setRoute] = useState({})
  const [routes, setRoutes] = useState([])
  const [routeNames, setRouteNames] = useState([])
  const [photo, setPhoto] = useState({})
  const [amount, setAmount] = useState(0)
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [cls, setCls] = useState()
  const [section, setSection] = useState('A')
  const [passengerID, setPassengerID] = useState()
  const [package_, setPackage] = useState({})
  const [packages, setPackages] = useState([])
  const [packageNames, setPackageNames] = useState([])

  // console.log('Current POack', package_)

  const [pack, setPack] = useState([])
  const [clean, setClean] = useState(true)

  const packType = ['annually', 'monthly', 'halfYearly', 'quarterly']

  const getPackages = useCallback(async () => {
    try {
      const response = await axios.get(`package`)
      // console.log(response.data.data)
      setPackages(response.data.data)
      const tempPackageNames = []
      response.data.data.map(bus => {
        tempPackageNames.push(bus.name)
      })
      setPackageNames(tempPackageNames)
    } catch (error) {
      // console.log('Error while fetching Packages: ', error)
    }
  }, [])
  const setPackageID = packageName => {
    const packageObj = packages?.find(_package => _package?.name === packageName)
    setPackage(packageObj)
  }

  const classesList = [
    'Pre-School',
    'Nursery',
    'LKG',
    'UKG',
    'Class I (1)',
    'Class II (2)',
    'Class III (3)',
    'Class IV (4)',
    'Class V (5)',
    'Class VI (6)',
    'Class VII (7)',
    'Class VIII (8)',
    'Class IX (9)',
    'Class X (10)',
    'Class XI (11)',
    'Class XII (12)',
  ]
  useEffect(() => {
    if (router.query.data) {
      const data = JSON.parse(router.query.data)
      const DOB = data?.DOB?.split('T') || ''
      const joiningDate = data?.joiningDate?.split('T') || ''
      const dueDate = data?.payDate?.split('T') || ''

      console.log('dob', DOB)

      setIsStudent(data?.isStudent)
      setDOB(DOB[0])
      setGender(data?.gender)
      setSection(data?.section)
      setPackage(data?.feePackage)
      setPack(data?.pack)
      setPassengerID(data?.passengerID)
      setName(data?.name)
      setJoiningDate(joiningDate[0])
      setLocation(data?.location)
      setDueDate(dueDate[0])
      setGuardian(data?.appUser?.name)
      setPhone(data?.appUser?.phone)
      setLandline(data?.appUser?.whatsapp)
      setAddress(data?.location?.address)
      setSchool(data?.school)
      setRoute(data?.route)
      setPhoto(data?.photo)
      setAmount(data?.lastTransaction?.amount)
      setCls(data?.cls)
    }
  }, [router.query.data])

  const getSchools = async () => {
    try {
      const response = await axios.get(`school/`)
      setSchools(response.data.data)
      const tempSchoolNames = []
      response.data.data.map(school => {
        tempSchoolNames.push(school.name)
      })
      setSchoolNames(tempSchoolNames)
    } catch (error) {
      // console.log('School Error', error)
    }
  }
  const getRoutes = async () => {
    try {
      const response = await axios.get(`route${school.id ? `?school=${school?.id}` : ''}`)
      setRoutes(response.data.data)
      const tempRoutesName = []
      response.data.data.map(route => {
        tempRoutesName.push(route.name)
      })
      setRouteNames(tempRoutesName)
    } catch (error) {
      // console.log('error', error)
    }
  }

  const setSchoolID = schoolName => {
    const schoolObj = schools?.find(school => school?.name === schoolName)
    setSchool(schoolObj)
  }
  const setRouteID = routeName => {
    const routeObj = routes?.find(route => route?.name === routeName)
    setRoute(routeObj)
  }

  useEffect(() => {
    getSchools()
    getPackages()
  }, [])

  useEffect(() => {
    getRoutes()
  }, [school])

  useEffect(() => {
    if (pack && package_ && joiningDate) {
      const { monthly, annually, halfYearly, quarterly } = package_
      const dueDate = new Date(joiningDate)
      dueDate.setDate(10)

      if (pack === 'monthly') {
        setDiscount(0)
        setAmount(monthly)
        // Extend date by one month
        dueDate.setMonth(dueDate.getMonth() + 1)
      } else if (pack === 'annually') {
        setDiscount(monthly * 12 - annually)
        setAmount(monthly * 12)
        dueDate.setMonth(dueDate.getMonth() + 12)
      } else if (pack === 'halfYearly') {
        setDiscount(monthly * 6 - halfYearly)
        setAmount(monthly * 6)
        dueDate.setMonth(dueDate.getMonth() + 6)
      } else if (pack === 'quarterly') {
        setDiscount(monthly * 3 - quarterly)
        setAmount(monthly * 3)
        dueDate.setMonth(dueDate.getMonth() + 3)
      }
      const formattedDueDate = format(dueDate, 'dd-MM-yyyy')
      setDueDate(formattedDueDate)
    }
  }, [pack, package_, joiningDate])

  useEffect(() => {
    setTotal(amount - discount)
  }, [amount, discount])

  //$ States and Hooks [#STATES#]
  const basicFields = [
    { title: 'Name', isRequired: true, placeholder: 'Enter Passenger name', value: name, setter: setName },
    { title: 'Passenger ID', isRequired: true, placeholder: 'Enter Passenger ID', value: passengerID, setter: setPassengerID },
    { title: 'Upload Photo', value: photo, setter: setPhoto, type: 'upload' },
    { title: 'Gender', isRequired: true, options: ['Male', 'Female'], value: gender, setter: setGender, type: 'dropdown' },
    { title: 'Date of Birth', type: 'date', placeholder: 'eg 02/07/2003', value: DOB, setter: setDOB },
  ]

  const guardianDetails = [
    { title: 'Guardian Name', isRequired: true, placeholder: 'Father/Mother etc', value: guardian, setter: setGuardian },
    {
      title: 'Guardian Mobile',
      isRequired: true,
      placeholder: 'Parent Contact No',
      value: phone,
      setter: setPhone,
      type: 'tel',
      prefix: '+91',
    },
    { title: 'Whatsapp (Optional)', placeholder: 'Whatsapp no', value: landline, setter: setLandline, type: 'tel' },
  ]

  const boardingDetails = [
    { title: 'Full Address', isRequired: true, placeholder: 'Boarding Point Address', value: address, setter: setAddress },
    {
      title: 'School',
      isRequired: true,
      page: '/school/add',
      options: schoolNames,
      value: school?.name,
      setter: setSchoolID,
      type: 'dropdown',
    },
    { title: 'Route', isRequired: true, options: routeNames, type: 'number', value: route?.name, setter: setRouteID, type: 'dropdown' },
  ]
  // console.log(pack)

  const feeDetails = [
    { title: 'Select Package', isRequired: true, options: packageNames, value: package_?.name, setter: setPackageID, type: 'dropdown' },
    { title: 'Select Duration', isRequired: true, options: packType, value: pack, setter: setPack, type: 'dropdown' },
    { title: 'Joining Date', type: 'date', placeholder: 'eg 02/07/2003', value: joiningDate, setter: setJoiningDate },
  ]
  //& Return UI [#RETURN#]
  return (
    <div className="home">
      <div className="home-shift">
        <div className="layout-title">
          <GoBack />
          Edit {isStudent ? 'Student' : 'Teacher'}
        </div>
        <div className="layout-sub-title">{isStudent ? 'Student' : 'Teacher'} Details</div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {!isStudent ? (
            <TextField type={'tel'} title={'Mobile'} placeholder={'Contact No'} value={phone} setter={setPhone} prefix={'+91'} isRequired={true} />
          ) : null}
          {basicFields.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} type={item.type} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                key={i}
                type={item.type}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                setter={item.setter}
                prefix={item.prefix}
                isRequired={item.isRequired}
              />
            )
          })}
          {!isStudent ? (
            <TextField type={'tel'} title={'Landline (Optional)'} placeholder={'Landline no'} value={landline} setter={setLandline} />
          ) : null}
          {isStudent ? <DropDown title={'Class'} options={classesList} value={cls} setter={setCls} /> : null}
          {isStudent ? <TextField title={'Section'} placeholder={'Enter Section'} value={section} setter={setSection} /> : null}
        </div>
        {isStudent ? (
          <>
            <div className="layout-sub-title">Guardian Details</div>
            <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
              {guardianDetails.map((item, i) => {
                return item.type === 'dropdown' ? (
                  <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
                ) : item.type === 'upload' ? (
                  <FilePicker title={item.title} value={item.value} setter={item.setter} />
                ) : (
                  <TextField
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
          </>
        ) : null}
        <div className="layout-sub-title">Boarding Details</div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {boardingDetails.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown
                key={i}
                title={item.title}
                fix={item.fix}
                options={item.options}
                value={item.value}
                setter={item.setter}
                isRequired={item.isRequired}
              />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                key={i}
                type={item.type}
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
        <div className="layout-sub-title">Fee Details</div>
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {feeDetails.map((item, i) => {
            return item.type === 'dropdown' ? (
              <DropDown key={i} title={item.title} options={item.options} value={item.value} setter={item.setter} />
            ) : item.type === 'upload' ? (
              <FilePicker title={item.title} value={item.value} setter={item.setter} />
            ) : (
              <TextField
                key={i}
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
            collection={`passenger/${id}`}
            data={{
              name,
              phone,
              photo,
              DOB,
              landline,
              route: route?.id,
              school: school?.id,
              location: {
                type: 'Point',
                coordinates: location?.coordinates || [0, 0],
                address: address,
              },
              amount,
              isStudent,
              cls,
              joiningDate,
              dueDate,
              guardian: {
                name: guardian,
              },
            }}
          />
          <DeleteButton

          // data={{ name, busNumber, capacity }}
          />
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import Logout from '@/utilities/logout'
import DashCard from '@/components/dashcard'
import VerifyStudent from '@/components/verifyStudent'
import CollectFee from '@/components/collectFee'
import axios from 'axios'
import TextField from '@/components/input'
import DropDown from '@/components/dropdown'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [counts, setCounts] = useState({})
  const [unverifiedPassengers, setUnverifiedPassengers] = useState([])
  const [pendingCashRequests, setPendingCashRequests] = useState([])
  const getCounts = async () => {
    try {
      const response = await axios.get('details/counts')
      setCounts(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getUnverified = async () => {
    try {
      const response = await axios.get('details/unverified_passengers')
      setUnverifiedPassengers(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getPendingPaymentRequests = async () => {
    try {
      const response = await axios.get('details/get_pending_payment_request')
      setPendingCashRequests(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCounts()
    getUnverified()
    getPendingPaymentRequests()
  }, [])

  const onButton = (id, data) => {
    router.push({ pathname: `/passenger/report/${id}`, query: { data: JSON.stringify(data) } })
  }

  //$ States and Hooks [#STATES#]
  const [test, settest] = useState()
  const timing = [
    {
      title: 'Bus Starts (Morning)',
      type: 'time',
      placeholder: 'Time of departure in morning',
      value: test,
      setter: settest,
    },
    {
      title: 'Bus Reaches School (Morning)',
      type: 'time',
      placeholder: 'Time of arrival at school in morning',
      value: test,
      setter: settest,
    },
    {
      title: 'Bus Leaves School (Evening)',
      type: 'time',
      placeholder: 'Time of departure in evening',
      value: test,
      setter: settest,
    },
  ]

  return (
    <div className="home" style={{ backgroundColor: 'var(--chakra-colors-gray-100)' }}>
      <div className="dashboard">
        <div className="dashboard-title">Dashboard</div>
        <div className="dashboard-cards">
          <DashCard title="Students" path="/passenger" no={counts.passenger_count} />
          <DashCard title="Bus Owners" path="/redeem" no={counts.owner_count} />
          <DashCard title="Buses" path="/bus" no={counts.bus_count} />
          <DashCard title="Drivers" path="/driver" no={counts.operator_count} />
          <DashCard title="Schools" path="/school" no={counts.school_count} />
          <DashCard title="Packages" path="/package" no={counts.package_count} />
          <DashCard title="Routes" path="/route" no={counts.route_count} />
          <DashCard title="Users" path="/passenger" no={counts.user_count} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="dashboard-verify">
            <div className="dashboard-subtitle">Verify Students & Assign Bus</div>
            {unverifiedPassengers.length > 0
              ? unverifiedPassengers.map((item, index) => {
                  return <VerifyStudent key={index} student={item} onButton={onButton} />
                })
              : 'No Pending Verifications'}
          </div>
          <div className="dashboard-verify">
            <div className="dashboard-subtitle">Verify Fee Payment</div>
            {pendingCashRequests.length > 0
              ? pendingCashRequests.map((item, index) => {
                  return <CollectFee key={index} item={item} />
                })
              : 'No pending requests'}
          </div>
        </div>
        <div className="dashboard-subtitle">Other Settings</div>
        <Logout />
      </div>
    </div>
  )
}

import { useState, useLayoutEffect } from 'react'
import Logout from '@/utilities/logout'
import BigCard from '@/components/dashcard'
import VerifyStudent from '@/components/verifyStudent'
import CollectFee from '@/components/collectFee'
import useFetch from '@/hooks/useFetch'
import Loading from '@/blocks/loading'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const router = useRouter()

  const counts = useFetch(`details/counts`)
  const unverifiedPassengers = useFetch(`details/unverified_passengers`)
  const pendingCashRequests = useFetch(`payment?populate=["passenger"]`)

  const onButton = (id, data) => {
    router.push({ pathname: `/passenger/report/${id}`, query: { data: JSON.stringify(data) } })
  }

  return (
    <>
      {counts.loading && <Loading />}
      <div className="home" style={{ backgroundColor: 'var(--chakra-colors-gray-200)' }}>
        <div className="dashboard">
          <div className="dashboard-title">Dashboard</div>
          <div className="dashboard-cards">
            <BigCard title="Students" path="/passenger" no={counts?.data?.passenger_count} />
            <BigCard title="Bus Owners" path="/redeem" no={counts?.data?.owner_count} />
            <BigCard title="Buses" path="/bus" no={counts?.data?.bus_count} />
            <BigCard title="Drivers" path="/driver" no={counts?.data?.operator_count} />
            <BigCard title="Schools" path="/school" no={counts?.data?.school_count} />
            <BigCard title="Packages" path="/package" no={counts?.data?.package_count} />
            <BigCard title="Routes" path="/route" no={counts?.data?.route_count} />
            <BigCard title="Users" path="/passenger" no={counts?.data?.user_count} />
          </div>
          <div className="dashboard-scroll">
            <div className="dashboard-verify">
              <div className="dashboard-subtitle">Verify Students & Assign Bus</div>
              {unverifiedPassengers?.data?.length > 0
                ? unverifiedPassengers?.data?.map((item, index) => {
                    return <VerifyStudent key={index} student={item} onButton={onButton} />
                  })
                : 'No Pending Verifications'}
            </div>
            <div className="dashboard-verify flex-more">
              <div className="dashboard-subtitle">Verify Fee Payment</div>
              {pendingCashRequests?.data?.length > 0
                ? pendingCashRequests?.data?.map((item, index) => {
                    return !item?.isResolved ? <CollectFee key={index} item={item} onButton={onButton} /> : null
                  })
                : 'No pending requests'}
            </div>
          </div>
          <div className="dashboard-subtitle">Other Settings</div>
          <Logout />
        </div>
      </div>
    </>
  )
}

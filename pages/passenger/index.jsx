//& Input Components [#IMPORTS#]
import PhotoCard from '@/components/photoCard'
import { useState } from 'react'
import TextField from '@/components/input'
import useFetch from '@/hooks/useFetch'
import Filler from '@/components/filler'
import Fuse from 'fuse.js'
import { useRouter } from 'next/router'

//& Create & Export Driver [#FUNCTION#]
export default function Passenger() {
  const router = useRouter()
  const [student, setStudent] = useState('')

  const passengersData = useFetch(`passenger?populate=["route","school","activeTransaction","appUser","feePackage"]`)
  const data = passengersData?.data

  //$ States and Hooks [#STATES#]
  const onEdit = (id, data) => {
    router.push({ pathname: `/passenger/edit/${id}`, query: { data: JSON.stringify(data) } })
  }
  const onDetail = (id, data) => {
    router.push({ pathname: `/passenger/report/${id}`, query: { data: JSON.stringify(data) } })
  }

  //& Fuse JS [#FUSE#]
  //$ New Fuse Instance with Settings
  const fuse = new Fuse(data, {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: true,
    includeMatches: true,
    findAllMatches: true,
    minMatchCharLength: 0,
    keys: ['name', 'phone'],
  })

  const result = student !== '' && fuse.search(student)
  const resultFilter = result && result.map(result => result.item)
  const searchResultDisplay = resultFilter || data

  //& Return UI [#RETURN#]
  return (
    <div className="home" style={{ backgroundColor: 'var(--chakra-colors-gray-200)' }}>
      <div className="home-shift">
        <TextField title={'Search Student Name'} placeholder={'Type student name'} value={student} setter={setStudent} color={'white'} />
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {passengersData.loading && <Filler cards={4} />}
          {!searchResultDisplay?.length && !passengersData.loading && <div className="home-empty">No Passengers Added</div>}
          {searchResultDisplay?.map((passenger, i) => {
            return <PhotoCard key={i} id={passenger.id} onEdit={onEdit} onDetail={onDetail} passenger={passenger} />
          })}
        </div>
      </div>
    </div>
  )
}

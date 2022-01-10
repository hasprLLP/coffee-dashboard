//& Input Components [#IMPORTS#]
import SimpleCard from '@/components/simpleCard'
import TextField from '@/components/input'
import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import Filler from '@/components/filler'
import useFetch from '@/hooks/useFetch'
import { useRouter } from 'next/router'

//& Create & Export Driver [#FUNCTION#]
export default function ViewDriver() {
  const router = useRouter()

  const [driverName, setDriverName] = useState('')

  const driverData = useFetch(`operator`)
  const data = driverData?.data

  const onEdit = (id, data) => {
    router.push({ pathname: `/driver/edit/${id}`, query: { data: JSON.stringify(data) } })
  }
  const onDetails = (id, data) => {
    router.push({ pathname: `/driver/report/${id}`, query: { data: JSON.stringify(data) } })
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
    keys: ['name', 'owner', 'RCNumber'],
  })

  const result = driverName !== '' && fuse.search(driverName)
  const resultFilter = result && result.map(result => result.item)
  const searchResultDisplay = resultFilter || data

  //& Return UI [#RETURN#]
  return (
    <div className="home" style={{ backgroundColor: 'var(--chakra-colors-gray-200)' }}>
      <div className="home-shift">
        <TextField title={'Search Driver Name'} placeholder={'Type Driver name'} value={driverName} setter={setDriverName} color={'white'} />
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {driverData.loading && <Filler cards={4} />}
          {!searchResultDisplay?.length && !driverData.loading && <div className="home-empty">No Drivers Added</div>}
          {searchResultDisplay?.map((item, i) => {
            return (
              <SimpleCard
                key={i}
                name={item.name}
                id={item.id}
                heading={['PIN', 'Phone']}
                info={[item.pin, item.phone]}
                data={item}
                start={item.start}
                end={item.end}
                type={item.type}
                onEdit={onEdit}
                onDetails={onDetails}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

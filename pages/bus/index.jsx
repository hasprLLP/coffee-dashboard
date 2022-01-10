//& Input Components [#IMPORTS#]
import SimpleCard from '@/components/simpleCard'
import { useState, useEffect } from 'react'
import TextField from '@/components/input'
import useFetch from '@/hooks/useFetch'
import Filler from '@/components/filler'
import Fuse from 'fuse.js'
import { useRouter } from 'next/router'

//& Create & Export Driver [#FUNCTION#]
export default function ViewBus() {
  const [busName, setBusName] = useState('')

  const router = useRouter()

  const busData = useFetch(`bus?populate=["owner"]`)
  const data = busData?.data

  const onEdit = (id, data) => {
    router.push({ pathname: `/bus/edit/${id}`, query: { data: JSON.stringify(data) } })
  }
  const onDetails = (id, data) => {
    router.push({ pathname: `/bus/report/${id}`, query: { data: JSON.stringify(data) } })
  }

  //& Fuse JS [#FUSE#]
  //$ New Fuse Instance with Settings
  const fuse = new Fuse(data, {
    isCaseSensitive: false,
    includeScore: false,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 0,
    keys: ['name', 'RCNumber'],
  })

  const result = busName !== '' && fuse.search(busName)
  const resultFilter = result && result.map(result => result.item)
  const searchResultDisplay = resultFilter || data

  //& Return UI [#RETURN#]
  return (
    <div className="home" style={{ backgroundColor: 'var(--chakra-colors-gray-200)' }}>
      <div className="home-shift">
        <TextField title={'Search Bus No'} placeholder={'Type Bus No'} value={busName} setter={setBusName} color={'white'} />
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {busData.loading && <Filler cards={4} />}
          {!searchResultDisplay?.length && !busData.loading && <div className="home-empty">No Buses Added</div>}
          {searchResultDisplay &&
            searchResultDisplay.map((item, i) => {
              return (
                <SimpleCard
                  key={i}
                  name={item.name}
                  id={item._id}
                  heading={['Owner', 'RC']}
                  info={[item?.owner?.name || '', item?.RCNumber || '']}
                  data={item}
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

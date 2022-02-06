//& Input Components [#IMPORTS#]
import SimpleCard from '@/components/simpleCard'
import TextField from '@/components/input'
import axios from 'axios'
import Fuse from 'fuse.js'
import useFetch from '@/hooks/useFetch'
import Filler from '@/components/filler'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

//& Create & Export Driver [#FUNCTION#]
export default function ViewRoute() {
  const router = useRouter()

  const [routeName, setRouteName] = useState('')
  //$ Getting all the Routes
  const routeData = useFetch(`route?populate=["school","bus","package"]`)
  const data = routeData?.data

  const onEdit = (id, data) => {
    router.push({ pathname: `/route/edit/${id}`, query: { data: JSON.stringify(data) } })
  }
  const onDetails = (id, data) => {
    router.push({ pathname: `/route/report/${id}`, query: { data: JSON.stringify(data) } })
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
    keys: ['name'],
  })

  const result = routeName !== '' && fuse.search(routeName)
  const resultFilter = result && result.map(result => result.item)
  const searchResultDisplay = resultFilter || data

  //& Return UI [#RETURN#]
  return (
    <div className="home" style={{ backgroundColor: 'var(--chakra-colors-gray-200)' }}>
      <div className="home-shift">
        <TextField title={'Search Route Name'} placeholder={'Type Route Details'} value={routeName} setter={setRouteName} color={'white'} />
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {routeData.loading && <Filler cards={4} />}
          {!searchResultDisplay?.length && !routeData.loading && <div className="home-empty">No Routes Added</div>}
          {searchResultDisplay?.map((route, i) => {
            return (
              <SimpleCard
                key={i}
                id={route._id}
                name={route.name}
                data={route}
                heading={['Start', 'School']}
                info={[route?.startsFrom?.address, route?.school?.name]}
                onEdit={onEdit}
                onDetails={onDetails}
                badge={'Stopped'}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

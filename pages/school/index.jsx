//& Input Components [#IMPORTS#]
import SimpleCard from '@/components/simpleCard'
import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import Filler from '@/components/filler'
import TextField from '@/components/input'
import useFetch from '@/hooks/useFetch'
import { useRouter } from 'next/router'

//& Create & Export Driver [#FUNCTION#]
export default function ViewBus() {
  const router = useRouter()
  const [schoolName, setSchoolName] = useState('')

  const schoolData = useFetch(`school`)
  const data = schoolData?.data

  const onEdit = (id, data) => {
    router.push({ pathname: `/school/edit/${id}`, query: { data: JSON.stringify(data) } })
  }
  const onDetails = (id, data) => {
    router.push({ pathname: `/school/report/${id}`, query: { data: JSON.stringify(data) } })
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

  const result = schoolName !== '' && fuse.search(schoolName)
  const resultFilter = result && result.map(result => result.item)
  const searchResultDisplay = resultFilter || data

  //& Return UI [#RETURN#]
  return (
    <div className="home" style={{ backgroundColor: 'var(--chakra-colors-gray-200)' }}>
      <div className="home-shift">
        <TextField title={'Search School Name'} placeholder={'Type School Details'} value={schoolName} setter={setSchoolName} color={'white'} />
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {schoolData.loading && <Filler cards={4} />}
          {!searchResultDisplay?.length && !schoolData.loading && <div className="home-empty">No Schools Added</div>}
          {searchResultDisplay &&
            searchResultDisplay.map((item, i) => {
              return (
                <SimpleCard
                  key={i}
                  id={item._id}
                  name={item.name}
                  heading={['Phone', 'Address']}
                  info={[item.phone, item?.location?.address]}
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

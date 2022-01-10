//& Input Components [#IMPORTS#]
import SimpleCard from '@/components/simpleCard'
import TextField from '@/components/input'
import Fuse from 'fuse.js'
import Filler from '@/components/filler'
import useFetch from '@/hooks/useFetch'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

//& Create & Export Driver [#FUNCTION#]
export default function ViewPackage() {
  const router = useRouter()

  const [packageName, setPackageName] = useState('')
  //$ Getting all the Packages
  const packagesData = useFetch(`package`)
  const data = packagesData?.data

  const onEdit = (id, data) => {
    router.push({ pathname: `/package/edit/${id}`, query: { data: JSON.stringify(data) } })
  }
  const onDetails = (id, data) => {
    router.push({ pathname: `/package/report/${id}`, query: { data: JSON.stringify(data) } })
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

  const result = packageName !== '' && fuse.search(packageName)
  const resultFilter = result && result.map(result => result.item)
  const searchResultDisplay = resultFilter || data

  //& Return UI [#RETURN#]
  return (
    <div className="home" style={{ backgroundColor: 'var(--chakra-colors-gray-200)' }}>
      <div className="home-shift">
        <TextField title={'Search Package Name'} placeholder={'Type Package Details'} value={packageName} setter={setPackageName} color={'white'} />
        <div className="layout-form" style={{ justifyContent: 'flex-start' }}>
          {packagesData.loading && <Filler cards={4} />}
          {!searchResultDisplay?.length && !packagesData.loading && <div className="home-empty">No Packages Added</div>}
          {searchResultDisplay?.map((pack, i) => {
            return (
              <SimpleCard
                key={i}
                id={pack._id}
                name={pack.name}
                data={pack}
                heading={['Name', 'Monthly']}
                info={[pack.name, pack.monthly]}
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

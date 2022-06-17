/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import GoBack from '@/helpers/goback'
import TextField from '@/components/input'
import useFetch from '@/hooks/useFetch'

//& Create & Export Driver [#FUNCTION#]
export default function Details() {
  //& PART 1: Path and Page Data
  const router = useRouter()
  const { id } = router.query //` Doc ID of Bus Owner

  //& PART 2: Panel Sections

  //$ 1: Basic Details
  //@ Data
  const fetchData = useFetch(`package/${id}`) //` Get Owner Details API
  const data = fetchData?.data //` Response from API

  //@ UI
  function BasicView() {
    return (
      <div className="layout-row-item">
        {/* //$ Bus Owner Title */}
        <div className="layout-sub-title" style={{ color: 'black', width: '40%' }}>
          PACKAGE INFO
        </div>
        <div className="layout-form" style={{ justifyContent: 'flex-start', alignItems: 'flex-end' }}>
          {/* //$ Bus Owner Info */}
          <div style={{ width: '100%' }}>
            <div style={{ width: '12vw', height: '12vw', marginTop: '1vw', marginBottom: '2vw', resizeMode: 'cover' }}>
              <img
                alt="No Photo Available"
                src={data?.photo?.url || '/static/svg/user.svg'}
                style={{ width: '12vw', height: '12vw', objectFit: 'cover', borderRadius: '100%', backgroundColor: 'lightgray' }}
              />
            </div>
          </div>
          <TextField type={'show'} title={'Package Name'} placeholder={'No Name'} value={data?.name} />
          <TextField type={'show'} title={'Monthly'} placeholder={'No Monthly'} value={data?.monthly} />
          <TextField type={'show'} title={'Quarterly'} placeholder={'No Quarterly'} value={data?.quarterly} />
          <TextField type={'show'} title={'Half Yearly'} placeholder={'No Half Yearly'} value={data?.halfYearly} />
          <TextField type={'show'} title={'Annually'} placeholder={'No Annually'} value={data?.annually} />
        </div>
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
        {/* //& 1: Owner Info Left Row */}
        <div className="layout-row" style={{ alignItems: 'flex-start' }}>
          <BasicView />
          {/* //& 2: Notifications Right Row */}
          <div className="layout-row-item"></div>
        </div>
        <br />
      </div>
    </div>
  )
}

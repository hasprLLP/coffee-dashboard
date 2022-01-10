import Lottie from 'react-lottie-player'
import loading_lottie from '@/helpers/loadingHamster.json'

export default function Loading() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100000,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255,255,255,0.55)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '10vw', height: 'auto' }}>
        <Lottie loop={true} speed={1} play={true} animationData={loading_lottie} />
      </div>
    </div>
  )
}

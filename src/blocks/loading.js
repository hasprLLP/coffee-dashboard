import Lottie from "react-lottie-player";
import loading_lottie from "@/helpers/loading.json";

export default function Loading() {
    return (
        <div className="home" style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '18vw', height: "auto",marginLeft: '-7.75vw' }}>
                <Lottie
                    loop={true}
                    speed={1}
                    play={true}
                    animationData={loading_lottie}
                />
            </div>
        </div>
    )
}
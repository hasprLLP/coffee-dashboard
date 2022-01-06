export default function convertAMPM(time) {
    return parseInt(time.substring(0, 2)) > 13 ?
        `0${Math.abs(parseInt(time.substring(0, 2)) - 12)}:${time.substring(3, 5)} PM`
        :
        `${time} AM`
}
const getMidPoint = (array) => {
  if (array?.length) {
    //@ Get List Of All Latitudes
    var latsList = array?.map((item, index) => {
      return item.lat
    })

    //@ Get List Of All Longitudes
    var lngsList = array?.map((item, index) => {
      return item.lng
    })

    //@ Sort Latitudes
    var sortedLats = latsList?.slice()?.sort(function (a, b) {
      return a - b
    })

    //@ Sort Longitudes
    var sortedLngs = lngsList?.slice()?.sort(function (a, b) {
      return a - b
    })

    //@ Find Smallest and Largest Latitudes and Longitudes
    var smallestLat = sortedLats[0]
    var largestLat = sortedLats[sortedLats.length - 1]

    var smallestLng = sortedLngs[0]
    var largestLng = sortedLngs[sortedLngs.length - 1]

    var pi = Math.PI //` PI Value

    var dLng = (largestLng - smallestLng) * (pi / 180) //` Longitude difference

    //@ Convert Points to Radians
    var lat1 = smallestLat * (pi / 180)
    var lat2 = largestLat * (pi / 180)
    var lng1 = smallestLng * (pi / 180)
    var lng2 = largestLng * (pi / 180)

    //$ Find Mid Point
    var bX = Math.cos(lat2) * Math.cos(dLng)
    var bY = Math.cos(lat2) * Math.sin(dLng)
    var latInRad = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY))
    var lngInRad = lng1 + Math.atan2(bY, Math.cos(lat1) + bX)

    var midLat = latInRad * (180 / pi)
    var midLng = lngInRad * (180 / pi)
    //& Return Mid Point
    return { midLat, midLng }
  }
  return {midLat: 0, midLng: 0}
}

export default getMidPoint

import { WebMercatorViewport } from 'react-map-gl'

export const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
export const publicToken = 'pk.eyJ1Ijoia2F0aGFja2V0aGFsIiwiYSI6ImNrcDJyeG15aDA4bm0ybm1rbnA4OGg0cDUifQ.13jXKE1MWMt27fdEfA1K9g'
export const endUrl = `.json?access_token=${publicToken}`
export const mapboxStyleUrl = 'mapbox://styles/kathackethal/ckp5dwj7a02wb18rxnm537n5i'

export function subSetViewport(memoryObject) {

  const centerCoordinates = memoryObject.location.coordinates
  const boundaryBox = memoryObject.location.boundaryBox
  const placeType = memoryObject.location.placeType

  // * checking first is boundaryBox was stored, for mor accuracy in viewport display
  if (boundaryBox && boundaryBox.length === 4) {

    const bboxFormat = [[boundaryBox[0],boundaryBox[1]],[boundaryBox[2],boundaryBox[3]]]

    const { latitude, longitude, zoom } = new WebMercatorViewport({ width: 500, height: 500 })
      .fitBounds(bboxFormat, {
        padding: -50,
        offset: [0, -100],
      })
    
    return [[longitude,latitude],zoom]

    // * else just manually define depending on the place type
  } else {

    let zoom = 10

    if (placeType === 'country') zoom = 6
    if (placeType === 'region') zoom = 7
    if (placeType === 'postcode') zoom = 8
    if (placeType === 'district') zoom = 9
    if (placeType === 'place') zoom = 10
    if (placeType === 'locality') zoom = 11
    if (placeType === 'neighbourhood') zoom = 12
    if (placeType === 'address') zoom = 13
    if (placeType === 'poi') zoom = 14

    return [centerCoordinates,zoom]

  }
}
import { WebMercatorViewport } from 'react-map-gl'

export const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
export const publicToken = 'pk.eyJ1IjoicmFwaGNoYXIiLCJhIjoiY2txMHMwajBpMDdxZzJucDhpdGRxMnUzdSJ9.5QE1OTa_Uw-1S3_5oQpcTw'
export const endUrl = `.json?access_token=${publicToken}`
// export const mapboxStyleUrl = ''

export function subSetViewport(crisisObject) {
  const centerCoordinates = crisisObject.location.coordinates
  const boundaryBox = crisisObject.location.boundaryBox
  const placeType = crisisObject.location.placeType

  if (boundaryBox && boundaryBox.length === 4) {
    const bboxFormat = [[boundaryBox[0], boundaryBox[1], boundaryBox[2], boundaryBox[3]]]

    const { latitude, longitude, zoom } = new WebMercatorViewport({ width: 500, height: 500 })
      .fitBounds(bboxFormat, {
        padding: -50,
        offset: [0, -100],
      })

    return [[longitude, latitude], zoom]

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

    return [centerCoordinates, zoom]
  }
}
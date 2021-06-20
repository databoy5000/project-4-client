export const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
export const publicToken = 'pk.eyJ1IjoicmFwaGNoYXIiLCJhIjoiY2txMHMwajBpMDdxZzJucDhpdGRxMnUzdSJ9.5QE1OTa_Uw-1S3_5oQpcTw'
export const endUrl = `.json?access_token=${publicToken}`
// export const mapboxStyleUrl = ''

export function defaultViewport(crisesData) {

  if (crisesData.length === 1) {
    const crisis = crisesData[0]
    const latitude = Number(crisis.latitude)
    const longitude = Number(crisis.longitude)
    const placeType = crisis.placeType

    // * zoomValue = 10 in case none of the below placeTypes are passed into the function
    let zoomValue = 10
  
    if (placeType === 'country') zoomValue = 6
    if (placeType === 'region') zoomValue = 7
    if (placeType === 'postcode') zoomValue = 8
    if (placeType === 'district') zoomValue = 9
    if (placeType === 'place') zoomValue = 10
    if (placeType === 'locality') zoomValue = 11
    if (placeType === 'neighbourhood') zoomValue = 12
    if (placeType === 'address') zoomValue = 13
    if (placeType === 'poi') zoomValue = 14

    return {
      latitude: latitude,
      longitude: longitude,
      width: window.innerWidth,
      height: '300px',
      zoom: zoomValue,
    }

  } else {
    return {
      latitude: 55,
      longitude: 10,
      width: window.innerWidth,
      height: '300px',
      zoom: 0,
    }
  }
}
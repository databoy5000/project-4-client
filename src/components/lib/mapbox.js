export const publicToken = process.env.REACT_APP_MAPBOX_TOKEN
export function defaultViewport(crisesData, homepageViewPort = false) {

  if (crisesData.length === 1 && !homepageViewPort) {
    const crisis = crisesData[0]
    const latitude = Number(crisis.latitude)
    const longitude = Number(crisis.longitude)
    const placeType = crisis.placeType

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

  } else if (homepageViewPort) {
    return homepageViewPort
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
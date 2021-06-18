// import React from 'react'
// import { Link } from 'react-router-dom'
// import ReactMapGl, { Marker, Popup } from 'react-map-gl'
// import axios from 'axios'

// import { baseUrl } from '../lib/api'
// import { publicToken } from '../lib/mapbox'

// function Home() {
//   const [searchTerm, setSearchTerm] = React.useState('')
//   const [selectedCrisis, setSelectedCrisis] = React.useState(null)
//   const [crises, setCrises] = React.useState(null)

//   const [inputHeight, setInputHeight] = React.useState(40)
//   const navHeight = JSON.parse(localStorage.getItem('navHeight'))
  
//   const viewportWidth = window.innerWidth
//   const viewportHeight = window.innerHeight - (navHeight + inputHeight)

//   const [isError, setIsError] = React.useState(false)
//   const isLoading = !crises && !isError

//   const [viewport, setViewport] = React.useState({
//     latitude: 54.405,
//     longitude: 9.431,
//     width: viewportWidth,
//     height: viewportHeight,
//     zoom: 1.85,
//   })

//   function handleResize() {
//     const newWidth = window.innerWidth
//     const newHeight = window.innerHeight - (navHeight + inputHeight)
//     console.log(window.innerHeight, window.innerWidth)
//     setViewport({ ...viewport, width: newWidth, height: newHeight })
//   }

//   React.useEffect(() => {
//     const getData = async () => {
//       try {
//         const res = await axios.get(`${baseUrl}/crises`)
//         setCrises(res.data)
//         handleResize()
//       } catch (err) {
//         setIsError(true)
//       }
//     }
//     getData()
//   }, [])

//   React.useEffect(() => {
//     window.addEventListener('resize', handleResize)
//   }, [])

//   const handleSearch = e => {
//     setSearchTerm(e.target.value)
//   }

//   const getInputHeight = e => {
//     const inputHeight = e.nativeEvent.path[1].offsetHeight
//     setInputHeight(inputHeight)
//   }

//   const filteredCrises = crises?.filter(crisis => {
//     return (
//       crisis.location.toLowerCase().includes(searchTerm) ||
//       crisis.disasterType.toLowerCase().includes(searchTerm) ||
//       crisis.description.toLowerCase().includes(searchTerm)
//     )
//   })

//   return (
//     <section>

//       <div>
//         <h1>WoRCO</h1>
//         <h3>World Response Crises Organisation</h3>
//       </div>
//       {isLoading && <p>...map is loading</p>}
//       <div onFocus={getInputHeight}>
//         <input 
//           className="form-control"
//           type="text"
//           placeholder="Search a crisis..."
//           onChange={handleSearch}
//           value={searchTerm || ''}
//         />

//       </div>
//       <ReactMapGl
//         {...viewport}
//         mapboxApiAccessToken={publicToken}
//         map
//         onViewportChange={viewport => {
//           setViewport(viewport)
//         }}
//       >
//       </ReactMapGl>
//     </section>

//   )
// }
// export default Home
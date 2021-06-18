import { useEffect, useState } from 'react'

import { getPayLoad } from '../lib/auth'
import HSDashboard from '../dashboards/HSDashboard'
import NGODashboard from '../dashboards/NGODashboard'

function Dashboard() {

  const [ isHelpSeeker, setIsHelpSeeker ] = useState(false)
  const [ isNGO, setIsNGO ] = useState(false)

  const userTypes = ['Help-seeker', 'NGO']
  const userType = getPayLoad().type

  useEffect( () => {
    const setDashboard = () => {
      if (userType === userTypes[0]) {
        setIsHelpSeeker(true)
      } else if (userType === userTypes[1]) {
        setIsNGO(true)
      }
    }
    setDashboard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
      {isHelpSeeker && <HSDashboard />}
      {isNGO && <NGODashboard />}
      {
        !isHelpSeeker && !NGODashboard &&
        <div>
          <h4>Oops... something went wrong!</h4>
        </div>
      }
    </>
  )
}

export default Dashboard
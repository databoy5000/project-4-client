import { useEffect, useState } from 'react'

import { isNGO } from '../lib/auth'
import HSDashboard from '../dashboards/HSDashboard'
import NGODashboard from '../dashboards/NGODashboard'

function Dashboard() {

  const [ isHelpSeekerUser, setIsHelpSeekerUser ] = useState(false)
  const [ isNGOUser, setIsNGOUser ] = useState(false)

  useEffect( () => {
    const setDashboard = () => {
      const checkNGOUser = isNGO()
      if (!checkNGOUser) {
        setIsHelpSeekerUser(true)
      } else if (checkNGOUser) {
        setIsNGOUser(true)
      }
    }
    setDashboard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <>
      {isHelpSeekerUser && <HSDashboard />}
      {isNGOUser && <NGODashboard />}
      {
        !isHelpSeekerUser && !NGODashboard &&
        <div>
          <h4>Oops... something went wrong!</h4>
        </div>
      }
    </>
  )
}

export default Dashboard
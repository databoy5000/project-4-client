import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Error from '../common/Error'
import { baseUrl, memoriesPath } from '../../lib/api'

function AllMemories() {

  const [memories, setMemories] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const isLoading = !memories && !isError


  React.useEffect(() => {

    const getData = async () => {

      try {

        const res = await axios.get(`${baseUrl}${memoriesPath}`)
        setMemories(res.data)

      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  //* search functions
  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const filteredMemories = memories?.filter((memory) => {
    return (
      memory.title.toLowerCase().includes(searchTerm) ||
      memory.location.userInput.toLowerCase().includes(searchTerm) ||
      memory.date.includes(searchTerm) ||
      memory.tags.includes(searchTerm)
    )
  })

  return (
    <>
      <section className="all-memories-background">

        <div className="title is-2 has-text-centered has-background-black has-text-white">
          All memories
        </div>

        <div className="container">
          <div className="columns is-multiline"></div>

          {isError && <Error />}
          {isLoading && <p>...loading</p>}

          <div className="column ">
            <aside className="searchbar">
              <input
                className="input"
                type="text"
                placeholder="Find memory..."
                onChange={handleInput}
                value={searchTerm}
              />

              <button className="button is-link is-small is-outlined" onClick={handleClear}>
                Clear
              </button>
              
            </aside>
          </div>

          {filteredMemories && (filteredMemories.map(memory =>
            <div className="column content is-half is-offset-half" key={memory._id}>

              <div className="card index-card has-background-info-light" >
                <Link to={`${memoriesPath}/${memory._id}`}>
                  <div className="title is-3">{memory.title}</div>

                  <div className="has-text-success">
                    {memory.location.userInput}
                  </div>
                  
                  <p>{moment(memory.date).format('MMMM Do YYYY')}</p>
                  <img 
                    height="540px"
                    width="810px"
                    src={memory.image}
                    alt={memory.title}
                  />
                </Link>
              </div>

            </div>
          ))}

          <div className="column is-half is-offset-half">
            <figure className="image">
              <img src="https://imgur.com/vYMvx4u.png" />
            </figure>
          </div>

        </div>
      </section>
    </>
  )
}
export default AllMemories
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import '../index.css'

function UpdateMovie(props) {
  const { id } = props.match.params
  const defaultMovie = { title: '', director: '', metascore: '', stars: [] }
  const [updateMovie, setUpdateMovie] = useState(defaultMovie)
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        console.log(response)
        setUpdateMovie(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])
  const handleInput = e => {
    e.preventDefault()
    setUpdateMovie({ ...updateMovie, [e.target.name]: e.target.value })
  }
  const handleStars = event => {
    setUpdateMovie({
      ...updateMovie,
      stars: [event.target.value],
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    axios
      .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
      .then(res => {
        console.log(res)
        setUpdateMovie(defaultMovie)
        props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="update-container">
      <div>
        <p>Update Your Movie</p>
      </div>
      <div>
        <form className="update-form" onSubmit={handleSubmit}>
          <div>
            <label>Movie Title</label>
            <input
              type="text"
              placeholder="Title"
              onChange={handleInput}
              name="title"
              value={updateMovie.title}
            />
          </div>
          <div>
            <label>Movie Director</label>
            <input
              type="text"
              name="director"
              placeholder="director"
              onChange={handleInput}
              value={updateMovie.director}
            />
          </div>
          <div>
            <label>Movie Meta-score</label>
            <input
              type="text"
              name="metascore"
              placeholder={updateMovie.metascore}
              onChange={handleInput}
              value={updateMovie.metascore}
            />
          </div>
          <div>
            <label>Movie Stars</label>
            <input
              type="text"
              name="stars"
              placeholder="stars"
              onChange={handleStars}
              value={updateMovie.stars}
            />
          </div>
          <div>
            <button className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateMovie

import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

export const Search = ({ onSearchChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (location.pathname !== "/search") {
      navigate(location.pathname)
    }
  }, [location.pathname, navigate])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    onSearchChange(event.target.value)
  
    if (event.target.value === "") {
      navigate('/')
    } else {
      navigate(`/search?query=${event.target.value}`)
    }
  };
  

  return (
    <div id="searchField">
      <h1> 
        <input
          id="searchInput"
          type="text"
          placeholder="Search PageTurner"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </h1>
      <br />
    </div>
  )
}


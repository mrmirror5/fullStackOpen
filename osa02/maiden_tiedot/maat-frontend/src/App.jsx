import { useEffect, useState } from 'react'
import axios from 'axios'

import Search from './components/Search'
import CountryView from './components/CountryView'
import SearchResults from './components/SearchResults'


function App() {
  const [filterStr, setFilterStr] = useState("")
  const [countries, setCountries] = useState([])

  //Get the countries and filter them
  useEffect(() => {

    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterStr(event.target.value)
  }

  const handleShowCountry = (country) => {
    //somethin wise
    setFilterStr(country.name.common)
  }
  
  const countriesToShow = filterStr === "" ? countries : countries.filter(country => country.name.common.toLowerCase().includes(filterStr.toLocaleLowerCase()))

  const tooManyMatches =  countriesToShow.length > 10
  let showOneCountry = countriesToShow.length === 1

  return (
    <>
      <Search 
      handleFilterChange={handleFilterChange}
      tooManyMatches={tooManyMatches} />

      <SearchResults
      showOneCountry={showOneCountry}
      tooManyMatches={tooManyMatches}
      countriesToShow={countriesToShow}
      handleShowCountry={handleShowCountry} />

      <CountryView 
      showThis={showOneCountry}
      country={countriesToShow[0]}
      />
    </>
  )
}

export default App

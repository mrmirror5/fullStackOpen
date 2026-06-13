
const SearchResults = ({showOneCountry, tooManyMatches, countriesToShow, handleShowCountry}) => {


    
    if (showOneCountry) {
        return null
    }
    return (
    <ul>
        { !tooManyMatches 
        ? countriesToShow.map(country => {
        return (
        <li key={country.name.common}>{country.name.common}
            <button onClick={() => handleShowCountry(country)}>show</button>
        </li> )
        })
        : null}
    </ul>
    )
}

export default SearchResults
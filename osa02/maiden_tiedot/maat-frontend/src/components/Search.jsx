const Search = ({handleFilterChange, tooManyMatches}) => {

    return (
      <>
        find countries <input 
        onChange={handleFilterChange}
        ></input>
        <p>{tooManyMatches ? "Too many matches, specify another filter" : null}</p>
      </>
    )
}

export default Search
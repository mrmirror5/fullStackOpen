
const PersonForm = ({newPerson, handlePersonChange, newNumber, handleNumberChange, addPerson}) => {
    return (
    <form>
        <div>
          name: <input 
          value={newPerson}
          onChange={handlePersonChange}
          placeholder='Type a name...' />
          <br />
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          placeholder='Type a number...' />
        </div>
        <div>
          <button 
          type="submit"
          onClick={addPerson}
          >add</button>
        </div>
    </form>
    )
}

export default PersonForm
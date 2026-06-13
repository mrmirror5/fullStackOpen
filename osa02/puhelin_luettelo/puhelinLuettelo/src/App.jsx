import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personsService from './services/persons'
import AddNotification from './components/AddNotification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {


  useEffect(()=>{
    personsService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log("Persons array fetched from server!")
    })

  },[])




  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

  const [newPerson, setNewPerson] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterString, setFilterString] = useState("")
  const [personAdded, setPersonAdded] = useState(null)
  const [rmErrorPerson, setRmErrorPerson] = useState(null)

  // Person related code
  const handlePersonChange = (event) => {
    setNewPerson(event.target.value) 
  }


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber
    }

    if (persons.some(person => person.name.toLowerCase() === newPerson.toLowerCase())) {
      const changeNumber = confirm(`${newPerson} is already added to the phonebook, replace the old number with a new one?`)
      const person = persons.find(person => person.name.toLowerCase() === newPerson.toLowerCase())
      const changedPerson = {...person, number: newNumber}

      changeNumber ? 
      personsService
        .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            
            setNewPerson("")
            setNewNumber("")
        })
      : 
      console.log("number not changed")

      
    }
    else if (persons.some(person => person.number === newNumber)) {
      alert(`The number: ${newNumber} is already added to the phonebook!`)
      setNewNumber("")
    }
    else {
      personsService
      .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
        })

        setPersonAdded(newPerson)
        setTimeout(()=> {
          setPersonAdded(null)
        },2000)

      setNewPerson("")
      setNewNumber("")
    }
  }


  // Number related code

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Filtering
  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  const personsToShow = filterString === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))


  //Deleting of persons
  const handleDelete = (id) => {

    personsService
      .del(id).then(() => {
        setPersons(prevPersons => prevPersons.filter(p => p.id !== id))
      })
      .catch(error => {
        console.log(error + "laski")

        const personToRm = persons.find(p => p.id === id)
        setTimeout(() => {
          setRmErrorPerson(personToRm.name)
        }, 2000)

        setRmErrorPerson(null)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <AddNotification name={personAdded} />
      <ErrorNotification name={rmErrorPerson} />

      <Filter 
      filterString={filterString}
      handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
      newPerson={newPerson}
      handlePersonChange={handlePersonChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      addPerson={addPerson} />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} onDelete={handleDelete}/>
    </div>
  )

}

export default App
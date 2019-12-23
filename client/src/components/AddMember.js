import React, { useState, useEffect } from 'react'





function AddMember(props) {

    const [firstName, updateFirstName] = useState("")
    const [lastName, updateLastName] = useState("")
    const [squad, updateSquad] = useState("all")

    const [errors, updateErrors] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        updateErrors([])
        console.log("trying to submit")

        if(firstName === "" || lastName === ""){
            updateErrors(prevState => {
                const newErrors = prevState
                newErrors.push("Fields must not be empty")
                return newErrors
            })
            return
        }

        const data_to_send = {
            firstName: firstName,
            lastName: lastName,
            squad: squad
        }

        console.log(data_to_send)

        fetch('/api/member', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data_to_send)
        })
        .then(res => console.log(res))
    }

    function handleChange(e){
        if(e.target.name === "firstName") updateFirstName(e.target.value)
        else if(e.target.name === "lastName") updateLastName(e.target.value)
        else if(e.target.name === "squads") updateSquad(e.target.value)
    }
    const squadsOptions = props.squads.map((squad,i) => {
        return <option key={i} value={squad}>{squad}</option>
    })
    const errorsList = errors.map((error, i) => <li key={i}>{error}</li>)
    return (
        <form onSubmit={handleSubmit}>
            <ul className="errorsList">
                    {errorsList}
                </ul>
            <div className="form-element">
                <label>First Name</label>
                <input name="firstName" type="text" onChange={handleChange}></input>
            </div>
            <div className="form-element">
                <label>Last Name</label>
                <input name="lastName" type="text" onChange={handleChange}></input>
            </div>
            <select className="create-training-button" value={squad} onChange={handleChange} name="squads">
                <option value="all">All Squads</option>
                {squadsOptions}
            </select>
            <br></br>
            <input type="submit" className="create-training-button" value="Add Member"/>
        </form>
    )

}

export default AddMember
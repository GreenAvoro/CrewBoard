import React, { useState, useEffect } from 'react'

function CreateTraining(props) {

    const [name, updateName] = useState("")
    const [desc, updateDesc] = useState("")
    const [location, updateLocation] = useState("")
    const [date, updateDate] = useState("")
    const [endDate, updateEndDate] = useState("")
    const [start_time, updateStartTime] = useState("")
    const [end_time, updateEndTime] = useState("")
    const [recurring, updateRecurring] = useState(false)
    const [colour, updateColour] = useState("blue")
    const [squad, updateSquad] = useState(props.squad)

    const [errors, updateErrors] = useState([])

    useEffect(() => {
        updateSquad(props.squad)
    }, [])

    function handleChange(e) {
        if (e.target.name === "name") updateName(e.target.value)
        else if (e.target.name === "desc") updateDesc(e.target.value)
        else if (e.target.name === "location") updateLocation(e.target.value)
        else if (e.target.name === "date") updateDate(e.target.value)
        else if (e.target.name === "endDate") updateEndDate(e.target.value)
        else if (e.target.name === "startTime") updateStartTime(e.target.value)
        else if (e.target.name === "endTime") updateEndTime(e.target.value)
        else if (e.target.name === "recurring") updateRecurring(!recurring)
        else if (e.target.name === "colour") updateColour(e.target.value)
        else if (e.target.name === "squads") updateSquad(e.target.value)

        if(!recurring)updateEndDate(prevState => date)

    }

    function handleSubmit(e) {
        e.preventDefault()
        updateErrors([])

        
        if (endDate < date && recurring) {
            updateErrors(prevState => {
                const newErrors = prevState
                newErrors.push("End Date must be later than Date.")
                return newErrors
            })
            return
        }
        if(end_time < start_time){
            updateErrors(prevState => {
                const newErrors = prevState
                newErrors.push("End Time must be later than Start Time.")
                return newErrors
            })
            return
        }
        if(name === "" || desc === "" || start_time === "" || end_time === "" || date === "" || location === ""){
            updateErrors(prevState => {
                const newErrors = prevState
                newErrors.push("Fields must not be empty")
                return newErrors
            })
            return
        }

        const data_to_send = {
            name: name,
            desc: desc,
            location: location,
            date: date,
            endDate: endDate,
            startTime: start_time,
            endTime: end_time,
            recurring: recurring,
            colour: colour,
            squad: squad
        }

        console.log(data_to_send)
        fetch('/api/training', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data_to_send)
        })
            .then(res => console.log(res))
            .then(props.display(prevState => !prevState))

    }
    const recurringInput = (
        <div className="create-training-input-wrapper">
            <label>End Date</label>
            <input name="endDate" type="date" value={endDate} onChange={handleChange} />
        </div>
    )

    const errorsList = errors.map((error, i) => <li key={i}>{error}</li>)
    const squadsOptions = props.squads.map((squad,i) => {
        return <option key={i} value={squad}>{squad}</option>
    })
    return (
        <div className="create-training-container">
            <div className="create-training-box">
                <p className="close-button" onClick={e => props.display(prevState => !prevState)}>X</p>
                <h1>Create Training</h1>
                <ul className="errorsList">
                    {errorsList}
                </ul>
                <form onSubmit={handleSubmit}>
                    <select className="create-training-button" value={squad} onChange={handleChange} name="squads">
                        <option value="all">All Squads</option>
                        {squadsOptions}
                    </select>
                    <div className="create-training-input-wrapper">
                        <label>Training Name</label>
                        <input name="name" type="text" value={name} onChange={handleChange} placeholder="e.g. On Water"/>
                    </div>
                    <div className="create-training-input-wrapper">
                        <label>Description</label>
                        <input name="desc" type="text" value={desc} onChange={handleChange} placeholder="e.g. Bring shoes incase of weather"/>
                    </div>
                    <div className="create-training-input-wrapper">
                        <label>Location</label>
                        <input name="location" type="text" value={location} onChange={handleChange} placeholder="e.g. Boat House" />
                    </div>
                    <div className="create-training-input-wrapper">
                        <label>Date</label>
                        <input name="date" type="date" value={date} onChange={handleChange} />
                    </div>
                    <div className="create-training-input-wrapper">
                        <label>Recurring Training</label>
                        <input name="recurring" type="checkbox" checked={recurring} onChange={handleChange} />
                    </div>
                    {recurring ? recurringInput : null}

                    <div className="create-training-input-wrapper">
                        <label>Start Time</label>
                        <input name="startTime" type="time" value={start_time} onChange={handleChange} />
                    </div>
                    <div className="create-training-input-wrapper">
                        <label>End Time</label>
                        <input name="endTime" type="time" value={end_time} onChange={handleChange} />
                    </div>
                    <div className="create-training-input-wrapper">
                        <label>Label Colour</label>
                        <div className="create-training-colours">
                            <div className={`create-training-colour blue ${colour === "blue" ? "active" : ""}`} value="blue" onClick={() => updateColour("blue")}></div>
                            <div className={`create-training-colour green ${colour === "green" ? "active" : ""}`} value="red" onClick={() => updateColour("green")}></div>
                            <div className={`create-training-colour red ${colour === "red" ? "active" : ""}`} value="green" onClick={() => updateColour("red")}></div>
                            <div className={`create-training-colour yellow ${colour === "yellow" ? "active" : ""}`} value="yellow" onClick={() => updateColour("yellow")}></div>
                        </div>
                    </div>

                    <input className="create-training-button" type="submit" value="Save Training" />

                </form>
            </div>
        </div>
    )
}

export default CreateTraining
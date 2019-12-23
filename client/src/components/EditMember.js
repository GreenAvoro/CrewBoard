import React, { useState, useEffect } from 'react'

function EditMember(props) {
    const [firstName, updateFirstName] = useState("No Name")
    const [lastName, updateLastName] = useState("No Name")

    useEffect(() => {
        updateFirstName(props.member.firstName)
        updateLastName(props.member.lastName)




    }, [])
    function handleChange(e) {
        if(e.target.name === "firstName") updateFirstName(e.target.value)
        else if (e.target.name === "lastName") updateLastName(e.target.value)

    }

    function handleSubmit(e) {
        e.preventDefault()

        const data_to_send = {
            firstName: firstName,
            lastName: lastName,
            id: props.member._id
        }

        fetch('/api/member/edit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data_to_send)
        })
            .then(res => console.log(res))
            .then(props.closePanel(null))
        
    }

    return (
        <div className="edit-member-container">
            <div className="edit-member-panel">
                <p className="close-button" onClick={() => props.closePanel(null)}>X</p>
                <h1>Edit Member</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-element">
                        <label>First Name</label>
                        <input name="firstName" type="text" onChange={handleChange} value={firstName}></input>
                    </div>
                    <div className="form-element">
                        <label>Last Name</label>
                        <input name="lastName" type="text" onChange={handleChange} value={lastName}></input>
                    </div>

                    <input className="create-training-button" value="Save Changes" type="submit"></input>
                </form>
            </div>

        </div>
    )
}

export default EditMember
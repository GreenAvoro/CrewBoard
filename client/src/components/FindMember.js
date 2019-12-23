import React, { useState, useEffect } from 'react'
import EditMember from './EditMember'

function FindMember(props) {

    const [search, updateSearch] = useState()
    const [searchedMembers, updateSearchedMembers] = useState([])
    const [editMember, updateEditMember] = useState(null)

    function handleChange(e) {
        if (e.target.name === "search") {
            updateSearch(e.target.value)
        }


    }
    function deleteName(id){
        fetch('/api/member/delete', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        })
        .then(res => res.json())
    }
    useEffect(() => {
        fetch('/api/member/search', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({search: search})
        })
        .then(res => res.json())
        .then(data => {
            updateSearchedMembers(data)
        })
        console.log(searchedMembers)
    }, [search])

    return (
        <div className="form-element">
            {editMember !== null ? <EditMember member={editMember} closePanel={updateEditMember}/> : false}
            <h3>Search Members</h3>
            <input name="search" className="search-bar" onChange={handleChange} />
            <div className="members-search">
                {searchedMembers.map((member,i) => <div className="members-search-item" key={i}>
                    <p>{`${member.firstName} ${member.lastName}`}</p>
                    <div className="members-search-item-buttons">
                        <p onClick={() => updateEditMember(member)}>Edit</p>
                        <p onClick={(e) => { 
                            if (window.confirm('Are you sure you wish to delete this item?')) {
                                deleteName(member._id)
                                updateSearchedMembers(prevState => prevState.filter(mem => mem._id !== member._id))
                            }
                             } }>Delete</p>
                    </div>
            </div>)}
            </div>
            
        </div>
    )

}

export default FindMember
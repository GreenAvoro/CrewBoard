import React, { useState } from 'react'
import Member from './Member'
import Boat from './Boat'

function MemberList(props) {
    const [listActive, switchList] = useState("member")
    const members = props.members.map((item, i) => {
        return (<Member
            callback={props.memberclick}
            key={i}
            name={item}
            selected={props.selected.includes(item)} />)
    })

    const boats = props.boats.map((boat,i) => {
        return (
            <Boat 
                key={i}
                data={boat}
                selected={props.boatselected.name === boat.name}
                callback={props.boatclick}
                increw={false}
             />
        )
    })

    function handleClick(e) {
        props.listclick("memList")
    }
    function listSwitch(e){
        listActive === "member" ? switchList("boat") : switchList("member")
    }

    return (
        <div onClick={handleClick} className="member-list">
            <div className="list-titles">

                <div onClick={listSwitch} className={listActive === "member" ? "active":""}>
                    <h3>Member List</h3>
                </div>

                <div onClick={listSwitch} className={listActive === "boat" ? "active":""}>
                    <h3>Boat List</h3>
                </div>

            </div>
            <p className="save-crews" onClick={() => props.savecrews()}>Save Crews</p>
            {listActive === "member" ? members : boats}
        </div>
    )
}
export default MemberList
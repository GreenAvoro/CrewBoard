import React from 'react'
import Member from './Member'
import Boat from './Boat'

function Crew(props){
    function addMembers(event){
        props.callback(props.id)
        
    }
    const members = props.members.map((item, i) => {
        return(<Member 
            key={i} 
            name={item} 
            callback={props.memberclick}
            selected={props.selected.includes(item)}/>
    )})
    return(
        <div onClick={addMembers} className="crew">
            <h3>{props.id}</h3>

            {Object.getOwnPropertyNames(props.boat).length === 0 ? 
                "" :
                <Boat 
                    data={props.boat}
                    selected={props.boatselected.name === props.boat.name}
                    callback={props.boatclick}
                    increw={true}
                />
            }
            {members}
            
            
        </div>
    )
}
export default Crew
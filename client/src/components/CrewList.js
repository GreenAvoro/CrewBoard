import React from 'react'

import Crew from './Crew'

function CrewList(props){
    const crew_list = props.crews.map((crew, i) => {
        return(
            <Crew 
                key={i} 
                id={crew.id} 
                callback={props.callback} 
                members={crew.members} 
                memberclick={props.memberclick} 
                selected={props.selected} 
                boat={crew.boat} 
                boatselected={props.boatselected}
                boatclick={props.boatclick}
            />
        )}
    )
    function handleClick(e){
        props.addcrew()
    }
    
    return(
        <div className="crew-list">
            {crew_list}
            <div><h2 onClick={handleClick}className="add-crew">+</h2></div>
        </div>
    )
}
export default CrewList
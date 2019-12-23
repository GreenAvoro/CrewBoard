import React from 'react'

function Boat(props){
    function handleClick(e){
        e.stopPropagation()
        props.callback(props.data)

    }
    var cssclasses = "boat"
    if(props.selected){
        cssclasses = cssclasses.concat(" selected")
    }
    if(props.increw){
        cssclasses = cssclasses.concat(" increw")
    }
    return(
        <div onClick={handleClick} className={cssclasses}>
            <p>{props.data.name}</p>
            <p>{props.data.class}</p>
        </div>
    )
}

export default Boat
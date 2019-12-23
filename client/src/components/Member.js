import React from 'react'

function Member(props) {
    function handleClick(e){
        e.stopPropagation()
        props.callback(props.name)

    }
    return(
        <p onClick={handleClick} className={props.selected ? "member selected" : "member"}>{props.name}</p>
    )
}
export default Member
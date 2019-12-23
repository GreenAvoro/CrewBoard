import React from 'react'
import convertDate from '../scripts/convertToDate'


function DateItem(props) {

    var colorCode = "#fcba03"
    if(props.colour === "blue")colorCode = "#483bff"
    else if(props.colour === "red")colorCode = "#e22113"
    else if(props.colour === "green")colorCode = "#46dd0b"
    else if(props.colour === "yellow")colorCode = "#ffeb3b"

    return(
        <div className="date-item" onClick={props.onClick}>
            <div className="color-code" style={{"background": colorCode}}></div>
            <div className="date-content">
                <p>{convertDate(props.date)} <span className="squad-name-sm">{props.squad}</span></p>
                <p>{props.name}</p>
                <p>{props.location}</p>
            </div>
        </div>
    )
}

export default DateItem
import React from 'react'
//For the Crews list on the calendar page
function Crews(props) {
    let crews_display = <p>No Crews</p>
    if (props.crews) {
        crews_display = props.crews.map((crew,i) => {
            let boat = "No Boat"
            //If crew.boat isn't undefined, then assign the string to boat
            if(crew.boat !== undefined){
                if(!(Object.entries(crew.boat).length === 0 && crew.boat.constructor === Object)) {
                    boat = crew.boat.name
                }
            }
            
            if(crew.members.length === 0) return
            return (
                <div key={i} className="crew-item">
                    {crew.members.map((mem, j)=> <p key={j} className="crew-member">{mem}</p>)}
                    <p className="boat-item">{boat}</p>
                </div>
            )
        })
    }

    return <div>{crews_display}</div>

}

export default Crews


    // < div key = { i } className = "crew-item" > {
    //     crew.members.map((member, j) => <p className="crew-member" key={j}>{member}</p>)

    // }
    //     < p className = "boat-item" > { boat }</p >
    //     </div >
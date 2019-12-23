import React, { useState, useEffect } from 'react'
import '../styles/calendar.css'

import SidePanel from './SidePanel'
import MainPanel from './MainPanel'
import CreateTraining from './CreateTraining'

function Calendar(props) {
    const [createTraining, updateCreateTraining] = useState(false)
    const [currentSquad, updateCurrentSquad] = useState("all")
    const [ squads, updateSquads ] = useState([])
    const [trainings, updateTrainings] = useState([])
    const [currentTraining, updateCurrentTraining] = useState({})
    const [currentPanel, updateCurrentPanel] = useState("trainings")


    useEffect(() => {
        fetch('/api/squads')
            .then(res => res.json())
            .then(data => updateSquads(data))

    }, [])
    //Update when createTraining window closes
    useEffect(() => {
        fetch(`/api/training/?squad=${currentSquad}`)
            .then(res => res.json())
            .then(data => {
                updateTrainings(data)
            })
    }, [createTraining])

    //Update when currentSquad changes
    useEffect(() => {
        fetch(`/api/training/?squad=${currentSquad}`)
            .then(res => res.json())
            .then(data => {
                updateTrainings(data)
            })
            updateCurrentTraining({})
    }, [currentSquad])

    function handleClick(name,data) {
        if (name === "create-training") {
            updateCreateTraining(true)
        }
        else if(name === "current-training") {
            updateCurrentTraining(data)
        }
    }


    return (
        // style={{backgroundImage: `url(${Background})`}}
        <div className="calendar-wrapper" >
            <SidePanel 
                updateSquad={updateCurrentSquad} 
                squads={squads} 
                currentSquad={currentSquad} 
                panelUpdate={updateCurrentPanel}
            />
            <div></div>
            <MainPanel 
                trainings={trainings} 
                pageupdate={props.pageupdate} 
                handleClick={handleClick}
                currentTraining={currentTraining}
                currentPanel={currentPanel}
                squads={squads}
            />
            {createTraining ? <CreateTraining 
                                    display={updateCreateTraining} 
                                    squad={currentSquad} 
                                    squads={squads} 
                                     /> : false}
        </div>
    )
}
export default Calendar
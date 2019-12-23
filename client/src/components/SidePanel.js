import React from 'react'
import TrainingsIcon from '../images/trainings.svg'
import EventsIcon from '../images/events.svg'
import RegattasIcon from '../images/regattas.svg'
import SettingsIcon from '../images/settings.svg'

function SidePanel(props){

    // const [squads, updateSquads] = useState([])


    const squad_names = props.squads.map((squad,i) =>{
        return <p 
                    key={i} 
                    onClick={() => props.updateSquad(squad)}
                    className={props.currentSquad === squad ? "list-active": ""}
                >
                    {squad}
                </p>
    })
    return(
        <div className="side-panel">
            <div className="side-panel-list">
                <h2 className="active" onClick={() => {
                    props.updateSquad("all")
                    props.panelUpdate("trainings")
                    }
                }>
                    <img src={TrainingsIcon} className="list-icon" alt="Trainiing Icon"></img>
                    Trainings
                </h2>
                <div className="side-panel-sublist">
                    {squad_names}
                </div>
            </div>

            <div className="side-panel-list">
                <h2>
                    <img src={RegattasIcon} className="list-icon" alt="Regattas Icon"></img>
                    Regattas</h2>
            </div>

            <div className="side-panel-list">
                <h2>
                    <img src={EventsIcon} className="list-icon" alt="Events Icon"></img>
                    Events</h2>
            </div>

            <div className="side-panel-list">
                <h2 onClick={() => props.panelUpdate("settings")}>
                    <img src={SettingsIcon} className="list-icon" alt="Settings Icon"></img>
                    Settings</h2>
            </div>
        </div>
    )
}
export default SidePanel
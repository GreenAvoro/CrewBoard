import React, { useState } from 'react'
import convertDate from '../scripts/convertToDate'
import compareWeek from '../scripts/findWeek'
import Crews from './Crews'
import AddMemeber from './AddMember'
import FindMemeber from './FindMember'
import loadingImg from '../images/loading.svg'

import DateItem from './DateItem'

function MainPanel(props) {

    const [infoPanelDisplay, updateInfoPanelDisplay] = useState(false)
    const [AddMemberDropDown, updateAddMemberDropDown] = useState(false)
    const [FindMemberDropDown, updateFindMemberDropDown] = useState(false)
    

    const trainingList = props.trainings.map((training, i) => {
        return (
            <DateItem
                key={training._id}
                name={training.name}
                date={training.date}
                colour={training.colour}
                location={training.location}
                squad={training.squad}
                onClick={() => {
                    props.handleClick(
                        "current-training",
                        {
                            name: training.name,
                            date: training.date,
                            desc: training.description,
                            location: training.location,
                            startTime: training.startTime,
                            endTime: training.endTime,
                            squad: training.squad,
                            id: training._id,
                            crews: training.crews
                        }
                    )
                    //This was for when Info Panel wasn't fixed
                    // window.scrollTo({
                    //     top: 0,
                    //     left: 0,
                    //     behavior: "smooth"
                    // })
                    updateInfoPanelDisplay(true)
                }}
            />
        )
    })

    trainingList.sort((a, b) => new Date(a.props.date) - new Date(b.props.date))

    if (props.currentPanel == "trainings") {
        if(props.trainingsLoading){
            return(
                <div className="loading"><img src={loadingImg}></img></div>
            )
        }
        return (
            <div className="main-panel">
                <div className="dates-list-container">
                    <h1>Upcoming Training</h1>

                    <div className="dates-list rounded-top">
                        <div
                            className="create-training-button"
                            name="create-training"
                            onClick={(e) => props.handleClick("create-training")}
                        >
                            <p>Create Training</p>
                        </div>
                        <h3>Today</h3>
                        {trainingList.filter(train => convertDate(train.props.date) === convertDate(Date.now()))}
                        <h3>This Week</h3>
                        {trainingList.filter(train => compareWeek(train.props.date, Date.now()))}
                        <h3>All</h3>
                        {trainingList.filter(train => Date.parse(train.props.date) > Date.now())}
                    </div>
                </div>
                <div className={
                    infoPanelDisplay ? "info-panel-container display" : "info-panel-container"
                }>
                    <div className="info-panel-container-head">
                        <h1>Details</h1>
                        <p className="close-button hide-desktop" onClick={() => updateInfoPanelDisplay(false)}>X</p>
                    </div>
                    <div className="info-panel rounded-top">

                        {!props.currentTraining.name ? "Select a training to display its information" :
                            <div>
                                <div className="info-panel-head">
                                    <h1>{props.currentTraining.name}</h1>
                                    <p>{convertDate(props.currentTraining.date)}</p>
                                </div>
                                <p className="info-panel-time">{`${props.currentTraining.startTime} - ${props.currentTraining.endTime}`}</p>
                                <p>{props.currentTraining.desc}</p>
                                <p className="info-panel-location">Location: {props.currentTraining.location}</p>

                                <div className="info-panel-crews-head">
                                    <h2 className="info-panel-crews">Crews</h2>
                                    <p
                                        className="create-training-button"
                                        name="create-training"
                                        onClick={(e) => props.pageupdate("crew-maker", props.currentTraining, props.currentTraining.squad)}>Create Crews</p>
                                </div>
                                <div className="info-panel-seperator"></div>
                                <div className="info-panel-crew-list">
                                    <Crews crews={props.currentTraining.crews} />
                                </div>
                            </div>
                        }

                    </div>
                </div>

            </div>
        )
    }else if(props.currentPanel == "settings"){
        function handleSubmit(e){

        }
        return(
                <div className="settings-panel-container">
                    <h1>Settings</h1>
                    <div className="seperator"></div>
                    <div className="settings-panel">
                        <h2>Account</h2>
                        <p className="create-training-button">Change Password</p><br></br>
                        <p className="create-training-button">Change User Name</p>

                        <h2>Member Management</h2>
                        <p className="form-drop-down" onClick={() => updateAddMemberDropDown(prevState => !prevState)}>Add Member &#9207;</p>
                        {AddMemberDropDown ? <AddMemeber squads={props.squads}/> : false}<br></br>
                        <p className="form-drop-down" onClick={() => updateFindMemberDropDown(prevState => !prevState)}>Find Members &#9207;</p>
                        {FindMemberDropDown ? <FindMemeber /> : false}<br></br>

                        <h2>Team Management</h2>

                        <h2>Help & Support</h2>

                    </div>

                </div>
        )
    }
}
export default MainPanel
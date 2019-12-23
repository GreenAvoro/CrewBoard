import React, { useState, useEffect } from 'react'
import MemberList from './MemberList'
import CrewList from './CrewList'

function CrewMaker(props) {
    const [memberList, updateMemberList] = useState([])
    const [ boatList, updateBoatList ] = useState([
        {name: "David James",class: 1},
        {name: "Steven Mayo Smith",class: 1},
        {name: "Sweetmans", class: 4},
        {name: "Richard Dykes", class: 2},
        {name: "Drury", class: 4},
        {name: "Kelsey Bevan", class: 2},
        {name: "Noel Playle II",class:  8},
        {name: "Millet Moore", class: 8}
    ])
    const [selected, updateSelected] = useState([])
    const [boatSelected, updateBoatSelected] = useState({})
    const [crews, updateCrews] = useState([
        { id: 1, members: [], boat: {}},
        { id: 2, members: [], boat: {} }
    ])

    //Fetch Members of selected squad
    useEffect(() => {
        fetch(`/api/member?squad=${props.squad}`)
            .then(res => res.json())
            .then(data => {
                data = data.map(member => `${member.firstName} ${member.lastName.substring(0,1)}`)
                updateMemberList(data)
            })
    }, [])

    function boatSelect(boat){
        boatSelected === boat ? 
            updateBoatSelected({}):
            updateBoatSelected(boat)
    }



    function handleSelect(member_name) {
        if (!selected.includes(member_name)) {
            updateSelected(prevState => [...prevState, member_name])
        } else {
            updateSelected(prevState => prevState.filter(item => {
                return item !== member_name
            }))
        }
    }


    function addMembers(crew_id) {
        //Attempt adding selected to crews
        const my_crews = crews.map(item => item)
        if (crew_id !== "memList") {
            my_crews.forEach(crew => {
                if (crew.id === crew_id) {
                    selected.forEach(name => {
                        if (!crew.members.includes(name)) {
                            crew.members.push(name)
                        }
                    })
                    if(Object.getOwnPropertyNames(crew.boat).length === 0){

                        crew.boat = boatSelected
                        //Get boat out of boatlist
                        if (crew_id !== "memList") {
                            updateBoatList(prevState => prevState.filter(boat => {
                                return boat !== boatSelected
                            }))
                        }
                        //Get selected boat out of other crews
                        my_crews.forEach(crew => {
                            if(crew.id !== crew_id){
                                if(crew.boat.name === boatSelected.name){
                                    crew.boat = {}
                                }
                            }
                        })
                        updateBoatSelected({})
                    }
                }
            })
        } else {//Add memebers back to member list
            const newMemList = memberList.map(item => item)
            selected.forEach(mem => {
                if(!newMemList.includes(mem)){
                    newMemList.push(mem)
                }
            })
            updateMemberList(newMemList)
            
            if(Object.getOwnPropertyNames(boatSelected).length !== 0){
                if(!boatList.includes(boatSelected)){
                    const newBoatList = boatList.map(boat => boat)
                    newBoatList.push(boatSelected)
                    updateBoatList(newBoatList)
                    my_crews.forEach(crew => {
                        if(crew.id !== crew_id){
                            if(crew.boat.name === boatSelected.name){
                                crew.boat = {}
                            }
                        }
                    })
                    updateBoatSelected({})
                }
            }
            
        }

        //Get selected out of memberlist
        selected.forEach(item => {
            if (crew_id !== "memList") {
                updateMemberList(prevState => prevState.filter(member => {
                    return member !== item
                }))
            }
            //Get selected out of crewlist by checking every crew list except the one you're
            //trying to add to
            my_crews.forEach(crew => {
                if (crew.id !== crew_id) {
                    var new_crew = []
                    crew.members.forEach((member, i) => {
                        if (!selected.includes(member)) {
                            new_crew.push(member)
                        }
                    })
                    crew.members = new_crew
                }
            })

        })
        
        //Add selected to given crew
        updateCrews(my_crews)

        updateSelected([])
        
    }

    function addCrew() {
        const my_crews = crews.map(item => item)
        my_crews.push({ id: my_crews.length + 1, members: [], boat: {} })
        updateCrews(my_crews)
    }

    function saveCrews(){
        const data_to_send = {training_id: props.training.id,crews: crews}
        console.log(data_to_send)

        fetch('/api/training/addcrews', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data_to_send)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        <div className="content-wrapper">
            <MemberList 
                        boats={boatList} 
                        members={memberList} 
                        memberclick={handleSelect} 
                        selected={selected} 
                        boatselected={boatSelected}
                        listclick={addMembers} 
                        boatclick={boatSelect}
                        savecrews={saveCrews}
            />
            
            <CrewList 
                        crews={crews} 
                        callback={addMembers} 
                        memberclick={handleSelect} 
                        selected={selected} 
                        boatselected={boatSelected}
                        addcrew={addCrew} 
                        boatclick={boatSelect}
            />
        </div>
    )
}

export default CrewMaker
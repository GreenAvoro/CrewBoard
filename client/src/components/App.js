import React, {useState} from 'react';

import Header from './Header'
import CrewMaker from './CrewMaker'
import Calendar from './Calendar'

function App() {
	//Pages:
	//- calendar
	//- crew-maker
	const [page, updatePage] = useState("calendar")
	const [selectedTraining, updateSelectedTraining] = useState({})
	const [selectedSquad, updateSelectedSquad] = useState([])
	function changePage(toPage,training = null,squad = null){
		if(toPage === 'calendar'){
			updatePage('calendar')
		}else if (toPage === "crew-maker"){
			updateSelectedSquad(squad)
			updateSelectedTraining(training)
			updatePage('crew-maker')
		}
	}
	
	return (
		<div>
			<Header page={page} pageupdate={updatePage}/>
			<div className="header-spacer"></div>
			{page === "crew-maker" ? <CrewMaker squad={selectedSquad} training={selectedTraining} pageupdate={changePage}/>:null}
			{page === "calendar" ? <Calendar pageupdate={changePage}/>:null}
		</div>
	)
}

export default App;

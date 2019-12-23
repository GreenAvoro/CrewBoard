import React from 'react'

import LogoImg from '../images/logo.png'

function Header(props){
    function handleClick(e){
        props.pageupdate("calendar")
    }
    return(
        <header>
            <img onClick={handleClick} src={LogoImg} alt="CrewBoard"></img>
            <nav>
                <p>Some link</p>
            </nav>
        </header>
    )
}
export default Header
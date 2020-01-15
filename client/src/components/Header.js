import React from 'react'

import LogoImg from '../images/logo.png'

function Header(props){
    function handleClick(e){
        props.pageupdate("calendar")
    }
    return(
        <header>
            <div class="header-left">
                <a href="" >Home</a>
                <a href="">Search</a>
            </div>
            <img src={LogoImg}></img>
            <div class="header-right">
                
                <a href="">Options</a>
            </div>
        </header>
    )
}
export default Header
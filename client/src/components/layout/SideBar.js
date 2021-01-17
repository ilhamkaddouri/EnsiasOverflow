import React from 'react'
import './style.css'
import {SideBarData} from './SideBarData'
function SideBar() {
    return (
        <div className='sidebar'>
            <ul className='sidebarlist'>
                {SideBarData.map((val,key)=>{
                    return(
                        <li className='rw' key={key} onClick={()=>{window.location.pathname = val.link}}><div id='icon'>{val.icon}</div>{" "}<div id='title'>{val.title}</div></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SideBar

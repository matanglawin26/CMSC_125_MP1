import React from 'react'
import Grid from "./Grid"
import './background.css'

function Background(props) {
    return(
        <div className={`fixed fill background grid-bg`} style={{position:'absolute',top:'0',left:'0'}}>
            <Grid/>
        </div>
    )
}

export default Background;
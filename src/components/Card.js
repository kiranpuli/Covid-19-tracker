import React from 'react'

import "./Card.css"

function Card({title,cases,total,caseType,...props}) {
    return (
        <div  onClick={props.onClick} className={`card shadow info-cards text-light  ${(caseType==="cases")?"bg-warning ":((caseType==="recovered")?"bg-success":"bg-danger")}`} >
            <div className="card-header"><h4>{title}</h4></div>
            <div className="card-body">
                <p className="card-text">{cases} Today</p>
                <h5 className="card-title">Total {total}</h5>
            </div>
        </div>
    )
}

export default Card

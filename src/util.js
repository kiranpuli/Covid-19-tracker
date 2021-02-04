import React from "react"
import numeral from "numeral"
import {Circle,Popup}  from "react-leaflet"

export const caseTypeColors = {
    cases:{
        hex:"#f0ad4e",
        rgba:"rgb(240, 173, 78,0.5)",
        multiplier:800
    },
    recovered:{
        hex:"#5cb85c",
        rgba:"rgb(92, 184, 92,0.5)",
        multiplier:1200
    },
    deaths:{
        hex:"#d9534f",
        rgba:"rgb(217, 83, 79,0.5)",
        multiplier:2000
    },
}

export const sortData = (data)=>{
    const sortedData = [...data]

    sortedData.sort((a,b)=>{
        return  a.cases>b.cases?-1:1
    })
    return sortedData
};

export const showDataonMap = (data,caseType="cases")=>(
    data.map(country=>(
        <Circle
            center={[country.countryInfo.lat,country.countryInfo.long]}
            fillOpacity={0.4}
            color={caseTypeColors[caseType].hex}
            fillColor={caseTypeColors[caseType].hex}
            radius={
                Math.sqrt(country[caseType])*caseTypeColors[caseType].multiplier
            }
        >
            <Popup>
                <p className="text-center"><span><img src={country.countryInfo.flag} height="10px" alt={country.country}/></span> {country.country}</p>
                <li>Cases : {numeral(country.cases).format("0,0")}</li>
                <li>Recovered : {numeral(country.recovered).format("0,0")}</li>
                <li>Deaths : {numeral(country.deaths).format("0,0")}</li>        
            </Popup>
        </Circle>
    ))
)

export const prettify = (stat)=>(
    stat?`+${numeral(stat).format("0.0a")}`:"+0"
)
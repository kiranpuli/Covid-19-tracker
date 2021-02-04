import React,{useState, useEffect} from 'react'
import numeral from "numeral"

import Card from './components/Card'
import Map from './components/Map'
import Table from "./components/Table"
import Graph from "./components/Graph"
import Foot from "./components/Foot"

import {sortData,prettify} from "./util"

import "leaflet/dist/leaflet.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setcountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({lat:30.80746,lng:-10.4796})
  const [zoom, setZoom] = useState(1.5)
  const [mapCountries, setMapCountries] = useState([])
  const [caseType, setCaseType] = useState("cases")

  //when app loads
  useEffect(()=>{
    const url= "https://disease.sh/v3/covid-19/all"
    fetch(url).then(res=>res.json()).then(data=>{
      setcountryInfo(data)
    })
  },[])

  useEffect(()=>{
    const getCountriesData = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
            .then(res=>res.json())
            .then((data)=>{
              let countries =data.map((e)=>(
                {
                  name:e.country,
                  value:e.countryInfo.iso3
                }
              ))
              const sortedData = sortData(data)
              setTableData(sortedData)
              setCountries(countries)
              setMapCountries(data)
            })
    }
    getCountriesData()
  },[])

  const onCountryChange = (e) =>{
    const countryCode = e.target.value
    const url= countryCode==="worldwide"?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`
    fetch(url).then(res=>res.json()).then(data=>{
      setCountry(countryCode)
      setcountryInfo(data)
      if(countryCode!=="worldwide"){
        setMapCenter([data.countryInfo.lat,data.countryInfo.long])
        setZoom(4)
      }else{
        setMapCenter([30.80746,-10.4796])
        setZoom(1.5)
      }
    })
  }


    
  return (
    <div className="container-fluid bg-dark text-light">
        <header className="row justify-content-center align-items-center p-3 ">
          <h1 className="col-8 text-danger">
          {/* <span> <img src="../assets/virus" height="10px"/> </span>  */}
           Covid-19 Dashboard
          </h1>
          <div className="dropdown sol-4">
            <select 
              className="btn btn-outline-light border shadow" 
              value={country}
              onChange={onCountryChange}
            >
              <option value="worldwide" >WorldWide</option>
              {
                countries.map((e)=>(
                  <option value={e.value}>{e.name}</option>
                ))
              }
            </select>
          </div>
        </header>
        <section className="row">
          <div className="left col-md-8">
              <div className="info-box">
                <Card 
                  caseType="cases"
                  title="Covid-19 Cases" 
                  cases={prettify(countryInfo.todayCases)} 
                  total={numeral(countryInfo.cases).format("0,0")}className=""
                  onClick={()=>{setCaseType("cases")}}
                />
                <Card 
                  caseType="recovered"
                  title="Recovered" 
                  cases={prettify(countryInfo.todayRecovered)} 
                  total={numeral(countryInfo.recovered).format("0,0")} className=""
                  onClick={e=>setCaseType("recovered")}
                />
                <Card 
                  caseType="deaths"
                  title="Deaths" 
                  cases={prettify(countryInfo.todayDeaths)} 
                  total={numeral(countryInfo.deaths).format("0,0")} className=""
                  onClick={()=>{setCaseType("deaths")}}
                />
              </div>
              <div>
                <Map
                  countries={mapCountries}
                  caseType={caseType}
                  center={mapCenter}
                  zoom={zoom}
                />
              </div>
          </div>
          <div className="right col-md-4">
            <div className="p-3">
                <Table countries={tableData}/>
            </div>
            <div className="p-3">
                <Graph
                  caseType={caseType}
                />
            </div>
          </div>
        </section>
        <Foot/>
    </div>
  )
}

export default App







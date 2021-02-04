import React from 'react'
import { Map as LeafletMap,TileLayer } from 'react-leaflet'

import {showDataonMap} from "../util"

import "./Map.css"

function Map({countries,caseType,center,zoom}) {
    return (
        <div className="map pt-5 pb-5">
            <LeafletMap center={center} zoom={zoom} className="shadow">
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Loop through all the coutries to draw circles */}
                {showDataonMap(countries,caseType)}
            </LeafletMap>
        </div>
    )
}

export default Map

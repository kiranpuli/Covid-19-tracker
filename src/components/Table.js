import React from 'react'
import numeral from "numeral"
import "./Table.css"
function Table({countries}) {
    return (
        <div className="my-table ">
            <h4 className="text-center">Live cases</h4>
            <table className="table table-striped shadow table-sm table-dark">
                <thead>
                    <tr>
                    <th scope="col"><h5>Country</h5></th>
                    <th scope="col"><h5>Cases</h5></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        countries.map(({country,cases})=>(
                            <tr>
                                <td>{country}</td>
                                <td>{numeral(cases).format("0,0")}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table

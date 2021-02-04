import React,{useEffect,useState} from 'react'
import { Line } from 'react-chartjs-2'
import numeral from "numeral"
import {caseTypeColors} from "../util"

const options = {
    legend:{
        display:false
    },
    elements:{
        points:{
            radius:0
        }
        // pointRadius:0
    },
    maintainAspectRatio:true,
    tooltips:{
        mode:"index",
        intersect:false,
        callbacks:{
            label: function(tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },
    scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    parser:"MM/DD/YY",
                    tooltipFormat:"ll"
                }
            }
        ],
        yAxes:[{
            gridLines:{
                display:false
            },
            ticks:{
                callback : function(value,index,values){
                  return numeral(value).format("0a")
                }
            }
        }
        ]
    }
}

function Graph({caseType}) {
    const [data, setData] = useState({});

    const buildChartData = (data,caseType="cases")=>{
        const chartData = [];
        let lastData;
        for(let date in data[caseType]){
            if(lastData){
                const newData = {
                    x:date,
                    y:data[caseType][date]-lastData
                }
                chartData.push(newData)
            }
            lastData=data[caseType][date]
        }
        return chartData;
    }
    
    // https://disease.sh/v3/covid-19/historical/all?lastdays=120
    useEffect(() => {

        const fetchData = async ()=>{
            
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then(res=>res.json())
                .then(data=>{   
                    const chartData = buildChartData(data,caseType);
                    setData(chartData)
                })
        }

        fetchData();

    }, [caseType])



    return (
        <div>
            <h4 className="text-center">Worlwide new {caseType}</h4>
            {
                data?.length>0 &&(
                    <Line
                        data={{
                            datasets:[{
                                data:data,
                                backgroundColor:caseTypeColors[caseType].rgba,
                                borderColor:caseTypeColors[caseType].hex
                            }]
                        }}
                        options = {options}
                    />
                )
            }
        </div>
    )
}

export default Graph

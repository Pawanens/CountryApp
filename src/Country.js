import React, { useState, useEffect, useRef } from 'react'
import './Country.css'
export default function Country() {
    const [country, Setcountry] = useState([]);
    const [CImage, SetCimage] = useState();
    const [Region , SetRegion] =useState();
    const [Population , SetPopulation] =useState();
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all").then((resolve_item) => {
            return resolve_item.json();
        }).then(json_data => {
            Setcountry(json_data);
            let tgtselect_item =  document.getElementById("select_opt");
            console.log(tgtselect_item)
            setTimeout(()=>{
                console.log(tgtselect_item.value)
               let x =  json_data.filter(element => {
                    return element.name.common == tgtselect_item.value;
                });
                console.log(x[0])
                SetCimage(x[0].flags.png);
                SetRegion(x[0].region)
                SetPopulation(x[0].population)
            },100)
           
          
        });
    }, [])

    function select_opt(event) {
        let select_opt = event.target.value;
        let filter_item = country.filter((filter) => {
            return filter.name.common == select_opt;
        })
        SetCimage(filter_item[0].flags.png);
        SetRegion(filter_item[0].region)
        SetPopulation(filter_item[0].population)
    }

    return (
        <>
            <div className='main_div'>
                <div className='inner_Div'>
                <div className='select_opt'>
                <h1>Select any one option</h1>
                    <select name="" id="select_opt" onChange={select_opt}>
                        {
                            country.map((map_item) => {
                           {/* console.log(map_item)  */}
                             {/* console.log(map_item.region)  */}
                                {/* SetCimage(map_item.flags.png) */ }
                                return (
                                    <>
                                        <option value={map_item.name.common} >{map_item.name.common}</option>
                                    </>
                                )
                            })
                        }
                    </select>
                    </div>
                    <div className='content_div'>
                    <div>
                    <img id="set_img" src={CImage} alt="" />
                    <p>Region:-{Region}</p>
                  
                    <p>Population:-{Population}</p>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

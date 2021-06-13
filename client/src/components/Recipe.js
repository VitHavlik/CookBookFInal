import React, {useContext} from 'react'
import {GlobalContext} from "../context/globalContext/globalContext"
const Recipe = ({cislovporadi,title,eventklik}) => {
    const {zmenSurovinu} = useContext(GlobalContext);
    return (
        <div>
           {cislovporadi} - {title}
           <div className="btn" onClick={() => {
               zmenSurovinu(title);
               eventklik(title);
           }}>Zobraz detail</div>
        </div>
    )
}
export default Recipe
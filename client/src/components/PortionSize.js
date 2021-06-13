import React, { useRef, useState, useEffect } from "react"
import ConfirmationWindow from "./ConfirmationWindow"
 

function PortionSize(props) {
    const ingredients = props.ingredient.map((ingredient)=>{
       return ingredient
    } )
    console.log(ingredients)
  
    const defaultDataRecipe =   JSON.parse(JSON.stringify(ingredients))
    const [isConfirmationWindow, setIsConfirmationWindow] = useState(false)
    const [message, setMessage] = useState("")
    console.log(props)
    
    const [portionSize, setPortionSize] = useState(ingredients)
    const refNumberOfPortions = useRef(null)
    

    function closeModal() {
        setIsConfirmationWindow(false)
      }
  
    function handleChange(e) {
        e.preventDefault()
        const value = e.target.value
        if(value < 0){
            setMessage("Takhle nic neuvaříš")
            setIsConfirmationWindow(true)
        }
            defaultDataRecipe.forEach((recipe) => {
             recipe.amount = recipe.amount * value

         
            setPortionSize(defaultDataRecipe)
          
        })
      
    }
useEffect(()=> {
        refNumberOfPortions.current.focus()
    }, [] )

    return <React.Fragment>
    {isConfirmationWindow && (<ConfirmationWindow modalContent={message} closeModal={closeModal} />)}
        <ul>
            {portionSize.map((recipeIngredients) => {
                const { name, unit, id, amount } = recipeIngredients


                return <li key={id}>{name} {amount}  {unit} </li>
            })}
        </ul>
        <form>
            <label htmlFor="portionSize"> Počet porcí: </label>
            <input type="number" id="portionSize" name="portionSize" onChange={handleChange} defaultValue = {1} ref = {refNumberOfPortions} ></input>
        </form>


    </React.Fragment>
}

export default PortionSize
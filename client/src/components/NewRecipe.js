import React, {useState } from 'react';
import ConfirmationWindow from "./ConfirmationWindow"
import IngredientList from "./ingredientList";
const NewRecipe = () => {
  const [recipes, setRecipes] = useState([])
  const [recipe, setRecipe] = useState({ name: "", description: "", preparationTime: 0, ingredients: "", img: "", method: "" })
  const [isConfirmationWindow, setIsConfirmationWindow] = useState(false)
  const [message, setMessage] = useState("")
const [ingredients, setIngredients] = useState([]); //new
const [whatToRemove, setWhatToRemove] = useState("");
const [saved, setSaved] = useState(false);
const [isIngredient, setIsIngredient] = useState(false);
  function closeModal() {
    setIsConfirmationWindow(false)
  }
  function handleSubmit(e) {
    e.preventDefault()
    console.log(recipe.name)
    console.log(recipe.preparationTime)
    console.log(ingredients)
    console.log(recipe.description)
    console.log(recipe.img)
    if (recipe.name && recipe.preparationTime && ingredients && recipe.description && recipe.img) {
     console.log("Prošlo to")
      const newRecipe = { ...recipe, id: new Date().getTime().toString() }
      setRecipes([...recipes, newRecipe])
        fetch("http://localhost:5000/save-recipe", {
          method: "post",
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            title: recipe.name,
            description: recipe.description,
            image: recipe.img,
            preparation: recipe.preparationTime,
            method: recipe.method,
            unit: ingredients.unit,
            ingredience: ingredients
          })
        }).then((data) => {
          return data.json();
        }).then((finalData) => {
          console.log(finalData.msg);
          setSaved(true);
        })
      
          // http://localhost:5000/save-material
          // method post, name


      // Konec odesílání dat na server
      setRecipe({ name: "", description: "", preparationTime: "", ingredients: "", method: "", img: "" })
      setMessage("Recept byl vytvořen")
      setIsConfirmationWindow(true)

    }
    else {
      console.log("Neprošlo to")
      setMessage("Vyplňte všechna pole")
      setIsConfirmationWindow(true)
    }
   
  }
  function handleClickIngredient (e){
    e.preventDefault()

    fetch("http://localhost:5000/save-material", {
    method: "post",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify({
   
      name: recipe.ingredients,
  
    })
  }).then((data) => {
    return data.json();
  }).then((finalData) => {
    console.log(finalData.msg);
   setIsIngredient(true)
  })

  }

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    setRecipe({ ...recipe, [name]: value })
    console.log(recipe)
    console.log(value)
  }


const addIngredients = (ingredient) => {
  const array = [...ingredients];
  array.push(ingredient);
  setIngredients(array);
}
const changeIngredients = (e,index) => {
  if(e.target.value>0){
  const array = [...ingredients];
  array[index].amount = e.target.value;
  setIngredients(array);
}
}
const changeUnit = (e, index) => {
  const array = [...ingredients];
  array[index].unit = e.target.value;
  setIngredients(array);
}
const removeIngredience = (index) => {
  const item = ingredients[index].name;
  const filter = ingredients.filter((ing) => {
    return ing.name !== item;
  })
  setIngredients(filter);
  setWhatToRemove(ingredients[index]);
}
  return <React.Fragment>
    {saved?<>Recept byl úspěšně uložen</>:<> {isConfirmationWindow && (<ConfirmationWindow modalContent={message} closeModal={closeModal} />)}
    <article>
      <form className="form" onSubmit={handleSubmit}>
        <div >
          <label htmlFor="name">Název receptu : </label>
          <input type="text" id="name" name="name" value={recipe.name} onChange={handleChange}></input></div>
        <div >
          <label htmlFor="description">Krátký popis pokrmu: </label>
          <input type="text" id="description" name="description" value={recipe.description} onChange={handleChange}></input></div>
        <div >
          <div >
            <label htmlFor="method">Krok za krokem : </label>
            <input type="text" id="method" name="method" value={recipe.method} onChange={handleChange}></input></div>


          <label htmlFor="preparationTime">Doba přípravy : </label>
          <input type="number" id="preparationTime" name="preparationTime" value={recipe.preparationTime} onChange={handleChange}></input> min</div>
        <div>
          <label htmlFor="img">Obrázek (url) </label>
          <input type="text" id="img" name="img" value={recipe.img} onChange={handleChange}></input></div >

         <div>
          <label htmlFor="ingredients">Ingredience : </label>
           <input type="text" id="ingredients" name="ingredients" value={recipe.ingredients} onChange={handleChange}></input>
           <button className = "btn" onClick = {handleClickIngredient}> Přidat ingredienci </button> </div>
    {
      //New code
    }
    <div>
      {isIngredient ? " Ingredience přidána" :""}
    </div>
     <div className="ingredients">
       <h2>Seznam surovin</h2>
       {
         ingredients.map(({name, unit}, index) => {
           return(
             <div key={index} className="ingredient" style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between",
              borderBottom:"1px solid grey",
              maxWidth:"60vw",
              margin:"0px 10px"
          }}>
             
                <div className="name">{name}</div>
                <input style={{textAlign:"center"}} type="number" value={ingredients[index].amount} onInput={(e) => {
                  changeIngredients(e,index);
                }}/>
                <div className="select">
                  <select onChange={(e) => {
                    changeUnit(e,index);
                  }}>
                    <option value={unit}>vybrat jednotku</option>
                    <option value="ks">ks</option>
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                  </select>
                </div>
                <div className="btn btn-danger" onClick={() => {
                  removeIngredience(index)
                }}>Odstranit</div>
             </div>
           )
         })
       }
    
     </div>
     <IngredientList datasetter={addIngredients} remover={whatToRemove}/>

     {
      //New code END
    }
        <button type="submit" className="btn">Submit</button>

      </form></article>
    {recipes.map((rec) => {
      const { name, description, preparationTime, ingredients, id } = rec
      return <div className="item" key={id}>
        <h4>{name}</h4>
        <p> {description}</p>
        <p> {preparationTime} min</p>
        <p> {ingredients}</p>

      </div>
    })}</>}
   
  </React.Fragment>


};

export default NewRecipe;

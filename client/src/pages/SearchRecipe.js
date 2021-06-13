import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"


function SearchRecipe(props) {
    const [recipes, setRecipes] = useState([]);
    const [recipesFiltered, setRecipesFiltered] = useState([])
    const [input, setInput] = useState("")
    const [value,setValue] = useState("")
  




    useEffect(() => {
        pridaniReceptu();
    }, [])

    const pridaniReceptu = async () => {
      
        const data = await fetch("http://localhost:5000/get-recipes");
        const finalData = await data.json();
        const {documents} = finalData;

       
        console.log(documents)
        setRecipes(documents);

    }

   
    
    function handleChange(e) {
        setValue(e.target.value)
        const filtered = recipes.filter(recipe => {
            return  recipe.title.toLowerCase().includes(value.toLowerCase())
           })
      setRecipesFiltered(filtered)
    }
    


  

    return <React.Fragment>
        <input value = {value} onChange = {handleChange}></input>
    
  


        <div>
            {
                recipesFiltered.map((recipe, index) => {
                    console.log(recipe)

                    return (
                        <section key={recipe._id}>

                            {

                                <div className="container-fluid p-3 w-50">
                                    <div className="card-deck">
                                        <div className="card">
                                            <div className="card-body p-1">
                                                <h6 className="card-title">{recipe.title}</h6>
                                                <img src={recipe.image} className="img-thumbnail" alt="Obráezk receptu" />
                                                <p className="card-text"><b> Krátký popisek:</b> {recipe.description}</p>
                                                <p className="card-text">Ingredience: {recipe.ingredience} </p>
                                                <p className="card-text">Doba přípravy: {recipe.preparation} min</p>
                                                <p className="card-text">Postup: {recipe.method}</p>
                                                <Link to={`recipes/${recipe._id}`} >  <button className="btn">Detail</button> </Link>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            }
                        </section>
                    )
                })
            }
        
       
        </div>
        )


    </React.Fragment>  }




    export default SearchRecipe
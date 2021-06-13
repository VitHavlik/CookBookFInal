import React,{useState, useEffect} from 'react'
import {Link} from "react-router-dom"


const Main = () => {
    const [recipes, setRecipes] = useState([]);
    const [serverMessage, setServerMessage] = useState("");
    const [kliknutoUzivatelem] = useState("");

    

    useEffect(() => {
        pridaniReceptu();
    }, [])

    const pridaniReceptu = async () => {
    setServerMessage("načítám data");
     const data = await fetch("http://localhost:5000/get-recipes");
     const finalData = await data.json();
     const {msg, documents} = finalData;
     
     console.log(msg, documents)
    setRecipes(documents);
    setServerMessage(msg);
    
    
    }
    
    return (
        <div>
            {
                recipes.map((recipe,index) => {
                  
                    return(
                        <section key = {recipe._id}>
                            
      {
    
          <div className="container-fluid p-3 w-50">
              <div className="card-deck">
                  <div className="card">
                      <div className="card-body p-1">
                          <h6 className="card-title">{recipe.title}</h6>
                          <img src={recipe.image} className="img-thumbnail" alt="Obrázek receptu" />
                          <p className="card-text"><b> Krátký popisek:</b> {recipe.description}</p>
                          <p className="card-text">Ingredience: {recipe.ingredience.map((ing) => {
                              return(
                                  <span style={{border:"1px solid black", padding:4, margin:3}}>{ing.name} {ing.amount}{ing.unit}</span>
                              )
                          })} </p>
                          <p className="card-text">Doba přípravy: {recipe.preparation} min</p>
                          <p className="card-text">Postup: {recipe.method}</p>
                      <Link to = {`recipes/${recipe._id}`} >  <button className = "btn">Detail</button> </Link>
                     
                      </div>
                  
                  </div>
                   
              </div>
            
          </div>
     
      }
  </section>
                    )                 
                })
            }
            <div className="msg">{serverMessage}</div>
            {kliknutoUzivatelem}
        </div>
    )
}

export default Main
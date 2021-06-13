import React,{useState, useEffect} from 'react'
const Recipes = () => {
    const [recipes, setMaterialy] = useState([]);
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
    setMaterialy(documents);
    setServerMessage(msg);
    }
  
    return (
        <div>
            {
                recipes.map((recipe,index) => {
                    return(
                        <section>
      {
    
          <div className="container-fluid p-3 w-50">
              <div className="card-deck">
                  <div className="card">
                      <div className="card-body p-1">
                          <h6 className="card-title">{recipe.title}</h6>
                          <img src={recipe.image} className="img-thumbnail" alt="Obrázek receptu" />
                          <p className="card-text">{recipe.description}</p>
                          <p className="card-text">{recipe.preparation}</p>
                          <p className="card-text">{recipe.method}</p>
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

export default Recipes
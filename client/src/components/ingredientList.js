import React, {useState, useEffect} from 'react'

const IngredientList = ({datasetter, remover}) => {
    const [ingredient, setIngredient] = useState([]);

    const getIngredients = async () => {
        try {
            const dataCall = await fetch("http://localhost:5000/get-materials");
            const data = await dataCall.json();
            setIngredient(data.documents);
        } catch (error) {
            console.log(error);
            setIngredient([]);
        }
        
    }
    useEffect(() => {
        if(remover.length<1){
            getIngredients();    
        }else{
        const array = [...ingredient];
        array.push(remover);
        setIngredient(array);
        }  
     return false;
     //eslint-disable-next-line
    }, [remover])

    const addIngredient = (index) => {
        const {_id, name} = ingredient[index];
        datasetter(
           {
               name,
               _id:_id,
               amount:0,
               unit:["-"]
           }
        )
        const filtered = ingredient.filter((item) => {
            return item.name !== name;
        })
        setIngredient(filtered);
      
    }
    return (
        <div>
            <h2>Výběr surovin do receptu</h2>
            
            <div style={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-between",
                        borderBottom:"1px solid grey",
                        maxWidth:"60vw",
                        margin:"0px 10px"
                    }} className="eachingredient">
                        <div className="name"><strong>Název</strong></div>
                        <div className="id"><strong>ID Materiálu</strong></div>
                        <div></div>
                    </div>
            {ingredient.map((ingredient, index) => {
                return(
                    <div style={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-between",
                        borderBottom:"1px solid grey",
                        maxWidth:"60vw",
                        margin:"0px 10px"
                    }} key={index} className="eachingredient">
                        <div className="name">{ingredient.name}</div>
                        <div className="id">{ingredient._id}</div>
                        <div className="btn btn-success" onClick={() => {
                            addIngredient(index);
                        }}>Přidat</div>
                    </div>
                )
            })}
        </div>
    )
}

export default IngredientList
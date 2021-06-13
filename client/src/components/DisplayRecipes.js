import React from "react"


function DisplayRecipes(){
  

   return (
     <div>       
     <section>
       <div className="container-fluid p-3 w-50">
           <div className="card-deck">
               <div className="card">
                   <div className="card-body p-1">
                       <h6 className="card-title">{recipe.title}</h6>
                       <img src={recipe.image} className="img-thumbnail"></img>
                       <p className="card-text">{recipe.description}</p>
                       <p className="card-text">{recipe.preparation}</p>
                       <p className="card-text">{recipe.method}</p>
                   </div>
               </div>
           </div>
       </div>
</section>
</div>
 )
  
     

     
 
    





   
}
export default DisplayRecipes
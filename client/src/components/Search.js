import React, {useState} from 'react';




const SearchBar = () => {
  const [keyword, setKeyword] = useState("")

  console.log(keyword)
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};

  return (
    <input 
     style={BarStyling}
     key="searchNav"
     value={keyword}
     placeholder={"search recipe"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar
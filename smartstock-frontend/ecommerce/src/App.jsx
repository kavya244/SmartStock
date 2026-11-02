import React, { useState } from 'react'
import Login from './Comp/Login'
import ProductList from './Comp/Productlist'



const App = () => {
  const [isLogin,setLogin]=useState(false)

  return (
    <div>
        {isLogin?<ProductList setLogin={setLogin}/>:<Login setLogin={setLogin}/>}
    </div>
  )
}

export default App
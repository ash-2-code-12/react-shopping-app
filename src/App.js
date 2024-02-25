
import { ProductCard } from './components/ProductCard';

import './App.css';

import { FaShoppingCart } from "react-icons/fa";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { useState } from 'react';

import { BsFillSearchHeartFill } from "react-icons/bs";
import axios from 'axios';
import { Cart } from './components/Cart';
import { useEffect } from 'react';


function App() {


  const [pdtData, setPdtData] = useState([]);
  const [dupData, setDupData] = useState([]);
  const [cart, setCart] = useState([]);
  const chosen = false;
  const [searchInput, setSearchInput] = useState("");
  const [SelectIdNo, setIdNo] = useState(0);
  

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then(response => setPdtData(response.data))
    
  }, [])

  useEffect(() => {
    setDupData(pdtData);
  }, [pdtData]);
  
  let categoryList=pdtData.map(item=> item.category);
  categoryList=[... new Set(categoryList)];
  

  // add to cart
  const addToCart = (pdt) => {
    pdt.SelectId = SelectIdNo; //assigning selection id to uniquely identify the selected card
    console.log("selected no:" + pdt.SelectId);
    setIdNo(SelectIdNo + 1); //updating for next selection

    setCart(cart.concat(pdt))
  }

  //remove from cart
  const removeItem = (pdt) => {
    let productId = pdt.SelectId;
    console.log("removed" + pdt.SelectId);
    let updatedCart = cart.filter(item => item.SelectId !== productId);
    setCart(updatedCart);
  }


  const onSearch = (e) => {
    setDupData(pdtData.filter(item => item.title.toLowerCase().includes(e.toLowerCase()) || item.description.toLowerCase().includes(e.toLowerCase()) || item.category.toLowerCase().includes(e.toLowerCase())))

  }

  const onCategorySelect =(item)=>{
    setDupData(pdtData.filter(a => a.category === item));
  }
  
  const onSortSelect=(val)=>{
    let newList = [];
    if(val==="pasc"){
      newList=[...pdtData].sort((a,b)=> a.price - b.price);
    }
    else if(val === "pdesc"){
      newList=[...pdtData].sort((b,a)=> a.price - b.price);
    }
    else if(val === "rasc"){
      newList = [...pdtData].sort((a,b)=> a.rating.rate - b.rating.rate);
    }
    else if(val === "rdesc"){
      newList = [...pdtData].sort((b,a)=> a.rating.rate - b.rating.rate);
    }
    else {
      setDupData(pdtData);
      return;
    }
    setDupData(newList);
    

  }

  return (
    <div className='  main-bg p-5'>

      {/* navbar */}
      <div className='p-3 col-12 fixed-top'>
        <nav className="navbar nav-rounder navbar-expand-lg navbar-light bg-light p-3">
          <a className="navbar-brand ml-4 nav-name" href="#"><RiShoppingBag3Fill size="34" className='mr-3 pb-1' />Swift Buy</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active ml-1">
                <a className="nav-link" href="#">Home </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link " href="#"><FaShoppingCart /></a>
              </li>
            </ul>

          </div>
          <BsFillSearchHeartFill size="20" className='mr-2' color='crimson' />
          <input className='search-bar mr-3' placeholder='Find Products...' onChange={(e) => onSearch(e.target.value)} />
        </nav>
      </div>
      {/* end of navbar */}


      {/* homepage */}
      <div className='d-flex justify-content-between mt-5'>

        <div className='d-flex col-12  col-lg-10 justify-content-start'>

          <div className='d-flex flex-column justify-content-start'>
            {/* banner section */}
            <div className=' banner-img  d-flex flex-direction justify-content-end text-left bg-light'>
              
            </div>

            <div className="row">
              {
                dupData.map((item) =>
                  <>
                    <ProductCard addToCart={addToCart} props={item} chosen={chosen} removItem={removeItem} />
                    {/* one way binding : sending object(data) to child component */}
                  </>
                )
              }
            </div>

          </div>
          {/* sidebar */}
          <div className='py-5 d-flex flex-column justify-content-start d-none d-lg-block col-lg-2 side-bar shadow-lg'>

            <p className='sidebar-category'>Categories:</p>
            <div className='categories pl-3'>
              {
                categoryList.map(item=> 
                <div onClick={()=>onCategorySelect(item)} className='mb-2 '>{item}</div>)
              }
            </div>
            <p className='sidebar-category mt-3'>Sort By :</p>
            
            <div className='categories pl-3'>
              <div className='mb-2' onClick={()=>onSortSelect("pasc")}>Price: Low to High</div>
              <div className='mb-2' onClick={()=>onSortSelect("pdesc")}>Price: High to Low</div>
              <div className='mb-2' onClick={()=>onSortSelect("rasc")}>Rating: Low to High</div>
              <div className='mb-2' onClick={()=>onSortSelect("rdesc")}>Rating: High to Low</div>
            </div>
            { dupData===pdtData  || 
              <div className='categories mt-5 text-center' onClick={()=>setDupData(pdtData)}><div>Reset</div></div>
}
          </div>
        </div>
          {/* end of homePage */}

      </div>
    </div>

  );
}
{/*  */ }
export default App;


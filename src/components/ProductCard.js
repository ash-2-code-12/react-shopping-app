import './ProductCard.css';
//import airpods from './airpods.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from "react-icons/fa";



const ProductCard =(keyObj)=>{

    //console.log(keyObj);

    const addToCart=()=>{ 
        console.log("add")
        keyObj.addToCart(keyObj.props); 
    }

    const num = Math.ceil(keyObj.props.rating.rate)-1;
    let stars = [];
    for (let i=0 ; i<num; i++){
      stars.push(i);
    }




    return(
        
        <div className='col-8 col-md-4 col-lg-3  product-card text-center m-5 shadow-lg px-3 pt-3'>
          <img className="pdt-img mb-3" src={keyObj.props.image} alt="noImg"/>
        
          
          <p className='pdt-name'>
            {keyObj.props.title}
          </p>
          
          <p className='desc '>{keyObj.props.description}</p>
        
          <div className='d-flex justify-content-between'>
            <p className='ml-2'> $ {keyObj.props.price} </p>
            <div className='mr-2'>
            {stars.map(item=><FaStar className='mr-1' color='gold' size="16"/>)}
          </div>
          
          
          
        </div>
        
        {
            keyObj.chosen ? <button onClick={()=>(keyObj.removeItem(keyObj.props))} className='btn btn-style'>remove from cart</button>
            :
            <button onClick={addToCart} className='btn btn-style'>Add to cart</button>
        }

        
        
        </div>
    )
}
export {ProductCard};
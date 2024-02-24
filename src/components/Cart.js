import { ProductCard } from "./ProductCard";

const Cart = (keyObj) => {

    const cart=keyObj.cart;
    const chosen = keyObj.chosen;
    return (
        <div>
            <p className='cart-text'>CART:</p>
            <div className="row">
                {
                    cart.map((item) =>
                        <>
                            <ProductCard props={item} chosen={!chosen} addToCart={keyObj.addToCart} removeItem={keyObj.removeItem} />
                        </>
                    )
                }
             </div>
        </div> 
    )
}
export { Cart };
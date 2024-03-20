import { useEffect, useMemo, useState } from 'react'
import type {Guitar, CartItem} from '../types'
import { db } from '../data/db';

const useCart = () => {

    //comprobar que haya algo en el carrito
    const initialCart = () : CartItem[]=> {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [ data ] = useState(db)	
    const [ cart, setCart ] = useState(initialCart)	

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])


    function addToCart(item : Guitar) {
        //comprobar que no exista el item en el carrito
        const itemExist = cart.findIndex( guitar => guitar.id === item.id)

        // si exite, copio el cart y en el item que esta en el array le sumo 1
        if (itemExist >= 0){
            if(cart[itemExist].quantity >= MAX_ITEMS) return;
            const updateCart = [...cart]
            updateCart[itemExist].quantity++	
            setCart(updateCart)
        } else {
            const newItem : CartItem = { ...item, quantity : 1}
            setCart([...cart, newItem] )
        }
    }

    function removeFromCart(id : Guitar['id']){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id : Guitar['id']){
        const updateCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            } 
            return item
        })

        setCart(updateCart)
    }

    function decreaseQuantity(id : Guitar['id']){
        const updateCart = cart.map(item => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            } 
            return item
        })

        setCart(updateCart)
    }

    function clearCart(){
        setCart([])
    }

    //state derivado
    //useMemo evita que se reenderice la funcion, mejora rendimiento
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);


    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }   
}

export default useCart
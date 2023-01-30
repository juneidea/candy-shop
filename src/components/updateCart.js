const postItems = ({cartId, stockId, quantity, setCart}) => {
    fetch(`/api/cart/${cartId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({        
            stockId,
            quantity,
    })}).then((res) => res.json()).then((cartUpdate) => {
        setCart(cartUpdate)
    })
}

const updateItemQuantity = ({cartId, stockId, quantity, setCart}) => {
    fetch(`/api/cart/${cartId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({        
            stockId,
            quantity,
    })}).then((res) => res.json()).then((cartUpdate) => {
        setCart(cartUpdate)
    })
}

export {postItems, updateItemQuantity}
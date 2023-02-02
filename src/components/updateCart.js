const post = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

const postItems = ({cartId, stockId, quantity, setCart}) => {
    fetch(`/api/cart/${cartId}`, {
        ...post,
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

const removeItems = ({cartId, stockId, setCart}) => {
    fetch(`/api/cart/${cartId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({        
            stockId,
    })}).then((res) => res.json()).then((cartUpdate) => {
        setCart(cartUpdate)
    })
}

const replaceCart = (cart, setCart) => {
    if (cart.items.length === 0) {
        // use database saved cart
        fetch('/api/cart/user').then((res) => res.json()).then((savedCart) => {
          setCart(savedCart)
        })
    } else {
        // use new cart delete database saved cart
        fetch('/api/cart/replace', {
          ...post,
          body: JSON.stringify({        
            items: cart.items
          })
        }).then((res) => res.json()).then(() => {
          fetch('/api/cart/user').then((res) => res.json()).then((newCart) => {
            setCart(newCart)
          })
        })
    }
}

export {post, postItems, updateItemQuantity, removeItems, replaceCart}
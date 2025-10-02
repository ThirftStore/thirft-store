//settings and data mock cart

const MOCK_PRODUCTS_DATA = [
    { id: 101, name: "Vestido Cacau", price: 65.90, image: "../../assets/vestido-cacau.jpg" },
    { id: 102, name: "Vestido Azul Marinho", price: 30.00, image: "../../assets/vestido-marinho.jpg" },
];

let currentCart = [
    { id: 101, quantity: 1}, // 1 Vestido Cacau
    { id: 102, quantity: 1 }  // 1 Vestido Azul Marinho
];

// formart to BRL coin
function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}


//functions to render and logic

/**
 * Cria o HTML para um único item do carrinho.
 * @param {object} item - Objeto do item no carrinho (id, quantity)
 */
function createCartItemHTML(item) {
    const product = MOCK_PRODUCTS_DATA.find(p => p.id === item.id);
    
    if (!product) return '';

    const totalProductPrice = product.price * item.quantity;

    return `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="item-details">
                <p class="item-name">${product.name}</p>
                <p class="item-price">${formatCurrency(product.price)} / un.</p>
                <p class="item-total">Total: <strong>${formatCurrency(totalProductPrice)}</strong></p>
            </div>
            <div class="item-quantity">
                <button class="quantity-control decrement" data-id="${item.id}">-</button>
                <span class="quantity-display" data-id="${item.id}">${item.quantity}</span>
                <button class="quantity-control increment" data-id="${item.id}">+</button>
            </div>
        </div>
    `;
}

/**
 * Renders the list of cart items to the DOM.
 */
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    if (currentCart.length === 0) {
        container.innerHTML = '<p>Seu carrinho está vazio.</p>';
        updateCartSummary(0);
        return;
    }

    const itemsHTML = currentCart.map(createCartItemHTML).join('');
    container.innerHTML = itemsHTML;
}

/**
 * Updates the subtotal and total in the purchase summary.
 */
function updateCartSummary() {
    let subtotal = 0;
    let totalItemsCount = 0;

    currentCart.forEach(item => {
        const product = MOCK_PRODUCTS_DATA.find(p => p.id === item.id);
        if (product) {
            subtotal += product.price * item.quantity;
            totalItemsCount += item.quantity;
        }
    });

    const frete = 0; 
    const total = subtotal + frete;

    
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('total').textContent = formatCurrency(total);

    
    document.getElementById('cart-count').textContent = totalItemsCount;
}

/**
 * Altera a quantidade de um produto no carrinho.
 * @param {number} productId - ID do produto.
 * @param {number} change - +1 para incrementar, -1 para decrementar.
 */
function updateQuantity(productId, change) {
    const itemId = parseInt(productId);
    const itemIndex = currentCart.findIndex(item => item.id === itemId);

    if (itemIndex > -1) {
        currentCart[itemIndex].quantity += change;

        if (currentCart[itemIndex].quantity <= 0) {

            currentCart.splice(itemIndex, 1);
        }
        
        renderCartItems();
        updateCartSummary();
    }
}


//event listener and initialization

document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    updateCartSummary();

    const cartContainer = document.getElementById('cart-items-container');
    if (cartContainer) {
        cartContainer.addEventListener('click', (event) => {
            const target = event.target;
            
            if (target.classList.contains('quantity-control')) {
                const productId = target.getAttribute('data-id');
                let change = 0;

                if (target.classList.contains('increment')) {
                    change = 1;
                } else if (target.classList.contains('decrement')) {
                    change = -1;
                }

                if (change !== 0) {
                    updateQuantity(productId, change);
                }
            }
        });
    }

    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', (event) => {
            if (currentCart.length === 0) {
                event.preventDefault(); 
                alert('Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.');
            }
            
        });
    }
});
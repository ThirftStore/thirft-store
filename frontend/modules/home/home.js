// Data product mock
const MOCK_PRODUCTS = [
    {id: 101, name: "Vestido Cacau", price: 65.90, image: "vestido-cacau.jpg"},
    {id: 102, name: "Vestido Azul Marinho", price: 30.00, image:"vestido-marinho.jpg"}, 
    {id: 103, name: "Boné BRSL", price: 15.00, image: "bone-brsl.jpg"}, 
    {id: 104, name: "Óculos Y2K", price: 25.00, image: "oculos-y2k.jpg"}
];

//variable to simulate cart
let currentCart = [];

const ASSETS_BASE_PATH = '../../assets/';

//formart to BRL coin
function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

// product and cart functions

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);
    
    const fullImagePath = ASSETS_BASE_PATH + product.image;

    card.innerHTML = `
        <img src="${fullImagePath}" alt="${product.name}">
        <p class="product-name">${product.name}</p>
        <p class="product-price">${formatCurrency(product.price)}</p>
        <button class="add-to-cart" data-id="${product.id}">COMPRAR</button>
    `;

    return card;
}

//renders all products on grid

function renderProductGrid(){
    const grid = document.getElementById('product-grid');
    if(!grid) return; 

    grid.innerHTML = '';

    MOCK_PRODUCTS.forEach(product =>{
        const card = createProductCard(product);
        grid.appendChild(card); 
    });
}

// add product to cart
function addToCart(productId){
    const product = MOCK_PRODUCTS.find(p => p.id == productId);

    if(product){
        const existingItem = currentCart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            currentCart.push({ ...product, quantity: 1 });
        }

        updateCartCount();
        alert(`"${product.name}" adicionando ao carrinho!`);
    }
}

function updateCartCount(){
    const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);
    const cartSpan = document.querySelector('.cart-icon span');

    if(cartSpan){
        cartSpan.textContent = totalItems;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProductGrid();

    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.addEventListener('click', (event) => {
            if (event.target.classList.contains('buy-button')) { 
                const productId = event.target.getAttribute('data-id');
                addToCart(parseInt(productId));
            }
        });
    }
    updateCartCount();
});
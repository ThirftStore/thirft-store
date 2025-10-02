//settings and data mock
const MOCK_CART_ITEMS = [
    {id: 1, name: "Vestido Maria Ipa Cacau", ref: "9334642", price: 65.90, quantity: 1},
    {id: 2, name: "Vestido Azul Marinho", ref: "9332532", price: 30.00, quantity: 1}
];
const FRETE_MOCK = 15.00; 

// format for BRL coin
function formatCurrency(value){
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

//track the step 
let currentStep = 1; 

/**
 * move forward or back to a specif checkout step.
 * @param {number} stepNumber step number to be display.
 */

function navigateStep(stepNumber){ 
    // garantee a valid number
    if(stepNumber < 1 || stepNumber > 4) return; 

    //hidden all steps
    document.querySelectorAll('.checkout-step').forEach(step => {
        step.classList.remove('active');
        step.classList.add('hidden');
    }); 
    
    //show the desired step
    const nextStepElement = document.getElementById(`step-${stepNumber}`);
    if(nextStepElement){
        nextStepElement.classList.remove('hidden');
        nextStepElement.classList.add('active'); 
        currentStep = stepNumber;
    }
}

// functions to html navigation
window.nextStep = (current) => navigateStep(current + 1);
window.prevStep = (current) => navigateStep(current - 1);


// cart summary logic

function renderCartSummary(){
    const productListElement = document.getElementById('product-list');
    const subtotalElement = document.getElementById('subtotal');
    const shipmentElement = document.getElementById('shipment');
    const totalElement = document.getElementById('total');
    
    let subtotal = 0;
    
    productListElement.innerHTML = '';

    MOCK_CART_ITEMS.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item-summary';
        itemElement.innerHTML = `
            <span>${item.name} (${item.quantity}x)</span>
            <span>${formatCurrency(itemTotal)}</span>
        `;
        productListElement.appendChild(itemElement);
    });

    const total = subtotal + FRETE_MOCK; 

    //update values from sidebar 
    subtotalElement.textContent = formatCurrency(subtotal);
    shipmentElement.textContent = formatCurrency(FRETE_MOCK);
    totalElement.textContent = formatCurrency(total);
}


// prepare and send datas to api

function collectOrderData(){
    // client data
    const registerForm = document.getElementById('register-form');
    const userData = {
        email: registerForm.querySelector('#email').value,
        fullName: registerForm.querySelector('#nome').value,
        cpf: registerForm.querySelector('#cpf').value,
    }; 

    // address data
    const addressForm = document.getElementById('address-form');
    const addressData = {
        street: addressForm.querySelector('#rua').value,
        number: addressForm.querySelector('#numero').value,
        complement: addressForm.querySelector('#complemento').value,
        sector: addressForm.querySelector('#setor').value,
        adminRegion: addressForm.querySelector('#regAdmin').value,
    };

    //delivery and payment data 
    const deliveryMethod = document.querySelector('input[name="entrega"]:checked')?.value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

    if (!deliveryMethod || !paymentMethod) {
        // simple validation
        alert('Por favor, selecione uma forma de entrega e pagamento.');
        return null;
    }

    //order structure 
    const orderPayload = {
        clientData: userData,
        shippingAddress: addressData,
        deliveryMethod: deliveryMethod,
        paymentMethod: paymentMethod,
        
        // Items and total : use for API verification
        items: MOCK_CART_ITEMS.map(item => ({
            productId: item.id || 0, // Add a real ID in the API
            quantity: item.quantity,
            price: item.price
        })),
        subtotal: MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0),
        shipmentCost: FRETE_MOCK,
        totalAmount: MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0) + FRETE_MOCK
    }; 
    return orderPayload; 
}


// initialization and main purchase function

function finishPurchase(event){
    event.preventDefault(); //prevent default html form submission

    const orderData = collectOrderData();

    if(!orderData){
        console.error("Dados do pedido incompletos.");
        return;
    }

    console.log("Dados prontos para envio (JSON Payload):", orderData);
    
    // --- INTEGRAR A CHAMADA FETCH AQUI QUANDO A API JAVA ESTIVER PRONTA ---

    alert('Compra Finalizada com Sucesso! (Dados capturados no console.)');
}

// Event listener for to start everuthing when the page
document.addEventListener('DOMContentLoaded', () =>{
    renderCartSummary();
    navigateStep(1);

    const finishButton = document.getElementById('finish-purchase');
    if(finishButton){
        finishButton.addEventListener('click', finishPurchase);
    }
});
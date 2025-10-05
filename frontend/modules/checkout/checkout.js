//settings and data mock
const MOCK_CART_ITEMS = [
    { id: 101, name: "Vestido Cacau", ref: "9334642", price: 65.90, quantity: 1 },
    { id: 102, name: "Vestido Azul Marinho", ref: "9332532", price: 30.00, quantity: 1 }
];
const FRETE_MOCK = 15.00;

// format for BRL coin
function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

//track the step 
let currentStep = 1;

/**
 * move forward or back to a specif checkout step.
 * @param {number} stepNumber step number to be display.
 */

function navigateStep(stepNumber) {
    // garantee a valid number
    if (stepNumber < 1 || stepNumber > 4) return;

    //hidden all steps
    document.querySelectorAll('.checkout-step').forEach(step => {
        step.classList.remove('active');
        step.classList.add('hidden');
    });

    //show the desired step
    const nextStepElement = document.getElementById(`step-${stepNumber}`);
    if (nextStepElement) {
        nextStepElement.classList.remove('hidden');
        nextStepElement.classList.add('active');
        currentStep = stepNumber;
    }
}

// functions to html navigation
window.nextStep = (stepNumber) => navigateStep(stepNumber);
window.prevStep = (stepNumber) => navigateStep(stepNumber);


// cart summary logic

function renderCartSummary() {
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
function collectOrderData() {
    const userData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        fullName: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
    };


    const addressData = {
        street: document.getElementById('rua').value,
        number: document.getElementById('numero').value,
        complement: document.getElementById('complemento').value,
        sector: document.getElementById('setor').value,
        adminRegion: document.getElementById('regAdmin').value,
    };

    //delivery and payment data 
    const deliveryMethod = document.querySelector('input[name="entrega"]:checked')?.value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

    if (!deliveryMethod || !paymentMethod) {
        alert('Por favor, selecione uma forma de entrega e pagamento.');
        return null;
    }

    //order structure 
    const orderPayload = {
        clientData: userData,
        shippingAddress: addressData,
        deliveryMethod: deliveryMethod,
        paymentMethod: paymentMethod,
        items: MOCK_CART_ITEMS.map(item => ({
            productId: item.id || 0,
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

async function finishPurchase(event) {
    console.log("DETETIVE 5: O BOTÃO FOI CLICADO! A função finishPurchase foi chamada."); // <-- Nosso detetive
    event.preventDefault(); // Impede o recarregamento da página

    const orderData = collectOrderData();

    if (!orderData) {
        console.error("Dados do pedido incompletos.");
        return;
    }

    const payloadParaAPI = {
        email: orderData.clientData.email,
        senha: document.getElementById('password').value,
        nome: orderData.clientData.fullName,
        cpf: orderData.clientData.cpf,
        rua: orderData.shippingAddress.street,
        numero: orderData.shippingAddress.number,
        complemento: orderData.shippingAddress.complement,
        setor: orderData.shippingAddress.sector,
        regAdmin: orderData.shippingAddress.adminRegion
    };

    console.log("Dados adaptados e prontos para envio:", payloadParaAPI);

    try {
        const response = await fetch('http://localhost:8080/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payloadParaAPI)
        });


        const responseData = await response.json();

        if (response.ok) {

            console.log('Cliente cadastrado com sucesso:', responseData);
            alert('Cadastro realizado com sucesso!');



        } else {

            alert('Ocorreu um erro: ' + (responseData.message || JSON.stringify(responseData)));
        }

    } catch (error) {

        console.error('Erro na requisição:', error);
        alert('Falha na comunicação com o servidor. Verifique se a API está rodando.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("--- INICIANDO DIAGNÓSTICO ---");
    console.log("DETETIVE 1: A página HTML terminou de carregar (DOMContentLoaded).");

    renderCartSummary();
    navigateStep(1);

    const finishButton = document.getElementById('finish-purchase');
    console.log("DETETIVE 2: Procurando o botão com id='finish-purchase'. Botão encontrado:", finishButton);

    if (finishButton) {
        console.log("DETETIVE 3: O botão foi encontrado! Adicionando o 'ouvinte' de clique.");
        finishButton.addEventListener('click', finishPurchase);
    } else {
        console.error("DETETIVE 4 (ERRO): Não foi possível encontrar o botão com id='finish-purchase' no seu HTML!");
    }
    console.log("--- FIM DO DIAGNÓSTICO INICIAL ---");
});

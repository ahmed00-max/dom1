const cart = [
    { id: 1, name: 'Laptop', price: 999.99, quantity: 1 },
    { id: 2, name: 'Headphones', price: 199.99, quantity: 2 },
    { id: 3, name: 'Keyboard', price: 49.99, quantity: 1 }
  ];
  
  // Function to display the cart items
  function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear the cart before rendering
  
    cart.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('cart-item');
      li.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <span>Qty: <input type="number" class="quantity" data-id="${item.id}" value="${item.quantity}" min="1" /></span>
        <span>Total: $${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-item" data-id="${item.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(li);
    });
  
    updateTotal();
  }
  
  // Function to update the total price
  function updateTotal() {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
  }
  
  // Handle changing quantity of an item
  document.getElementById('cart-items').addEventListener('input', function(event) {
    if (event.target.classList.contains('quantity')) {
      const itemId = parseInt(event.target.dataset.id);
      const newQuantity = parseInt(event.target.value);
      
      // Find the item and update its quantity
      const item = cart.find(item => item.id === itemId);
      if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        renderCart(); // Re-render the cart after updating
      }
    }
  });
  
  // Handle removing an item
  document.getElementById('cart-items').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item')) {
      const itemId = parseInt(event.target.dataset.id);
      
      // Remove the item from the cart array
      const index = cart.findIndex(item => item.id === itemId);
      if (index > -1) {
        cart.splice(index, 1);
        renderCart(); // Re-render the cart after removing
      }
    }
  });
  
  // Handle checkout button click
  document.getElementById('checkout-button').addEventListener('click', function() {
    alert(`Checkout complete! Total amount: $${document.getElementById('total-price').textContent}`);
  });
  
  // Initialize the cart when the page loads
  renderCart();
  
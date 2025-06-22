// Basic IWIP Runner example
console.log("IWIP Runner initialized.");

function addToCart(productId, quantity) {
    console.log(`Adding ${quantity} of product ${productId} to cart.`);
    // Implement actual cart logic here
    return { success: true, data: { cart_contents: [], total_items: 0 } };
}

window.addToCart = addToCart; // Expose the function globally
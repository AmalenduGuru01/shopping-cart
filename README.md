# Shopping Cart App

## Overview

This project is an e-commerce shopping cart application developed using React.js, Redux, and Tailwind CSS. It provides a fully functional shopping experience with features including product listing, cart management, and checkout. The application showcases a modern UI inspired by leading e-commerce platforms.

## Features

### Product Listing Page

- **Product Grid**: Displays 6-10 products using a responsive grid layout.
- **Product Details**: Each product card includes:
  - Product image
  - Product name
  - Product price (formatted for currency)
  - "Add to Cart" button with visual feedback (animation)

### Add to Cart Functionality

- **Cart Updates**: Clicking "Add to Cart" updates the cart and provides animation feedback.
- **Cart Icon/Counter**: Reflects the number of items added (optional feature).

### Cart Page

- **Product List**: Shows all added products with:
  - Product image
  - Product name
  - Product price
  - Quantity selector (up/down buttons or input field)
  - "Remove Item" button
- **Cart Summary**: Includes:
  - Subtotal: Total cost of items based on quantity and price
  - Discounts: Ability to apply fixed or percentage discounts
  - Total Price: Final amount after discounts
  - Checkout Button: Option to proceed to a simulated checkout page (or provide a success message)

### Checkout Page

- **Order Summary**: Shows subtotal, coupon discount, and total price.
- **Coupon Application**: Allows users to apply coupon codes with validation and error handling.
- **Payment Animation**: The “Proceed to Payment” button includes a stylish animation and clears the cart upon successful checkout.

### Sample Discount Codes: SAVE10, DISCOUNT15 and OFF20.
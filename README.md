
# Shopping Cart Application

## Project Overview
This is a React application that simulates an e-commerce shopping experience with the following features:

- Product display with quantity selectors
- Shopping cart functionality
- Automatic free gift when purchase threshold is reached

## Features

### Product Display
- Shows a list of available products with their prices
- Each product has quantity selectors (+ and -) and an "Add to Cart" button

### Shopping Cart
- Displays all items added to the cart
- Allows users to update quantities directly from the cart
- Enables removal of items from the cart

### Free Gift Feature
- Automatically adds a free Wireless Mouse when cart total reaches ₹1000
- Progress bar shows how close the user is to earning the free gift
- Free gift is automatically removed if cart value falls below the threshold

## Technical Implementation
This project is built with:

- Vite
- TypeScript
- React (using useState and useEffect for state management)
- Tailwind CSS
- shadcn/ui components

## How to Run the Project

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure
- `src/components/`: Contains React components
  - `Cart.tsx`: Shopping cart display and item management
  - `GiftProgressBar.tsx`: Shows progress towards free gift threshold
  - `ProductList.tsx`: Displays available products

- `src/pages/`: Contains page components
  - `Index.tsx`: Main application page

## Data Constants
```tsx
const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;
```

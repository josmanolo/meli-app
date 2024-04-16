# Next.js Application for MercadoLibre Integration

This project is a Next.js frontend designed to interact with an Express.js server backend that interfaces with the MercadoLibre API. It provides an interface for searching and viewing detailed information about items listed on MercadoLibre.

## Features

- **Search Functionality**: Users can search for items using a search bar, which queries the backend to retrieve items from MercadoLibre.
- **Item Details**: Users can click on any item to view more detailed information about it, such as price, description, and category.
- **Responsive Design**: The application is designed to be responsive, providing a good user experience on both desktop and mobile devices.
- **Optimized Images**: Utilizes Next.js's Image component to optimize image loading.
- **Localization**: Prices are formatted based on the item's currency and locale.

## Installation

To get started with this frontend project, follow these steps:

1. Clone the repository:

   `git clone https://github.com/josmanolo/meli-app.git`

2. Navigate to the project directory:

   `cd meli-app`

3. Install dependencies:

   `npm install`

4. Start the development server:

   `npm run dev`

## Pages and Components

- SearchBar: Form where users can input their search queries.
- Home Page: Displays a the search bar.
- Item Page: Shows detailed information about a specific item when clicked from the search results.
- Breadcrumbs: Provides navigational links back to the search or home page based on the current item's category path.

## API Interaction

The frontend communicates with the backend via the following endpoints:

- Search Items: GET `/api/items?query=<search_query>`
- Get Item Details: GET `/api/items/:id`

## Dependencies

- Next.js: The React framework used for building the frontend. Version 14.1.4.
- Sass: Used for writing modular and reusable CSS.

## Development and Testing

- ESLint: For linting and code quality.
- Jest: A JavaScript testing framework used for unit and integration testing.
- Testing Library: Utilities for testing React components.

## Running the Application

To run the application in production mode:

`npm run build`

`npm start`

This will build the application for production and serve it using a Node.js server at the configured port.

# Client — Admin Dashboard (Product Management)

Frontend for the product management admin dashboard. Built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Axios**. It connects to the Express backend in `../server` (running on `http://localhost:5000`).

## Prerequisites

- Node.js
- The backend server must be running on `http://localhost:5000` (see `../server`).

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` (configured as the allowed CORS origin on the backend).

## Available Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the Vite dev server                |
| `npm run build` | Build the app for production             |
| `npm run lint`  | Run ESLint                               |
| `npm run preview` | Preview the production build          |

## Project Structure

```
client/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx          # App entry point
    ├── index.css         # Tailwind import + base styles
    ├── App.css           # (empty, reserved)
    ├── App.jsx           # Main app: product list, add/search/edit/delete
    └── assets/           # Static images
```

## Features

> All features are implemented in a single component, `src/App.jsx`.

- **Add Product** — form (name, price, quantity) that POSTs to the API and appends the new product to the list.
- **Search** — text filter sent to the API as a `?filter=` query parameter (name search).
- **Edit Product** — click the ✏️ button on a product to open a modal pre-filled with its current data; editing is done per-product. Submitting sends a PUT request and updates the list immediately. CANCEL or the close button exits without changes.
- **Delete Product** — click the 🗑️ button to open a confirmation modal; confirming sends a DELETE request and removes the product from the list immediately.
- **Loading / error states** — a "loading..." placeholder while fetching; API/network errors are surfaced via the existing error message.

## API Integration

The app talks to the backend at `http://localhost:5000`:

| Method | Endpoint            | Purpose                        |
| ------ | ------------------- | ------------------------------ |
| GET    | `/products`         | Fetch products (optional `?filter=`) |
| POST   | `/products`         | Create a product               |
| PUT    | `/products/:id`     | Update a product               |
| DELETE | `/products/:id`     | Delete a product               |

Responses use the shape `{ success, data, message }`; `success: false` responses are shown as error messages in the UI.

## Notes

- Product list uses Mongo `_id` as the React list key to keep per-item edit/delete reliable.
- The API base URL is hardcoded in `src/App.jsx`.
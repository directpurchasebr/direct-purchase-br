# 🛍️ Direct Purchase - Frontend

Modern frontend built with **Next.js** for the direct purchase system.
Provides a responsive, secure interface with NextAuth authentication
and JWT-based backend integration.

## 🧰 Main Stack

- **Next.js 15**
- **React 19**
- **TailwindCSS** + DaisyUI
- **TypeScript**
- **Puppeteer** (reports)
- **NextAuth.js** (authentication)
- **Phosphor Icons**
- **TanStack Table v8** (dynamic tables)
- **http-proxy-middleware** (API proxy)

## 🔐 Authentication

- NextAuth.js integration
- `useSession()` for login verification
- `signOut()` redirects to `/login`
- Route and action visibility control based on user profile (`rules`)

## 🧭 Navigation

Key components:

- `Navbar`: Main menu with quick access to pages, new order and user settings
- `ConfigTrigger`: Dropdown with options like "Account", "Create New User" 
  (ADMIN only) and "Sign Out"
- `Container`: Default wrapper with flexible layout control

### 🧪 Page Structure (examples)

| Route | Description |
|-------|-------------|
| `/login` | Authentication screen |
| `/dashboard` | Main panel after login |
| `/novopedido` | New order registration |
| `/pedidos` | Order listing |
| `/produtos` | Product listing |
| `/fornecedores` | Supplier listing |
| `/usuario` | User account details |
| `/usuario/novo` | New user registration |
| `/pagamento` | Payment screen |

## 🧑‍💻 Scripts

```bash
# Install dependencies
npm install

# Run in dev mode
npm run dev

# Production build
npm run build
```

## 📁 Main File Structure

```bash
/components
  ├── navbar.jsx
  ├── config-trigger.tsx
  ├── container.tsx
/collections
  ├── custom-dual-list.tsx
  ├── custom-selector.tsx
/tabela-pedido
  ├── active-linha-pedido.ts
  ├── busca-produto-input.tsx
  ├── button-tabela-pedido.tsx
  ├── linha-pedido.tsx
  ├── pedido-linha.tsx
  ├── pedidos-linha-dinheiro.tsx
  ├── tabela-pedido.tsx
/pages
  ├── login
  ├── dashboard
  ├── contato
  ├── fornecedores
  ├── home
  ├── novopedido
  ├── pedidos
  ├── produtos
  ├── usuario
  └── ...
```

## 🔗 Backend

This project consumes the Direct Purchase API,
which exposes secure JWT-protected endpoints.

# 🐳 Project Dependencies

This project depends on **Redis** 🛢️, which can be run
locally via Docker.

## Running Redis 🛢️ with Docker 🐳

1. First, make sure Docker is installed and running.

2. To run Redis, use the following command:

```bash
docker run --name redis -p 6379:6379 -d redis
```
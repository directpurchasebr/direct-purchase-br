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

This project depends on **Redis** 🛢️, **jsreport** 📄, and the **Direct Purchase API** ☕, all of which can be run via Docker.

> All containers should be attached to the same Docker network: `easymerge-network`.
> Create it once with: `docker network create easymerge-network`

---

## 🛢️ Redis

```bash
docker run \
  --name redis \
  --cpus="0.05" --memory="64m" --memory-swap="64m" \
  --network easymerge-network \
  -p 6379:6379 \
  -d redis
```

---

## 📄 jsreport

```bash
docker run \
  --name jsreport \
  --cpus="0.1" --memory="256m" \
  --network easymerge-network \
  -p 5488:5488 \
  -e extensions_authentication_cookieSession_secret=secret \
  -e extensions_authentication_admin_username=user \
  -e extensions_authentication_admin_password=pass \
  -d jsreport/jsreport
```

---

## ☕ Direct Purchase API

```bash
docker run \
  --name direct-purchase-api \
  --cpus="0.6" --memory="512m" \
  --network easymerge-network \
  -p 8080:8080 \
  -v /files/application-prod.yml:/application.yml \
  -d directpurchasebr/direct-purchase-api \
  java -jar /app.jar --spring.config.location=file:/application.yml
```

---

## 🖥️ Direct Purchase Frontend

```bash
docker run \
  --name direct-purchase-front \
  --network easymerge-network \
  -p 80:3000 \
  -e NEXTAUTH_URL=DNS \
  -e NEXTAUTH_SECRET=secret \
  -e BACKEND_URL=http://direct-purchase-api:8080/api-easymerge \
  -e NEXT_PUBLIC_API_URL=http://direct-purchase-api:8080/api-easymerge \
  -e JSREPORT_URL=http://jsreport:5488 \
  -e JSREPORT_USERNAME=user \
  -e JSREPORT_PASSWORD="pass" \
  -e REDIS_URL=redis://redis:6379 \
  -d directpurchasebr/direct-purchase-front
```
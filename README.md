# 🛍️ Direct Purchase - Frontend

Frontend moderno em **Next.js** para o sistema de compras diretas. Oferece uma interface responsiva, segura e integrada com autenticação via NextAuth e backend com JWT.

## 🧰 Stack Principal

- **Next.js 15**
- **React 19**
- **TailwindCSS** + DaisyUI
- **TypeScript**
- **NextAuth.js** (autenticação)
- **Phosphor Icons**
- **TanStack Table v8** (tabelas dinâmicas)
- **http-proxy-middleware** (proxy para API backend)

## 🔐 Autenticação

- Integração com NextAuth.js
- Uso de `useSession()` para verificação de login
- `signOut()` redireciona para `/login`
- Controle de visibilidade de rotas e ações com base em perfil (`roles`)

## 🧭 Navegação

Componentes chave:

- `Navbar`: Menu principal com acesso rápido a páginas, novo pedido e configurações do usuário
- `ConfigTrigger`: Dropdown com opções como "Conta", "Criar Novo Usuário" (somente ADMIN) e "Sair"
- `Container`: Wrapper padrão com controle de layout flexível

### 🧪 Estrutura de páginas (exemplos)

| Rota | Descrição |
|------|-----------|
| `/login` | Tela de autenticação |
| `/dashboard` | Painel principal pós-login |
| `/novopedido` | Cadastro de novo pedido |
| `/pedidos` | Listagem de pedidos |
| `/produtos` | Listagem de produtos |
| `/fornecedores` | Listagem de fornecedores |
| `/usuario` | Detalhes da conta do usuário |
| `/usuario/novo` | Cadastro de novo usuário |
| `/pagamento` | Tela de pagamento |

## 🧑‍💻 Scripts

```bash
# Instalar dependências
npm install

# Rodar em modo dev
npm run dev

# Build de produção
npm run build
```

📁 Estrutura de Arquivos Principais
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

🔗 Backend
Este projeto consome a Direct Purchase API, que expõe endpoints seguros com JWT.

# 🐳 Dependências do Projeto

Este projeto depende do **Redis** 🛢️ e do **JSReport** 📊, que podem ser executados localmente através do Docker.

## Rodando Redis 🛢️ e o JsReport 📊 com Docker 🐳

1. Primeiro, verifique se o Docker está instalado e em funcionamento.

2. Para rodar o Redis e o JsReport, utilize o seguinte comando:

  ```bash
   docker run --name redis -p 6379:6379 -d redis
   docker run --name jsreport -p 5488:5488 -d jsreport/jsreport
  ```
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
- `LinkButton`: Componente reutilizável para botões de link estilizados
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

## 💡 Componentes Extras

- `config-trigger.tsx`: dropdown personalizado com `hover`, `signOut` e checagem de role
- `link-button.tsx`: botão estilizado com Tailwind para navegação
- `container.tsx`: componente que aplica responsividade e alinhamento padrão

## 🧑‍💻 Scripts

```bash
# Instalar dependências
npm install

# Rodar em modo dev
npm run dev

# Build de produção
npm run build
```

📁 Estrutura de Arquivos
```bash
/components
  ├── navbar.jsx
  ├── config-trigger.tsx
  ├── link-button.tsx
  ├── container.tsx
/pages
  ├── login.tsx
  ├── dashboard.tsx
  └── ...
```

🔗 Backend
Este projeto consome a Direct Purchase API, que expõe endpoints seguros com JWT.

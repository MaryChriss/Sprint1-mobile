# 🚲 Mottu Mobile App

Aplicação mobile desenvolvida em **React Native** para gerenciamento de pátios, motos e zonas da Mottu, com integração completa à API (Java).  
O objetivo é oferecer uma solução prática para controle de cadastro de usuários, autenticação, ocupação de pátios e busca de motos.

---

## 📋 Descrição da Solução

O **Mottu Mobile App** é uma aplicação que possibilita o **gerenciamento digital de pátios** e motos, oferecendo funcionalidades como:

- **Login, cadastro e logout** de usuários com persistência de sessão.
- **Gestão de pátios** (Create, Read, Update, Delete), com validações de formulário e mensagens de feedback.
- **Visualização de ocupação em mapa interativo**, exibindo zonas, metragem total e ocupação em tempo real.
- **Busca por motos** (placa ou tipo de zona), com listagem em cartões.
- **Tema claro e escuro**, personalizável e persistente.
- **Internacionalização (i18n)** com suporte a múltiplos idiomas.

---

## 🚀 Tecnologias Utilizadas

- **React Native** + **TypeScript**
- **React Navigation** (Stack + Tabs)
- **React Native Paper** (Material Design)
- **Axios** (requisições HTTP com interceptors e tokens JWT)
- **AsyncStorage** (persistência local)
- **i18next** + **expo-localization** (tradução e idiomas)
- **React Query** (gestão de cache e chamadas de API)
- **Expo** (execução e build do projeto)

---

## 📦 Estrutura de Pastas

```

src/
├─ components/       # Componentes reutilizáveis (Header, Input, Card, Mapa, etc.)
├─ screens/          # Telas principais (Login, Register, Configuration, Search, Themes)
├─ services/         # API, rotas, interceptors e navegação raiz
├─ locales/          # Arquivos de tradução (i18n)
├─ colors/           # Paleta de cores do app
├─ i18n.ts           # Configuração de internacionalização
└─ App.tsx           # Entrada principal do aplicativo

````

---

## 🛠️ Como Rodar o Projeto Localmente

1. **Clone o repositório:**
   
  ```bash
     git clone https://github.com/MaryChriss/Sprint1-mobile.git
  ```

2. **Baixe as dependências:**

   ```bash
   npm install
   ```

3. **Execute o app em ambiente de desenvolvimento:**

   ```bash
   npx expo start
   ```

---

## 🌐 Integração com a API

Para testar o app em conjunto com a **API em Java**, é necessário garantir que ela esteja rodando.
Basta acessar o link:

👉 [https://sprint1-java.onrender.com](https://sprint1-java.onrender.com)

Assim que a página carregar e o navegador solicitar login, a API já estará pronta para uso no aplicativo.

---

## 👥 Integrantes

* Mariana Christina — **RM: 554773** — [GitHub](https://github.com/gabrielamoguinho)
* Gabriela Moguinho Gonçalves — **RM: 556143** — [GitHub](https://github.com/MaryChriss)
* Henrique Maciel — **RM: 556480** — [GitHub](https://github.com/Maciel0123)

```

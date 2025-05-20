# futureStack

Sistema inteligente de rastreamento de motos via Wi-Fi, com mapeamento digital em tempo real e adaptável a diferentes filiais.

## 📋 Descrição da Solução

O **futureStack** é um sistema de monitoramento de motos que utiliza dispositivos Wi-Fi embarcados e gateways distribuídos no pátio da empresa. Cada moto possui um módulo que se conecta automaticamente ao gateway mais próximo, permitindo o rastreamento da sua posição com base na intensidade do sinal.

O sistema identifica a movimentação (entrada, deslocamento e saída) das motos e atualiza sua posição em tempo real em um **mapa digital**. O pátio é dividido em zonas como **entrada**, **centro** e **saída**, facilitando a visualização e gestão de fluxo.

Além disso, o sistema permite **buscas por placa ou modelo da moto** e é **adaptável para uso em diferentes filiais**, com mapas configuráveis por localização.

## 🚀 Tecnologias Utilizadas

- **React Native** (com `react-native-vector-icons`)
- **TypeScript**
- **React Native Paper**
- **JavaScript**
- **Wi-Fi / IoT conceito de integração**

## 📦 Estrutura da Interface

- Visualização em tempo real das motos no pátio
- Ícones representando motos ocupando ou não vagas
- Modal com **mapa completo** e **resumo de ocupação**
- Busca rápida por placa ou modelo

## 🛠️ Como Rodar o Projeto Localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/Sprint1-mobile.git
cd Sprint1-mobile
```

2. **Baixar dependecias**

```bash
npm install
```

3. **Execute o app em ambiente de desenvolvimento:**

```bash
npx expo start
```

## 📌 Observações

O número de vagas, zonas e distribuição podem ser ajustados no código conforme a configuração do pátio da filial (dados mockados).

O módulo de localização real via Wi-Fi e gateways será integrado futuramente via API com o backend/IOT dos dispositivos.

## 👥 Integrantes

- Mariana RM: 554773
- Gabriela Moguinho RM: 556143
- Henrique Maciel RM: 556480

# futureStack 

Sistema inteligente de rastreamento de motos via Wi-Fi, com mapeamento digital em tempo real e adaptável a diferentes filiais.

## 📋 Descrição da Solução

O **futureStack** é uma solução de monitoramento de motos que utiliza gateways Wi-Fi posicionados estrategicamente para detectar automaticamente a presença de veículos em duas zonas principais: **Zona A (Pátio)** e **Zona B (Manutenção)**.

Cada moto emite sinal que é captado pelo **gateway instalado em cada zona**. Com base na intensidade do sinal (`RSSI`), o sistema identifica a localização aproximada da moto e atualiza sua posição em um **mapa digital interativo**. Além disso, são apresentados dados como **metragem total de cada zona**, **ocupação atual** e uma **visualização detalhada em tempo real**.

O sistema também permite **buscas por placa ou modelo**, e é totalmente **adaptável a diferentes filiais**, com cadastro personalizado da metragem de pátio e manutenção, além de gateways exclusivos por local.

## 🚀 Tecnologias Utilizadas

- **React Native** (com `react-native-vector-icons`)
- **TypeScript**
- **React Native Paper**
- **JavaScript**
- **Wi-Fi / IoT conceito de integração**

## 📦 Estrutura da Interface

- Visualização em tempo real das motos por zona (Pátio e Manutenção)
- Ícones de moto ocupando as vagas
- Modal com **mapa completo** e **resumo de ocupação**
- Cadastro de **metragem das zonas**
- Definição fixa de **1 gateway por zona**
- Busca por placa
  
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

- Mariana Christina RM: 554773
- Gabriela Moguinho RM: 556143
- Henrique Maciel RM: 556480

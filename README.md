# Segurança Informática - Trabalho de Avaliação Continua

## O projeto está no ar [aqui](https://si-encrypt.vercel.app).

## Instalação de Dependências

Rodar o comando `npm install` no terminal.

> NPM é um gestor de pacotes, mais informações: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

## Correr o projeto localmente

Rodar o comando `npm run dev` no terminal e abrir o browser em http://localhost:3000

## A Começar

- Do lado esquerdo, há uma barra de navegação para as outras encriptações (imagem e ficheiro).
- Ao abrir o site, a primeira página é a de encriptação de texto.

### Gestão de uma chave personalizada

- No canto inferior direito, existe um botão que dá acesso à mudança ou remoção de uma chave personalizada. Na ausência duma chave do utilizador, é gerada uma automaticamente.

### Encriptação

##### Texto

1. Colocar o texto para encriptar
2. Clicar no botão abaixo para encriptar
3. Aparece o texto encriptado

##### Imagem

1. Clicar na área ou arrastar uma imagem para dentro da mesma
2. Clicar no botão abaixo para encriptar

##### Ficheiro

1. Clicar na área ou arrastar um ficheiro para dentro da mesma
2. Clicar no botão abaixo para encriptar

> **Note**
>
> Em todas as páginas [`/text`, `/file`, `/image`], existe uma aba acima do input com os botões de **Encrypt** e **Decrypt** com o propósito de alternar e indicar o modo atual.

#### Tecnologias usadas

- [x] [Next.js](https://nextjs.org)
- [x] [TypeScript](https://typescriptlang.org)
- [x] [tRPC](https://trpc.io)
- [x] [crypto](https://nodejs.org/api/crypto.html)

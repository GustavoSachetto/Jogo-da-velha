# Jogo da velha
![Jogo da velha](https://github.com/user-attachments/assets/6d7399d9-5274-46c9-94aa-8915f95955c9)

## Sobre

Projeto criado com a tecnologia do __web socket__ que permite a comunicação em __tempo real__ do navegador com o servidor, na qual é possivel criar uma sala para jogar o famoso __jogo da velha__ com outro amigo simultaneamente.

#react #socket-io #nodejs 

* __Link do vídeo:__ https://www.youtube.com/watch?v=sBc9-0cz2rk

## Desenvolvendo
Este projeto ficou dividido em duas partes, a primeira parte sendo a criação do front-end onde todos os elementos visuais do jogo foram criados, e a segunda parte que ficou com a criação da lógica do jogo e a implementação do web socket para conexão em tempo real. No projeto em si foi utilizado:

- React + Vite
- Typescrit v5.0
- Node Js
- Socket.io v4.0
- Styled-Components
- React Router
- Programação Orientada a Objetos

## Proteções básicas
Algumas proteções que foram aplicadas meticulosamente:
- Criação de sala
- Não permitido é duplicação de sala
- Verificação de vencedor a cada jogada
- Preenchimento duplicado de posição
- Reinício de jogo

## Comandos iniciais
__Para executar esse projeto é necessário abrir dois terminais distintos e executar:__

Comandos do servidor:
```
cd server &&
npm install &&
npm run dev
```

Comandos do cliente:
```
cd client &&
npm install &&
npm run dev
```
  
***************

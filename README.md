# Super Movies <img src="/src/assets/icon.png" width="30">

Aplicativo de consulta e dicas de filmes. Suas principais funcionalidades são:

1. Listar filmes em exibição nos cinemas
2. Listar filmes adicionados recentemente nos serviços de streaming
3. Busca de filmes por titulo
4. Listar filmes por genêro, com paginação
5. Exibe detalhes dos filmes, com catalogo de fotos, trailer e elenco

### Screens

| <img src="/screens/home.png" width="200">
| <img src="/screens/busca.png" width="200">
| <img src="/screens/generos.png" width="200">
| <img src="/screens/generos2.png" width="200">
| <img src="/screens/detalhes.png" width="200">
| <img src="/screens/detalhes 2.png" width="200"

## Executando o projeto

- Após clonar o projeto:
- yarn install
- cd ios && pod install (se ios)
- yarn android ou yarn ios para executar

## APi de Filmes

- A Api do [The Movie Database](https://developers.themoviedb.org/3/getting-started/introduction) foi utilizada para obter as informações sobre os filmes

## Tecnologias e Bibliotecas

### React native

- O [React Native](https://reactnative.dev/) foi utilizado em sua versão 0.63.3

### TypeScript

- O App utiliza [Typescript](https://www.typescriptlang.org/), se beneficiando da tipagem, auto complete e maior acertividade no uso de propriedades e economia de tempo com erros.
- Interfaces foram criadas para os payloads de resposta da API, para que o restante da aplicação conhecer a estrtura dos dados retornados

### Principais libs:

- [axios](https://github.com/axios/axios) para o consumo da api
- [reduxjs toolkit](https://redux-toolkit.js.org/) para gerenciamento simplificado de estado da aplicação
- [lottie](https://github.com/lottie-react-native/lottie-react-native) para criação de loading animado personalizado
- [react navigation v5](https://reactnavigation.org/) para gerenciamento da navegação entre telas

### Qualidade de Codigo

Para assegurar que o codigo obedeça a padroes e contenha certo nivel de qualidade, as libs foram usadas:

- [eslint](https://eslint.org/) para forçar o uso de padroes de codigo.
- [prettier](https://prettier.io/) para formatação do codigo
- [husky](https://github.com/typicode/husky) para executar antes dos commits, para assim evitar que codigo fora dos padrões seja enviado ao repositorio

### Padrões

#### Componentização de codigo reutilizavel

Componentes para exibição de posteres, listagens e botoes foram criados, para evitar a repetição de codigo. Os componentes são reutilizaveis e não contem regras de negocio, podendo ser utilizados nas variadas telas.

#### Separação de responsabilidades

- Uma camada de serviço foi criada e atua de forma transparente para as camadas superiores, se funcionamento nao depende das regras superiores e vice e versa
- O redux faz a ponte entre a camada de serviço e tela
- A telam se preocupa em obter inputs dos usuarios e mostrar resultados. Dessa forma, adicionar uma nova tela nao é um trabalho tão arduo, visto que basta fazer referencias ao redux.

>

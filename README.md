# Project App XP InvestHere;)


![myImage](https://media-private.canva.com/70dGc/MAFHX970dGc/1/tl.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20220724%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220724T104517Z&X-Amz-Expires=60117&X-Amz-Signature=9cf58bf9b115977fdeba90176c7369d61caa7accd134069804a2898391add244&X-Amz-SignedHeaders=host&response-expires=Mon%2C%2025%20Jul%202022%2003%3A27%3A14%20GMT)



Este projeto é parte das etapas dentro do processo seletivo da XP para os estudantes do curso da Trybe, turmas XP, tribos A e B. :rocket:

	                                      🚧 Este projeto está em construção... 🚧



# :dart: Objetivo do APP

Desenvolver um aplicativo de investimento em ações, com algumas funcionalidades de conta digital.

# Proposta

Os alunos devem escolher entre o desenvolvimento BackEnd ou FrontEnd/Mobile, ficando livres para fazer os dois, porém, é necessário dizer nos formulários internos qual será sua preferência.

# :hourglass: Prazo

O desafio foi liberado no dia 15/07/2022 e a data de entrega dia 24/07/2022 até às 23h59.

# :microphone: Apresentação da Pessoa Desenvolvedora e Escolha do Desafio

Fala amigos Dev's Sandy & Junior's!(os trybers da turma XP-B entenderão...rs)
Quem está por de trás desta tela preta, é a Cristina, fique à vontade para chamar de Cris. Sou uma Desenvolvedora Iniciante e para este desafio minha escolha para desenvolvimento foi o BackEnd, porém, a intenção é em sequência, implementar a parte do FrontEnd, e assim poder colocar em prática, revisitar conhecimentos e pesquisar bastante para fazer tudo isto funcionar!

---

# Requisitos do Projeto

## Requisitos Mínimos Gerais

  Faça um readme que contenha:
     
 - Uma explicação sobre suas tomadas de decisão na abordagem de seu desafio
 - Instruções de como compilarmos e executarmos seu projeto
 - Outras informações que você considere importantes
 
## Requisitos Mínimos BackEnd

  E desenvolva: 
 - Endpoints listados conforme seção de Contratos de Back-End(documento em pdf);
 - Criar uma lista de ações que passe às informações para Front-End (inclusive as informações da quantidade investida em cada ação)
       

## Requisitos Adicionais | Back-End

- Testes unitários
- Deploy da API
- Autenticação e autorização JWT
- Documentação da API (Swagger)**

*Não abordado no curso da Trybe

---

# :pencil: Check de Entregas

`Readme`
- [x] Uma explicação sobre suas tomadas de decisão na abordagem de seu desafio
- [x] Instruções de como compilarmos e executarmos seu projeto
- [x] Outras informações que você considere importantes

`Requisições para investimento POST (/investimentos/comprar)`
- [x] O endpoint recebe como entradas o código do ativo, a quantidade de ações compradas,número da conta compradora
- [x] Descrição dos Campos 
  - “codCliente” - código do cliente (identificador único)
  - “codAtivo” - código de identificação única do ativo
  - “qtdeAtivo” - quantidade de ações a serem compradas
- [x] Validações a serem feitas: Quantidade de ativo a ser comprada não pode ser maior que a quantidade disponível na corretora

`Requisições para investimento POST (/investimentos/vender)`
- [x] O endpoint recebe como entradas o id do ativo, a quantidade de ações vendidas, número da conta vendedora
- [x] Descrição dos Campos 
  - “codCliente” - código do cliente (identificador único)
  - “codAtivo” - código de identificação única do ativo
  - “qtdeAtivo” - quantidade de ações a serem vendidas
- [x] Quantidade de ativo a ser vendida não pode ser maior que a quantidade disponível na carteira

`Requisições para investimento GET BY CLIENT(/ativos/{cod-cliente})`
- [x] Descrição dos campos
  - “codCliente” - código de identificação única da pessoa cliente
  - “CodAtivo” - código de identificação única do ativo
  - “QtdeAtivo” - quantidade de ações que a pessoa cliente possui
  - “Valor” - Valor da ação

`Requisições para investimento GET BY ASSETS (/ativos/{cod-ativo})`
- [x] Descrição dos campos
  - “CodAtivo” - código de identificação única do ativo
  - “QtdeAtivo” - quantidade de ações a serem negociadas
  - “Valor” - Valor unitário da ação a ser negociada

`Requisição para depósitos e saques POST (/conta/deposito)`
- [x] Descrição dos campos
  - “CodCliente” - Código de identificação única da pessoa cliente
  - “Valor” - Valor do depósito
- [x] Validações a serem feitas: Quantidade a ser depositada não poderá ser negativa ou igual a zero.

`Requisição para depósitos e saques POST (/conta/saque)`
- [x] Descrição dos Campos
  - “CodCliente” - Código de identificação única da pessoa cliente
  - “Valor” - Valor do saque
- [x] Validações a serem feitas: Quantidade a ser sacada não poderá ser maior que o saldo da conta; não pode ser negativa e não pode ser igual a zero.

`Requisição para depósitos e saques GET (/conta/{cod-cliente})`
- [x] Descrição dos Campos
  - “CodCliente” - Código de identificação única
da pessoa cliente
  - “Saldo” - Saldo da conta

---

# :information_source:	Informações, Instruções e Orientações sobre o projeto

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- Node.js (https://nodejs.org/en/)
- MySQL (https://www.mysql.com/downloads/)
- Docker (https://docs.docker.com/engine/install/)

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js], [MySQL]
Além disto é bom ter um editor para trabalhar com o código como [VSCode]

### 🎲 Clonando o repositório

```bash
# Clone este repositório
$ git clone https://github.com/cristinacamilolima/PSel-XP-InvestHere.git [https]
$ git clone git@github.com:cristinacamilolima/PSel-XP-InvestHere.git     [SSH]
```


### 🎲 Rodando o Back End (servidor) [Sem Docker]

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd PSel-XP-InvestHere

# Instale as dependências
$ npm install

# Rode o mysql 5.7 (Para facilitar utilize o comando docker abaixo.)
$ docker run --name mysql57 -p 3306:3306  -e MYSQL_ROOT_PASSWORD=password -d mysql:5.7

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# O servidor iniciará na porta:3000 - acesse http://localhost:3000/docs para acessar o swagger
# Ao rodar o comando npm start, será exutado um pré-script "prestart" para criar as tabelas no banco de dados.
# Após iniciar a aplicação, ela só estará disponível em 5 segundos.     
```

### 🎲 Rodando o Back End (servidor) [Com Docker]

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd PSel-XP-InvestHere

# Rode o docker-compose
$ docker-compose build --no-cache && docker-compose up -d

# O servidor iniciará na porta:3000 - acesse http://localhost:3000/docs para acessar o swagger
# Ao rodar o comando npm start, será executado um pré-script "prestart" para criar as tabelas no banco de dados.
# Após iniciar a aplicação, ela só estará disponível em 5 segundos, pois é o tempo de espera 
# até que as tabelas tenham sido criadas no banco de dados. 
```

### Dica :coin:	

Ferramentas úteis que me ajudaram:

 - Miro (para mapa mental da aplicação) - Arquivo disponível na pasta planning do projeto.
 - Excel (melhor visualização das tabelas) - Arquivo disponível na pasta planning do projeto.
 - Trello (organização das tarefas)

# :bricks: Desafios do Projeto

1. Criação do fluxo de carteira
 - Entender todo o processo de compra e venda de uma ação.
 - Atualizar os dados da conta do cliente no momento da compra ou venda da ação.

2. Dockerização da aplicação
 - Quando o container estava rodando a aplicação não estava executando.
 - Só foi possível resolver buscando solução em aulas anteriores na plataforma da Trybe.

3. Criação do Swagger
 - Por não ter utilizado o Swagger em projetos anteriores, foi necessário a leitura de um artigo na internet.

# :bulb: Referências

Sobre Markdown
- Como colocar imagens Markdown (https://medium.com/walternascimentobarroso-pt/curso-r%C3%A1pido-de-markdown-4af49e3bfa65)
- Sobre Readme (https://blog.rocketseat.com.br/como-fazer-um-bom-readme/#tabela-de-conteudo)
- Modelo Readme (https://github.com/tgmarinho/Ecoleta/edit/master/README.md)

Sobre Swagger

- Swagger como ferramenta para a gerar documentação. https://dev.to/luizcalaca/autogenerated-documentation-api-with-openapi-and-swagger-for-nodejs-and-express-31g9

Health Check

- Checar o funcionamento da API (https://docs.sensedia.com/pt/api-platform-guide/4.3.x.x/analytics/health-checks.html#:~:text=A%20funcionalidade%20Health%20Checks%20possibilita,recurso%20HTTP%20est%C3%A1%20funcionando%20corretamente)

Imagem para "logo"
- (https://www.xpi.com.br/investimentos/acoes/)


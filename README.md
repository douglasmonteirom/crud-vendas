# CRUD Vendas

Através dessa aplicação, deve ser possível que a pessoa usuária, independente de cadastro ou login, possa adicionar, ler, deletar e atualizar produtos no seu estoque. A pessoa usuária deve poder também enviar vendas para o sistema e essas vendas devem validar se o produto em questão existe. Deve-se também, ser possível ler, deletar e atualizar vendas.

Foi utilizado o banco MySQL para a gestão de dados. Além disso, a API é RESTful com cobertura de testes de 60% das camadas da aplicação.

# Habilidades Desenvolvidas

- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar sua aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do seu app;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.
- Desenvolver testes unitarios.

## Técnologias usadas:

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MYSQL, ES6, Joi para validações, **mocha**, **chai** e **sinon** para testes.

### Conexão com o Banco:

**⚠️ IMPORTANTE! ⚠️**

```javascript
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});
```
  Inclua os dados de acesso ao banco no arquivo .env
```sh
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```

### Tabelas

Na raiz do projeto existe o arquivo `StoreManager.sql` você pode importá-lo localmente para testar o comportamento da aplicação.

O banco terá três tabelas: `products`, `sales` e `sales_products`.

## Instalando Dependências
```bash
npm install
``` 
## Executando aplicação
```bash
 npm start
```
## Executando testes
```bash
npm run test:mocha
```

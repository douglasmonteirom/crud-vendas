const express = require('express');
require('dotenv').config();

const app = express();
const productsControllers = require('./controllers/products');
const salesControllers = require('./controllers/sales');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsControllers.getAll);

app.get('/products/:id', productsControllers.getByID);

app.get('/sales', salesControllers.getAll);

app.get('/sales/:id', salesControllers.getByID);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

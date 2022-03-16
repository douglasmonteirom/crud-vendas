const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
const productsControllers = require('./controllers/products');
const salesControllers = require('./controllers/sales');
const { errorMiddleware } = require('./middlewares/error');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsControllers.getAll);

app.post('/products', productsControllers.create);

app.get('/products/:id', productsControllers.getByID);

app.put('/products/:id', productsControllers.update);

app.delete('/products/:id', productsControllers.remove);

app.get('/sales', salesControllers.getAll);

app.post('/sales', salesControllers.create);

app.get('/sales/:id', salesControllers.getByID);

app.put('/sales/:id', salesControllers.update);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/products');
const productsServices = require('../../../services/products');

describe('Teste Controller - Pega todos os produtos', () => {
  describe('quando encontra produtos cadastrados', () => {
    const products = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
    ]
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves({ data: products, code: 200 });
    });
    after(() => {
      productsServices.getAll.restore();
    });
    it('retorna status 200', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('retorna um array', async () => {
      await productsController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
describe('Teste Controller - Pega produto pelo ID', () => {
  describe('Quando encontra um produto', () => {
    const product = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
    ]
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getByID').resolves({ data: product, code: 200 });
    });
    after(() => {
      productsServices.getByID.restore();
    });
    it('retorna status 200', async () => {
      request.params = { id: '1' },  
      await productsController.getByID(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('Quando não encontra um produto', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getByID').resolves({ message: 'Product not found', code: 404 });
    });
    after(() => {
      productsServices.getByID.restore();
    });
    it('retorna status 404', async () => {
      request.params = { id: '10' },  
      await productsController.getByID(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });
});
describe('Teste Controller - Quando Remove um produto', () => {
  describe('Quando remove com sucesso', () => {
    const response = {};
    const request = {};
    next = () => {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'remove').resolves({ code: 204 });
    });
    after(() => {
      productsServices.remove.restore();
    });
    it('Retorna status 204', async () => {
      request.params = { id: '1' },  
      await productsController.remove(request, response, next);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
  describe('Quando não encontra produto', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'remove').resolves({ message: 'Product not found', code: 404 });
    });
    after(() => {
      productsServices.remove.restore();
    });
    it('Retorna status 404', async () => {
      request.params = { id: '10' },  
      await productsController.remove(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });
});
describe('Teste Controller - Quando Cria um produto', () => {
  describe('Quando cria com sucesso', () => {
    const product =
    {
      "id": 1,
      "name": "produtoAB",
      "quantity": 10
    }
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'create').resolves({ data: product, code: 201 });
    });
    after(() => {
      productsServices.create.restore();
    });
    it('retorna status 201', async () => {
      request.body = {
      name: "produtoAB",
      quantity: 10
      },  
      await productsController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
  describe('Quando o produto já existe', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'create').resolves({ message: 'Product already exists', code: 409 });
    });
    after(() => {
      productsServices.create.restore();
    });
    it('retorna status 409', async () => {
      request.body = {
      name: "produto",
      quantity: 10
      },  
      await productsController.create(request, response);
      expect(response.status.calledWith(409)).to.be.equal(true);
    });
  });
});

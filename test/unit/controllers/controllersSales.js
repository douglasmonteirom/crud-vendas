const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/sales');
const salesServices = require('../../../services/sales');
const quantityValidate = require('../../../middlewares/validateQuantity');


describe('Teste Controller - Pega todos as vendas', () => {
  describe('quando encontra produtos cadastrados', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getAll').resolves(
      [
        {
          "saleId": 1,
          "date": "2022-03-11T12:04:29.000Z",
          "productId": 1,
          "quantity": 5
        },
      ]);
    });
    after(() => {
      salesServices.getAll.restore();
    });
    it('retorna status 200', async () => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('retorna um array', async () => {
      await salesController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
describe('Teste Controller - Pega venda pelo ID', () => {
  describe('Quando encontra uma venda', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getByID').resolves([
        {
          "date": "2022-03-17T00:59:36.000Z",
          "productId": 2,
          "quantity": 10
        },
      ]);
    });
    after(() => {
      salesServices.getByID.restore();
    });
    it('retorna status 200', async () => {
      request.params = { id: '1' }
      await salesController.getByID(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('Quando não encontra uma venda', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getByID').resolves({ message: 'Sale not found', code: 404 });
    });
    after(() => {
      salesServices.getByID.restore();
    });
    it('Retorna status 404', async () => {
      request.params = { id: '10' },  
      await salesController.getByID(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });
});
describe('Teste Controller - Quando Remove uma venda', () => {
  describe('Quando remove com sucesso', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'remove').resolves({ code: 204 });
    });
    after(() => {
      salesServices.remove.restore();
    });
    it('Retorna status 204', async () => {
      request.params = { id: '1' },  
      await salesController.remove(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });

  });
  describe('Quando não encontra venda', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'remove').resolves({ message: 'Sale not found', code: 404 });
    });
    after(() => {
      salesServices.remove.restore();
    });
    it('Retorna status 404', async () => {
      request.params = { id: '10' },  
      await salesController.remove(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

  });
});
describe('Teste Controller - Quando Cria uma vernda', () => {
  describe('Quando cria com sucesso', () => {
    const sales =
    [
      {
        "productId": 1,
        "quantity": 5
      },
    ]
    const response = {};
    const request = {};
    let next = () => {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'create').resolves({ data: { id: '5', itemsSold: sales }, code: 201 });
      sinon.stub(quantityValidate, 'valid').resolves(false);
    });
    after(() => {
      salesServices.create.restore();
      quantityValidate.valid.restore();
    });
    it('retorna status 201', async () => {
      request.body = sales;
      await salesController.create(request, response, next);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
});
const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/sales');
const salesServices = require('../../../services/sales');

describe('Teste Services - Pega todas as vendas', () => {
  describe('Quando retorna todas as vendas', () => {
    before(() => {
      const listSalesMock = [
        {
          "saleId": 1,
          "date": "2022-03-17T14:24:20.000Z",
          "productId": 1,
          "quantity": 5
        },
      ];
      sinon.stub(salesModel, 'getAll').resolves(listSalesMock);
    });
    after(() => {
      salesModel.getAll.restore();
    });
    it('Retorna um array', async ()=>{
      const serviceResponse = await salesServices.getAll();

      expect(serviceResponse).to.be.an('array');
    });
    it('Verifica se retorna um array de objetos', async ()=>{
      const [sale] = await salesServices.getAll();

      expect(sale).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "saleId", "date", "productId" e "quantity"', async ()=>{
      const [sale] = await salesServices.getAll();
      expect(sale).to.include.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
        );
    });
  });
  describe('Quando não tem nenhuma venda cadastrada', () => {
    before(() => {
      const listSalesMock = [];
      sinon.stub(salesModel, 'getAll').resolves(listSalesMock);
    });
    after(() => {
      salesModel.getAll.restore();
    });
    it('Retorna um obejto', async ()=>{
      const serviceResponse = await salesServices.getAll();

      expect(serviceResponse).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "message" e "code"', async ()=>{
      const serviceResponse = await salesServices.getAll();
      expect(serviceResponse).to.include.all.keys(
        'message',
        'code'
        );
    });
    it('Verifica se a chave "message" tem o texto "Nenhuma venda Cadastrada"', async ()=>{
      const {message} = await salesServices.getAll();
      expect(message).to.be.equal("Nenhuma venda Cadastrada");
    });
  });
});
describe('Teste Services - Pega produto pelo ID', () => {
  describe('Quando encontra o prduto', () => {
    before(() => {
      const listSaleMock = [
        {
          "date": "2022-03-17T14:24:20.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "date": "2022-03-17T14:24:20.000Z",
          "productId": 2,
          "quantity": 10
        }
      ]
      sinon.stub(salesModel, 'getByID').resolves(listSaleMock);
    });
    after(() => {
      salesModel.getByID.restore();
    }); 
    it('Retorna um array', async ()=>{
      const serviceResponse = await salesServices.getByID('1');

      expect(serviceResponse).to.be.an('array');
    });
    it('Retorna um array de objetos', async ()=>{
      const [sale] = await salesServices.getByID('1');

      expect(sale).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "date", "productId" e "quantity"', async ()=>{
      const [sale] = await salesServices.getByID('1');

      expect(sale).to.include.all.keys(
        'date',
        'productId',
        'quantity'
        );
    });
  });
  describe('Quando não encontra venda', () => {
    before(() => {
      const listSaleMock = [];
      sinon.stub(salesModel, 'getByID').resolves(listSaleMock);
    });
    after(() => {
      salesModel.getByID.restore();
    });
    it('Retorna um obejto', async ()=>{
      const serviceResponse = await salesServices.getByID('1');

      expect(serviceResponse).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "message" e "code"', async ()=>{
      const serviceResponse = await salesServices.getByID('1');
      expect(serviceResponse).to.include.all.keys(
        'message',
        'code'
        );
    });
    it('Verifica se a chave "message" tem o texto "Sale not found"', async ()=>{
      const {message} = await salesServices.getByID('1');
      expect(message).to.be.equal("Sale not found");
    });
  });
});
describe('Teste Services - Cria uma venda', () => {
  describe('Quando cria a vemnda com sucesso', () => {
    before(() => {
      const sales =   [
        {
          "productId": 2,
          "quantity": 20
        },
        {
          "productId": 3,
          "quantity": 50
        }
      ]
      const responseModel = { id: 6, sales };
      sinon.stub(salesModel, 'create').resolves(responseModel);
    });
    after(() => {
      salesModel.create.restore();
    });
    it('Retorna um obejto', async ()=>{
      const serviceResponse = await salesServices.create();

      expect(serviceResponse).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "data" e "code"', async ()=>{
      const serviceResponse = await salesServices.create();
      expect(serviceResponse).to.include.all.keys(
        'data',
        'code'
        );
    });
  });
});
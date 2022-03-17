const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/products');
const productsServices = require('../../../services/products');

describe('Teste Services - Pega todos os produtos', () => {
  describe('Quando retorna todos os produtos', () => {
    before(() => {
      const listProductsMock = [
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        },
      ];
      sinon.stub(productsModel, 'getAll').resolves(listProductsMock);
    });
    after(() => {
      productsModel.getAll.restore();
    });
    it('Retorna um objeto', async ()=>{
      const serviceResponse = await productsServices.getAll();

      expect(serviceResponse).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "data" e "code"', async ()=>{
      const serviceResponse = await productsServices.getAll();

      expect(serviceResponse).to.include.all.keys(
        'data',
        'code'
        );
    });
  });
  describe('Quando não tem nenhum produto cadastrado', () => {
    before(() => {
      const listProductsMock = [];
      sinon.stub(productsModel, 'getAll').resolves(listProductsMock);
    });
    after(() => {
      productsModel.getAll.restore();
    });
    it('Retorna um obejto', async ()=>{
      const serviceResponse = await productsServices.getAll();

      expect(serviceResponse).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "message" e "code"', async ()=>{
      const serviceResponse = await productsServices.getAll();
      expect(serviceResponse).to.include.all.keys(
        'message',
        'code'
        );
    });
    it('Verifica se a chave "message" tem o texto "Products not found"', async ()=>{
      const {message} = await productsServices.getAll();
      expect(message).to.be.equal("Products not found");
    });
  });
});
describe('Teste Services - Pega produto pelo ID', () => {
  describe('Quando encontra o prduto', () => {
    before(() => {
      const listProductsMock = {
        "id": 9,
        "name": "produtoAB",
        "quantity": 10
      }
      sinon.stub(productsModel, 'getByID').resolves(listProductsMock);
    });
    after(() => {
      productsModel.getByID.restore();
    });    it('Retorna um objeto', async ()=>{
      const serviceResponse = await productsServices.getByID('9');

      expect(serviceResponse).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "data" e "code"', async ()=>{
      const serviceResponse = await productsServices.getByID('9');

      expect(serviceResponse).to.include.all.keys(
        'data',
        'code'
        );
    });
    it('Verifica se "data" é um objeto e tem as chaves "id" "name" e "quantity"', async ()=>{
      const {data} = await productsServices.getByID('9');

      expect(data).to.be.an('object');
      expect(data).to.include.all.keys(
        'id',
        'name',
        'quantity'
        );
    });
  });
  describe('Quando não encontra produto', () => {
    before(() => {
      const listProductsMock = undefined;
      sinon.stub(productsModel, 'getByID').resolves(listProductsMock);
    });
    after(() => {
      productsModel.getByID.restore();
    });
    it('Retorna um obejto', async ()=>{
      const serviceResponse = await productsServices.getByID('1');

      expect(serviceResponse).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "message" e "code"', async ()=>{
      const serviceResponse = await productsServices.getByID('1');
      expect(serviceResponse).to.include.all.keys(
        'message',
        'code'
        );
    });
    it('Verifica se a chave "message" tem o texto "Products not found"', async ()=>{
      const {message} = await productsServices.getByID('1');
      expect(message).to.be.equal("Product not found");
    });
  });
});
describe('Teste Services - Cria um produto', () => {
  describe('Quando cria com sucesso o prduto', () => {
    before(() => {
      const idResponse = 6;
      sinon.stub(productsModel, 'create').resolves(idResponse);
    });
    after(() => {
      productsModel.create.restore();
    });    it('Verifica se retorna um obejto', async ()=>{
      const serviceResponse = await productsServices.create();

      expect(serviceResponse).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "data" e "code"', async ()=>{
      const serviceResponse = await productsServices.create();
      expect(serviceResponse).to.include.all.keys(
        'data',
        'code'
        );
    });
  });
});
const sinon = require('sinon');
const { expect } = require('chai');

const conectionDB = require('../../../models/connectionDB')

const productsModel = require('../../../models/products');

describe('Teste Model - Pega todos os produtos', () => {
  describe('Quando retorna todos os produtos', () => { 
    before(() => {
      const listProductsMock = [
        [
          {
            "id": 1,
            "name": "Martelo de Thor",
            "quantity": 10
          },
        ],
      ];
      sinon.stub(conectionDB, 'execute').resolves(listProductsMock);
    });
    after(() => {
      conectionDB.execute.restore();
    });

    it('O array não esta vazio', async ()=>{
      const modelResponse = await productsModel.getAll();

      expect(modelResponse).to.be.not.empty;
    });
    it('Retorna um array de objetos', async ()=>{
      const [modelResponseItem] = await productsModel.getAll();

      expect(modelResponseItem).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "id", "name" e "quantity" ', async ()=>{
      const [modelResponseItem] = await productsModel.getAll();

      expect(modelResponseItem).to.include.all.keys(
        'id',
        'name',
        'quantity'
        );
    });
  });
});

describe('Teste Model - Pega Produto pelo ID', () => {
  describe('Quando encontra um produto', () => {
    before(()=>{
      const productMock = [
        [
          {
            "id": 1,
            "name": "Martelo de Thor",
            "quantity": 10
          }
        ]
      ];
      sinon.stub(conectionDB, 'execute').resolves(productMock);
    });

    after(() =>{
      conectionDB.execute.restore();
    });

    it('Verifica se retorna um objeto', async () => {
      const modelResponseItem = await productsModel.getByID('1');
      expect(modelResponseItem).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "id", "name" e "quantity" ', async ()=>{
      const modelResponseItem = await productsModel.getByID('1');

      expect(modelResponseItem).to.include.all.keys(
        'id',
        'name',
        'quantity'
        );
    });
  });
  describe('Quando não encontra um produto', ()=>{
    before(()=>{
      const productMock = [[]];
      sinon.stub(conectionDB, 'execute').resolves(productMock);
    });

    after(() =>{
      conectionDB.execute.restore();
    });

    it('Verifica se retorna undefined', async ()=>{
      const modelResponse = await productsModel.getByID('10');
      expect(modelResponse).to.be.undefined;
    });
  })
})
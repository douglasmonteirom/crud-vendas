const sinon = require('sinon');
const { expect } = require('chai');

const conectionDB = require('../../../models/connectionDB')

const salesModel = require('../../../models/sales');

describe('Teste Model - Pega todas as vendas', () => {
  describe('Quando retorna todas as vendas', () => { 
    before(() => {
      const listSalesMock = [
        [
          {
            "saleId": 1,
            "date": "2022-03-11T12:04:29.000Z",
            "productId": 1,
            "quantity": 5
          },
        ],
      ];
      sinon.stub(conectionDB, 'execute').resolves(listSalesMock);
    });

    after(() => {
      conectionDB.execute.restore();
    });

    it('O array não esta vazio', async ()=>{
      const modelResponse = await salesModel.getAll();

      expect(modelResponse).to.be.not.empty;
    })
    it('Retorna um array de objetos', async ()=>{
      const [modelResponseItem] = await salesModel.getAll();

      expect(modelResponseItem).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "saleId", "date", "productId" e "quantity"', async ()=>{
      const [modelResponseItem] = await salesModel.getAll();

      expect(modelResponseItem).to.include.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
        );
    });
  })
});

describe('Teste Model - Pega Venda pelo ID', () => {
  describe('Quando encontra uma venda', ()=>{
    before(()=>{
      const saleMock = [
        [
          {
            "date": "2022-03-11T12:04:29.000Z",
            "productId": 1,
            "quantity": 5
          },
          {
            "date": "2022-03-11T12:04:29.000Z",
            "productId": 2,
            "quantity": 10
          }
        ]
      ];
      sinon.stub(conectionDB, 'execute').resolves(saleMock);
    });

    after(() =>{
      conectionDB.execute.restore();
    });

    it('Retorna um array de objetos', async ()=>{
      const [modelResponseItem] = await salesModel.getByID('1');

      expect(modelResponseItem).to.be.an('object');
    });

    it('Verifica se o objeto tem as chaves "date", "productId" e "quantity"', async ()=>{
      const [modelResponseItem] = await salesModel.getByID('1');
  
      expect(modelResponseItem).to.include.all.keys(
        'date',
        'productId',
        'quantity'
        );
    });
  });

  describe('Quando não encontra uma venda', ()=>{
    before(()=>{
      const saleMock = [[]];
      sinon.stub(conectionDB, 'execute').resolves(saleMock);
    });

    after(() =>{
      conectionDB.execute.restore();
    });

    it('Verifica se retorna array vazio', async ()=>{
      const modelResponse = await salesModel.getByID('10');
      expect(modelResponse).to.be.an('array');
      expect(modelResponse).to.be.empty;
    });
  });
});

describe('Teste Model - Cria Venda', () => {
  describe('Quando cria com sucesso', () => {
    const listProductsSale =   [
      {
        "productId": 2,
        "quantity": 20
      },
      {
        "productId": 3,
        "quantity": 50
      }
    ] 
    before(()=>{
      const saleMock = [
        {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 6,
          info: '',
          serverStatus: 2,
          warningStatus: 0
        },
      ];
      sinon.stub(conectionDB, 'execute').resolves(saleMock);
    });

    after(() =>{
      conectionDB.execute.restore();
    });

    it('Verifica se retorna um obejto', async () => {
      const modelResponse = await salesModel.create(listProductsSale);
      expect(modelResponse).to.be.an('object');
    });
    it('Verifica se o objeto tem as chaves "id", "sales"', async ()=>{
      const modelResponse = await salesModel.create(listProductsSale);
  
      expect(modelResponse).to.include.all.keys(
        'id',
        'sales',
        );
    });
    it('Verifica se a chave "sales" é um array', async () => {
      const modelResponse = await salesModel.create(listProductsSale);
      expect(modelResponse.sales).to.be.an('array');
    });
  });
}); 
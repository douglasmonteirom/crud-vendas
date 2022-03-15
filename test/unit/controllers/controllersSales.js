const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/sales');
const salesModel = require('../../../models/sales');

describe('Teste Controller - Pega todos as vendas', () => {
  const response = {};
  const request = {};
  let next = () => {};
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns()
  });
  describe('quando encontra produtos cadastrados', () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves([
        [
          {
            "saleId": 1,
            "date": "2022-03-11T12:04:29.000Z",
            "productId": 1,
            "quantity": 5
          },
        ],
      ]);
    });
    after(() => {
      salesModel.getAll.restore();
    });
    it('retorna status 200', async () => {
      await salesController.getAll(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('retorna um array', async () => {
      await salesController.getAll(request, response, next);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
// describe('Teste Controller - Pega produto pelo ID', () => {
//   describe('Quando encontra um produto', () => {
//     const response = {};
//     const request = {};
//     before(() => {
//       response.status = sinon.stub().returns(response);
//       response.json = sinon.stub().returns();
//       sinon.stub(productsModel, 'getByID').resolves([
//         [
//           {
//             "id": 1,
//             "name": "Martelo de Thor",
//             "quantity": 10
//           },
//         ],
//       ]);
//     });
//     after(() => {
//       productsModel.getByID.restore();
//     });
//     it('retorna status 200', async () => {
//       await productsController.getByID(request, response);
//       expect(response.status.calledWith(200)).to.be.equal(true);
//     });
//   });
// });
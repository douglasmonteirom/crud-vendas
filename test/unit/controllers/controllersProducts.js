const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/products');
const productsModel = require('../../../models/products');

describe('Teste Controller - Pega todos os produtos', () => {
  describe('quando encontra produtos cadastrados', () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsModel, 'getAll').resolves([
        [
          {
            "id": 1,
            "name": "Martelo de Thor",
            "quantity": 10
          },
        ],
      ]);
    });
    after(() => {
      productsModel.getAll.restore();
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
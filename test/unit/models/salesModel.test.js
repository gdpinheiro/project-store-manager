const { expect } = require('chai');
const { before } = require('mocha');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Verifica as funções de SalesModel', () => {
  const salesMock = [
    {
      saleId: 1,
      productId: 1,
      quantity: 5,
      date: '2022-02-25T17:51:52.000Z',
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 10,
      date: '2022-02-25T17:51:52.000Z',
    },
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
      date: '2022-02-25T17:51:52.000Z',
    },
  ];

  const dbResponse = [
    {
      sale_id: 1,
      product_id: 1,
      quantity: 5,
      date: '2022-02-25T17:51:52.000Z',
    },
    {
      sale_id: 1,
      product_id: 2,
      quantity: 10,
      date: '2022-02-25T17:51:52.000Z',
    },
    {
      sale_id: 2,
      product_id: 3,
      quantity: 15,
      date: '2022-02-25T17:51:52.000Z',
    },
  ];

  describe('Verifica a função getAll', () => {
    before(async () => {
      const execute = [salesMock];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Deve retornar um array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    });
  });

  describe('Verifica a função getById', () => {
    describe('Quando não tiver o Id informado', () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Deve retornar um array vazio', async () => {
        const result = await salesModel.getById();
        expect(result).to.be.an('array');
        expect(result).to.be.empty;
      });
    });

    describe('Quando tiver o Id informado', () => {
      before(async () => {
        const execute = [salesMock];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Deve retornar um array', async () => {
        const result = await salesModel.getById(1);
        expect(result).to.be.an('array');
      });
    });
  });

  describe('Verifica a função create', () => {
    before(async () => {
      const execute = [salesMock];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    const newSaleMock = [
      {
        productId: 1,
        quantity: 2,
      },
    ];

    it('Deve retornar um objeto', async () => {
      const result = await salesModel.create(newSaleMock);
      expect(result).to.be.an('object');
    });
  });

  describe('Verifica a função update', () => {
    before(async () => {
      const execute = [salesMock];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    const newSaleMock = [
      {
        productId: 1,
        quantity: 2,
      },
    ];

    it('Deve retornar um objeto', async () => {
      const result = await salesModel.update(1, newSaleMock);
      expect(result).to.be.an('object');
    });
  });

  describe('Verifica a função exclude', () => {
    before(async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Deve retornar um array', async () => {
      const result = await salesModel.exclude(1);
      expect(result).to.be.an('array');
    });
  });
});

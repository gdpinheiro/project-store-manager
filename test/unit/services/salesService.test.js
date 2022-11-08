const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');

describe('Verifica as funções de salesService', () => {
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

  describe('Verifica a função getAll', () => {
    before(() => {
      const dbResponse = [
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
        {
          saleId: 3,
          productId: 1,
          quantity: 2,
          date: '2022-02-25T18:29:39.000Z',
        },
      ];

      sinon.stub(salesModel, 'getAll').resolves(dbResponse);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('Deve retornar um array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    });
  });

  describe('Verifica a função getById', () => {
    const dbResponse = [
      { productId: 1, quantity: 5, date: '2022-02-25T17:51:52.000Z' },
      { productId: 2, quantity: 10, date: '2022-02-25T17:51:52.000Z' },
    ];

    describe('Quando não tiver o Id informado', () => {
      before(() => {
        sinon.stub(salesModel, 'getById').resolves([]);
      });

      after(() => {
        salesModel.getById.restore();
      });

      it('Deve retornar um array vazio', async () => {
        const result = await salesModel.getById();
        expect(result).to.be.an('array');
        expect(result).to.be.empty;
      });
    });

    describe('Quando tiver o Id informado', () => {
      before(() => {
        sinon.stub(salesModel, 'getById').resolves(dbResponse);
      });
      after(() => {
        salesModel.getById.restore();
      });
      it('Deve retornar um array', async () => {
        const result = await salesModel.getById(1);
        expect(result).to.be.an('array');
      });
    });
  });

  describe('Verifica a função create', () => {
    const dbResponse = { id: 4, itemsSold: [{ productId: 1, quantity: 2 }] };

    before(() => {
      sinon.stub(salesModel, 'create').resolves(dbResponse);
    });

    after(() => {
      salesModel.create.restore();
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
    const dbResponse = {
      saleId: '1',
      itemUpdated: [{ productId: 1, quantity: 6 }],
    };

    before(() => {
      sinon.stub(salesModel, 'update').resolves(dbResponse);
    });

    after(() => {
      salesModel.update.restore();
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
    const dbResponse = [];

    before(() => {
      sinon.stub(salesModel, 'exclude').resolves(dbResponse);
    });

    after(() => {
      salesModel.exclude.restore();
    });

    it('Deve retornar um array', async () => {
      const result = await salesModel.exclude(1);
      expect(result).to.be.an('array');
    });
  });
});

const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('Verifica as funções de productsService', () => {
  const productsMock = [
    {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10,
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
      quantity: 20,
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
      quantity: 30,
    },
  ];

  describe('Verifica a função getAll', () => {
    const dbResponse = [
      { id: 1, name: 'Martelo de Thor', quantity: 10 },
      { id: 2, name: 'Traje de encolhimento', quantity: 20 },
      { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
    ];

    before(() => {
      sinon.stub(productsModel, 'getAll').resolves(dbResponse);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('Deve retornar um array', async () => {
      const products = await productsService.getAll();
      expect(products).to.be.an('array');
    });

    it('Deve retornar um array com os produtos', async () => {
      const products = await productsService.getAll();
      expect(products).to.be.eql(productsMock);
    });
  });

  describe('Verifica a função getById', () => {
    const dbResponse = {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10,
    };

    describe('Quando não existe o Id informado', () => {
      before(() => {
        sinon.stub(productsModel, 'getById').resolves(undefined);
      });

      after(() => {
        productsModel.getById.restore();
      });

      it('Deve retornar undefined', async () => {
        const products = await productsService.getById(1);

        expect(products).to.be.undefined;
      });
    });

    describe('Quando existe o Id informado', () => {
      before(() => {
        sinon.stub(productsModel, 'getById').resolves(dbResponse);
      });

      after(() => {
        productsModel.getById.restore();
      });

      it('Deve retornar o produto correto', async () => {
        const products = await productsService.getById(1);

        expect(products).to.be.eql(productsMock[0]);
      });
    });
  });

  describe('Verifica a função create', () => {
    const dbResponse = {
      id: 4,
      name: 'Escudo do Capitão América',
      quantity: 10,
    };

    before(() => {
      sinon.stub(productsModel, 'create').resolves(dbResponse);
    });

    after(() => {
      productsModel.create.restore();
    });

    const newProduct = {
      id: 4,
      name: 'Escudo do Capitão América',
      quantity: 10,
    };

    it('Deve retornar o produto criado', async () => {
      const products = await productsService.create(
        newProduct.name,
        newProduct.quantity,
      );
      expect(products).to.be.eql(newProduct);
    });
  });

  describe('Verifica a função update', () => {
    const dbResponse = {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 15,
    };

    before(() => {
      sinon.stub(productsModel, 'update').resolves(dbResponse);
    });

    after(() => {
      productsModel.update.restore();
    });

    const newProduct = {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 15,
    };

    it('Deve retornar o produto atualizado', async () => {
      const products = await productsService.update(
        newProduct.id,
        newProduct.name,
        newProduct.quantity,
      );
      expect(products).to.be.eql(newProduct);
    });
  });

  describe('Verifica a função exclude', () => {
    before(() => {
      sinon.stub(productsModel, 'exclude').resolves([]);
    });

    after(() => {
      productsModel.exclude.restore();
    });

    it('Deve retornar um array', async () => {
      const result = await productsService.exclude(1);
      expect(result).to.be.a('array');
    });
  });
});

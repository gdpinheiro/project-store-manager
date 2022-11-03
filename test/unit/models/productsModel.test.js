const { expect } = require('chai');
const { before } = require('mocha');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('Verifica as funções de productsModel', () => {
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
  ];

  describe('Verifica a função getAll', () => {
    before(async () => {
      const execute = [productsMock];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Deve retornar um array', async () => {
      const products = await productsModel.getAll();
      expect(products).to.be.an('array');
    });

    it('Deve retornar um array com os produtos', async () => {
      const products = await productsModel.getAll();
      expect(products).to.be.eql(productsMock);
    });
  });

  describe('Verifica a função getById', () => {
    describe('Quando não existe o Id informado', () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Deve retornar undefined', async () => {
        const products = await productsModel.getById(1);
        expect(products).to.be.undefined;
      });
    });

    describe('Quando existe o Id informado', () => {
      before(async () => {
        const execute = [productsMock];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Deve retornar o produto correto', async () => {
        const products = await productsModel.getById(1);
        expect(products).to.be.eql(productsMock[0]);
      });
    });
  });

  describe('Verifica a função validateExistenceByName', () => {
    describe('Quando não existir o Nome informado', () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Deve retornar undefined', async () => {
        const products = await productsModel.validateExistenceByName(
          'Martelo de Thor',
        );
        expect(products).to.be.undefined;
      });
    });

    describe('Quando existir o Nome informado', () => {
      before(async () => {
        const execute = [productsMock];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Deve retornar o produto correto', async () => {
        const products = await productsModel.validateExistenceByName(
          'Martelo de Thor',
        );
        expect(products).to.be.eql(productsMock[0]);
      });
    });
  });

  describe('Verifica a função validateExistenceById', () => {
    describe('Quando não existir o Id informado', () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Deve retornar false', async () => {
        const products = await productsModel.validateExistenceById(1);
        expect(products).to.be.false;
      });
    });

    describe('Quando existir o Id informado', () => {
      before(async () => {
        const execute = [productsMock];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Deve retornar true', async () => {
        const products = await productsModel.validateExistenceById(1);
        expect(products).to.be.true;
      });
    });
  });

  describe('Verifica a função create', () => {
    before(async () => {
      const execute = [productsMock];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    const newProduct = {
      id: undefined,
      name: 'Escudo do Capitão América',
      quantity: 30,
    };

    it('Deve retornar o produto criado', async () => {
      const products = await productsModel.create(
        newProduct.name,
        newProduct.quantity,
      );
      expect(products).to.be.eql(newProduct);
    });
  });

  describe('Verifica a função update', () => {
    before(async () => {
      const execute = [productsMock];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    const newProduct = {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 15,
    };

    it('Deve retornar o produto atualizado', async () => {
      const products = await productsModel.update(
        newProduct.id,
        newProduct.name,
        newProduct.quantity,
      );
      expect(products).to.be.eql(newProduct);
    });
  });

  describe('Verifica a função exclude', () => {
    before(async () => {
      const execute = [productsMock];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Deve retornar um array', async () => {
      const result = await productsModel.exclude(1);
      expect(result).to.be.a('array');
    });
  });
});

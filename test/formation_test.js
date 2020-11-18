/* eslint-disable no-unused-expressions */
const { accounts, contract } = require('@openzeppelin/test-environment');

const { BN, expectRevert, time } = require('@openzeppelin/test-helpers');

const { expect } = require('chai');

const Formation = contract.fromArtifact('Formation');

describe('Formation', async function () {
  const [dev, owner, user1] = accounts;
  const MESSAGE = 'WELCOME TO MY COURSES';
  const _MESSAGE = 'NEW MESSAGE';

  context('Formation initial state', function () {
    // Execute this before each tests
    beforeEach(async function () {
      this.formation = await Formation.new(owner, MESSAGE, { from: dev });
    });

    it(`has message ${MESSAGE}`, async function () {
      expect(await this.formation.getMessage()).to.equal(MESSAGE);
    });

    it('has owner', async function () {
      expect(await this.formation.owner()).to.equal(owner);
    });

    it('has starting date', async function () {
      const _current = await time.latest();
      expect(await this.formation.getStartDate()).to.be.a.bignumber.equal(_current);
    });
  });

  context('Formation ownership', function () {
    beforeEach(async function () {
      this.formation = await Formation.new(owner, MESSAGE, { from: dev });
    });
    it('set message', async function () {
      await this.formation.setMessage(_MESSAGE, { from: owner });
      expect(await this.formation.getMessage()).to.equal(_MESSAGE);
    });

    it('reverts if setMessage is not called by owner', async function () {
      await expectRevert(this.formation.setMessage(_MESSAGE, { from: user1 }), 'Ownable: caller is not the owner');
    });
  });
  context('Formation time functions', function () {
    beforeEach(async function () {
      this.formation = await Formation.new(owner, MESSAGE, { from: dev });
    });
    it('handles not finished yet', async function () {
      expect(await this.formation.goodbye({ from: user1 })).to.equal('not finished yet!!');
    });

    it('handles finished courses', async function () {
      await time.increase(time.duration.weeks(24));
      expect(await this.formation.goodbye({ from: user1 })).to.equal('congratulations and goodbye!!');
    });
  });
});

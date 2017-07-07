var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var UserService = require('../services/UserService');

describe('UserService', function() {
    it('getSubtotal() should return 0 if no items are passed in', function() {
        expect(cartSummary.getSubtotal()).to.equal(0);
    });
});
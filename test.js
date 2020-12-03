var assert = require('assert');
var fn = require('./purchaseOrder');


var clientAccount = [
    {
        age: "15",
        balance: "-1",
        creditScore: -5
    },
    {
        age: "23",
        balance: "50",
        creditScore: 50
    },
    {
        age: "32",
        balance: "250",
        creditScore: 90
    },
    {
        age: "42",
        balance: "650",
        creditScore: 50
    },
    {
        age: "62",
        balance: "2500",
        creditScore: 50
    },
    {
        age: "80",
        balance: "4500",
        creditScore: 50
    }
];

var clientAccount2 = [
    {
        age: "10",
        balance: "-1",
        creditScore: -5
    },
    {
        age: "23",
        balance: "50",
        creditScore: 50
    },
    {
        age: "32",
        balance: "650",
        creditScore: 90
    },
    {
        age: "23",
        balance: "2500",
        creditScore: 50
    },
    {
        age: "42",
        balance: "4500",
        creditScore: 50
    },
    {
        age: "32",
        balance: "650",
        creditScore: 50
    }
];

let inventory = [
    {
        name: "shoes",
        quantity: 0
    }
];

describe('getAgeFactor() Structural Test Suite', function() {
    it('Path 1, age=15, factor=0', function() {
        assert.equal(fn.getAgeFactor(clientAccount[0]), 0);
    });
    it('Path 2, age=23, factor=10', function() {
        assert.equal(fn.getAgeFactor(clientAccount[1]), 10);
    });
    it('Path 3, age=32, factor=15', function() {
        assert.equal(fn.getAgeFactor(clientAccount[2]), 15);
    });
    it('Path 4, age=42, factor=20', function() {
        assert.equal(fn.getAgeFactor(clientAccount[3]), 20);
    });
    it('Path 5, age=62, factor=45', function() {
        assert.equal(fn.getAgeFactor(clientAccount[4]), 45);
    });
    it('Path 6, age=80, factor=25', function() {
        assert.equal(fn.getAgeFactor(clientAccount[5]), 25);
    });
});

describe('getBalanceFactor() Structural Test Suite', function() {
    it('Path 1, balance = -1, factor = 0', function() {
        assert.equal(fn.getBalanceFactor(clientAccount[0]), 0);
    });
    it('Path 2, balance = 50, factor = 5', function() {
        assert.equal(fn.getBalanceFactor(clientAccount[1]), 5);
    });
    it('Path 3, balance = 250, factor = 15', function() {
        assert.equal(fn.getBalanceFactor(clientAccount[2]), 15);
    });
    it('Path 4, balance = 650, factor = 25', function() {
        assert.equal(fn.getBalanceFactor(clientAccount[3]), 25);
    });
    it('Path 5, balance = 2500, factor = 65', function() {
        assert.equal(fn.getBalanceFactor(clientAccount[4]), 65);
    });
    it('Path 6, balance = 4500, factor = 150', function() {
        assert.equal(fn.getBalanceFactor(clientAccount[5]), 150);
    });
});

describe('getAccountStatus() Structural Test Suite', function() {
    it('Path 1, age=10 balance=-1, invalid', function(){
        assert.equal(fn.accountStatus(clientAccount2[0]), 'invalid'); 
    });
    it('Path 2, age=23 balance=50, adverse', function(){
        assert.equal(fn.accountStatus(clientAccount2[1]), 'adverse'); 
    });
    it('Path 3, age=32 balance=650, acceptable', function(){
        assert.equal(fn.accountStatus(clientAccount2[2]), 'acceptable'); 
    });
    it('Path 4, age=23 balance=2500, good', function(){
        assert.equal(fn.accountStatus(clientAccount2[3]), 'good'); 
    });
    it('Path 5, age=42 balance=4500, excellent', function(){
        assert.equal(fn.accountStatus(clientAccount2[4]), 'excellent'); 
    });
});

describe('getCreditStatus() Structural Test Suite', function() {
    it('Path 1, creditScore=-5, invalid', function() {
        assert.equal(fn.creditStatus(clientAccount2[0], "strict"), 'invalid');
    });
    it('Path 2, creditChekMode=strict creditScore=50, adverse', function() {
        assert.equal(fn.creditStatus(clientAccount2[1], "strict"), 'adverse');
    });
    it('Path 3, creditChekMode=default creditScore=-5, good', function() {
        assert.equal(fn.creditStatus(clientAccount2[2], "default"), 'good');
    });
});

describe('getProductStatus() Structural Test Suite', function() {
    it('Path 2 quantity = 0, soldout', function() {
        assert.equal(fn.productStatus('shoes', inventory, 75), 'soldout');
    });
    it('Path 3 quantity = 50, limited', function() {
        inventory[0].quantity = 50;
        assert.equal(fn.productStatus('shoes', inventory, 75), 'limited');
    });
    it('Path 2 quantity = 100, available', function() {
        inventory[0].quantity = 100;
        assert.equal(fn.productStatus('shoes', inventory, 75), 'available');
    });
});

describe('orderHandling() Structural Test Suite', function() {
    describe('Statement Coverage Tests', function() {
        it('Statement B test, rejected', function() {
            inventory[0].quantity = 0;
            assert.equal(fn.orderHandling(clientAccount[1], 'shoes', inventory, 75, 'strict'), 'rejected');
        });
        it('Statement D test, accepted', function() {
            inventory[0].quantity = 100;
            assert.equal(fn.orderHandling(clientAccount2[2], 'shoes', inventory, 75, 'strict'), 'accepted');
        });
        it('Statement F test, underReview', function() {
            inventory[0].quantity = 100;
            assert.equal(fn.orderHandling(clientAccount2[5], 'shoes', inventory, 75, 'strict'), 'underReview');
        });
        it('Statement H test, pending', function() {
            inventory[0].quantity = 50;
            assert.equal(fn.orderHandling(clientAccount2[2], 'shoes', inventory, 75, 'strict'), 'pending');
        });
    });

    describe('Branch Coverage Tests', function() {
        it('Branch 1 test, rejected', function() {
            inventory[0].quantity = 0;
            assert.equal(fn.orderHandling(clientAccount[1], 'shoes', inventory, 75, 'strict'), 'rejected');
        });
        it('Branch 2 test, accepted', function() {
            inventory[0].quantity = 100;
            assert.equal(fn.orderHandling(clientAccount2[2], 'shoes', inventory, 75, 'strict'), 'accepted');
        });
        it('Branch 3 test, underReview', function() {
            inventory[0].quantity = 100;
            assert.equal(fn.orderHandling(clientAccount2[5], 'shoes', inventory, 75, 'strict'), 'underReview');
        });
        it('Branch 4 test, pending', function() {
            inventory[0].quantity = 50;
            assert.equal(fn.orderHandling(clientAccount2[2], 'shoes', inventory, 75, 'strict'), 'pending');
        });
    });

    describe('Path Coverage Tests', function() {
        it('Path 1 test, rejected', function() {
            inventory[0].quantity = 0;
            assert.equal(fn.orderHandling(clientAccount[1], 'shoes', inventory, 75, 'strict'), 'rejected');
        });
        it('Path 2 test, accepted', function() {
            inventory[0].quantity = 100;
            assert.equal(fn.orderHandling(clientAccount2[2], 'shoes', inventory, 75, 'strict'), 'accepted');
        });
        it('Path 3 test, underReview', function() {
            inventory[0].quantity = 100;
            assert.equal(fn.orderHandling(clientAccount2[5], 'shoes', inventory, 75, 'strict'), 'underReview');
        });
        it('Path 4 test, pending', function() {
            inventory[0].quantity = 50;
            assert.equal(fn.orderHandling(clientAccount2[2], 'shoes', inventory, 75, 'strict'), 'pending');
        });
    });
});
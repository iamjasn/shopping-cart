var storeApp = angular.module('storeApp', ['ui.bootstrap'])
    .controller('StoreCtrl', ['$scope', '$timeout', function($scope, $timeout){
        $scope.products = [
        {'name': 'Product A', 'price': 20, 'quantity': 0, 'discounted': false},
        {'name': 'Product B', 'price': 50, 'quantity': 0, 'discounted': true},
        {'name': 'Product C', 'price': 30, 'quantity': 0, 'discounted': false},
        ];
        $scope.cart = [];
        $scope.addProduct = function(product) {
            var isAdded = cartContains(product);
            if (product.quantity > 0 && !isAdded) {
                $scope.cart.push(product);
                $scope.message = "Added to cart."                 
                    $timeout(function() {
                        $scope.message = null;
                    }, 5 * 1000);
            } else if (product.quantity === 0) {
                $scope.message = "Please enter a quantity."
                    $timeout(function() {
                        $scope.message = null;
                    }, 5 * 1000);
            } else {
                $scope.message = "Already in cart."
                    $timeout(function() {
                        $scope.message = null;
                    }, 5 * 1000);
            }
        };
        $scope.remove = function(index) {
            $scope.cart.splice(index, 1);
            $scope.message = "Removed from cart."
                $timeout(function() {
                    $scope.message = null;
                }, 5 * 1000);
        };
        var calcTotal = function() {
            var total = 0;
            var discount = 0;
            var discTrigger = 5;
            var discAmount = 2;
            for (var i = 0; i < $scope.cart.length; i++) {
                total = total + $scope.cart[i].price * $scope.cart[i].quantity;
                if ($scope.cart[i].discounted && ($scope.cart[i].quantity / discTrigger >= 1)) {
                    discount = Math.floor(($scope.cart[i].quantity / discTrigger)) * discAmount * $scope.cart[i].price;
                }
            }
            $scope.total = total - discount;
            $scope.discount = discount;
        };
        $scope.$watch('cart', calcTotal, true);

        var cartContains = function(product) {
            contains = false;
            for (var i = 0; i < $scope.cart.length; i++) {
                if ($scope.cart[i]['name'] === product.name) {
                    contains = true;
                }
            }
            return contains;
        }
}]);
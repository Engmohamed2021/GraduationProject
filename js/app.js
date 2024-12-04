angular.module("myApp",["ui.router","mds","ui.bootstrap"])
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state("home",{
                url:"/",
                    views:{
                        main:{
                            templateUrl:"templates/home.html",
                        }
                    }
                })
            .state("store",{
                url:"/store",
                views:{
                    main:{
                        templateUrl:"templates/store.html",
                        controller:"storeCtrl"
                    }
                }
            })
            .state("newProduct",{
                url:"/newProduct",
                views:{
                    main:{
                        templateUrl:"templates/newProduct.html",
                        controller:"newProductCtrl"
                    }
                }
            })
            .state("orders",{
                url:"/orders",
                views:{
                    main:{
                        templateUrl:"templates/orders.html",
                        controller:"ordersCtrl"
                    }
                }
            })
        $urlRouterProvider.otherwise("/")
    })
    .controller("storeCtrl",function ($scope,$rootScope,$http,$http2,$uibModal) {
        $http.get("http://localhost/Admin/api/getProducts.php")
        .then(function (response) {
            $scope.products=response.data
        })

        $scope.delProduct=function (id,index) {
            var x=confirm("Are you sure you want to delete this product?")
            if(x){
                $http.post("http://localhost/Admin/api/deleteProduct.php",{id:id})
                    .then(function (resp) {
                        if(resp.data.status){
                            toastr.success("Product deleted Successfully","success",{timeOut:2000});
                            $scope.products.splice(index,1)
                        }
                    })
            }
        }
        $http.get("http://localhost/Admin/api/getProducts.php")
            .then(function (resp) {
                $scope.products=resp.data
            })
        $scope.PreEditProduct=function (product) {
            product.price=parseFloat(product.price)
            product.qty=parseFloat(product.qty)
            $scope.selectedProduct = Object.assign({},product)   
            
            $scope.editModal = $uibModal.open ({
                templateUrl:"templates/editProduct.html",
                scope:$scope
            })
            
        }
        $scope.updateProduct = function(){
            var z = confirm("Are you sure you want to update?")
            if (z){
                $http2.post("http://localhost/Admin/api/updateProduct.php",$scope.selectedProduct)
                .then(function(resp){
                    if (resp.data.status){
                        toastr.success("Product updated Successfully","success",{timeOut:2000})
                        $scope.editModal.close()
                        $http.get("http://localhost/Admin/api/getProducts.php")
                        .then(function (resp) {
                            $scope.products=resp.data
                        })
                    }
                    else {
                        toastr.error("Failed to update product","error",{timeOut:2000});
                        $scope.editModal.close()
                    }
                })
            }
        }
})
    .controller("newProductCtrl",function ($scope,$rootScope,$http2) {
    $scope.addProduct=function () {
        $http2.post("http://localhost/Admin/api/insertProduct.php",{
            name:$scope.name,
            price:$scope.price,
            section:$scope.section,
            descr:$scope.descr,
            qty:$scope.qty,
            img:$scope.img
        }).then(function (resp) {
            if(resp.data.status){
                toastr.success("Product inserted Successfully","success",{timeOut:2000});
                $scope.name=""
                $scope.price=""
                $scope.section=""
                $scope.descr=""
                $scope.qty=""
                $scope.y=""
                $scope.$apply()
            }
            else
            toastr.error("Failed to insert product","error",{timeOut:2000});
        })
    }
})
.controller("ordersCtrl",function ($scope,$rootScope,$http) {
    $http.get("http://localhost/Admin/api/getOrders.php")
    .then(function (response) {
        $scope.orders=response.data
    })

})


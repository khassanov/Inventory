angular.module('crud') //connect angular module crud and create controller adminCtrl
    .controller('AdminPanelCtrl', AdminPanelCtrl)

AdminPanelCtrl.$inject = ['$http', '$scope', '$state'];

function AdminPanelCtrl($http, $scope, $state) {
    var vm = this;

    vm.currentUser = JSON.parse(localStorage.getItem('user'));


    $http.get('/api/crud/user/' + $state.params.user_id).success(function (data) {

        vm.products = data.hardwares;
        vm.author = data.author;
        console.log(vm.products);


    })


    vm.addModule = false;
    vm.openAddModule = function (bool) {
        if (bool == true) {
            vm.addModule = true;
        } else
            vm.addModule = false;
    }


    vm.save = function () {
        if (vm.name != 0 &&
            vm.description != 0 &&
            vm.category != 0 &&
            vm.userDBT != 0 &&
            vm.invNumber != 0 &&
            vm.state != 0 &&
            vm.comment != 0

        ) {

            var obj = {
                name: vm.name,
                description: vm.description,
                category: vm.category,
                userDBT: vm.userDBT,
                invNumber: vm.invNumber,
                state: vm.state,
                comment: vm.comment
            };


            $http.post('api/crud', obj).success(function (data) {
                vm.products.push(data);
                console.log(data);
                vm.addModule = false;
            })

        }
    }

    vm.deleteGoods = function (product) {

        $http.delete('/api/crud/' + product._id)
            .success(function () {
                var index = vm.products.indexOf(product);
                vm.products.splice(index, 1);

            })
            .error(function (err) {
                console.log(err.msg);
            })

    }


    vm.editModule = false;
    vm.openEditModule = function (product) {
        if (product) {
            vm.editBase = angular.copy(product);
            console.log(product);
            vm.editModule = true;
        } else {
            vm.editModule = false;
        }


    }
    vm.updateBase = function () {
        if (vm.editBase && vm.editBase.name && vm.editBase.name.length != '' &&
            vm.editBase.description && vm.editBase.description.length != '' &&
            vm.editBase.category && vm.editBase.category.length != '' &&
            vm.editBase.userDBT && vm.editBase.userDBT.length != '' &&
            vm.editBase.invNumber && vm.editBase.invNumber.length != '' &&
            vm.editBase.state && vm.editBase.state.length != '' &&
            vm.editBase.comment && vm.editBase.comment.length != ''

        ) {

            var sendData = new FormData();

            sendData.append('_id', vm.editBase._id);
            sendData.append('name', vm.editBase.name);
            sendData.append('description', vm.editBase.description);
            sendData.append('category', vm.editBase.category);
            sendData.append('userDBT', vm.editBase.userDBT);
            sendData.append('invNumber', vm.editBase.invNumber);
            sendData.append('state', vm.editBase.state);
            sendData.append('comment', vm.editBase.comment);

            $http.put('/api/crud', sendData, {
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (data) {

                var index = vm.findIndexById(vm.editBase._id);
                vm.products[index] = data;
                vm.editModule = false;


            })


        }


    }

    vm.findIndexById = function (id) {

        for (var i = vm.products.length - 1; i >= 0; i--) {
            if (id == vm.products[i]._id) {
                console.log(id, vm.products[i]);
                return i;

            }
        }
    }



}
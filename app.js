angular.module('app', []).controller('appCtrl', function($scope) {
   
	var index;
	var total;

	$scope.users = [];

	$scope.erro = function() {
	  alert("Preencha todos os campos para cadastrar o produto.\n- Escolha um dos tipos\n- Digite um valor\n- Digite uma quantidade maior que zero");
	};
	
	$scope.editar = function(user, i) {
	  $scope.update = angular.copy(user);
	  index = i;
	};

	$scope.editarOk = function() {
	  $scope.users[index] = $scope.update; // captura o objeto modificado e atualiza no original
	  $scope.update = ""; // reseta o update
	};
				
	$scope.salvar = function (user){

		//Adicionando no fim da array lista todos os dados do objeto i dessa array
		$scope.users.push(angular.copy(user));

		//Apaga o registro copiado para evitar duplicidade na adição de novos resgistros
		delete $scope.user;
	};

	$scope.apagar = function(index) {
		$scope.users.splice(index, 1);
	};

	$scope.selecionados = function (users){
		return lista.some(
			function (user){
				return user.selecionado;
			});
	};
	
});
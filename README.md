# app
# Estoque de produtos

<!DOCTYPE html>
<html ng-app="app">

<head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
	
	<title>Loja Virtual</title>
	
	
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.10/angular.min.js"></script>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet"/>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.23/angular.min.js"></script>
	
	<!-- Tabela Produto
		
		CREATE TABLE `valuexpc_test`.`produto` ( 
			`id` INT NOT NULL , 
			`tipo` TEXT NOT NULL , 
			`valor` DOUBLE NOT NULL , 
			`qtd` INT NOT NULL 
		) 
		ENGINE = MyISAM;
	
	-->
	
	<!--Conexão com Mysql-->
	<?php 
		//Dados para conexão
		$servidor = "br900";
		$usuario = "valuexpc_root";
		$senha = "value";
		$dbname = "valuexpc_test";
		
		//Criar a conexao
		$connect = mysqli_connect($servidor, $usuario, $senha, $dbname);
		echo "Sucesso na conexao!!";
		
		//Erro
		if(mysqli_connect_error()):
			echo "Falha na conexao: ".mysqli_connect_error();
		endif;
		
		//Consulta
		$sql = "SELECT * FROM produto";
		
		//Transformando numa consulta dentro do banco de dados
		$resultado = mysqli_query($connect,$sql);
		
	?>

	<style>

		.jumbotron{
			color: black;
			width: 450px;
			text-align: center;
			margin-left: auto;
			margin-right: auto;
			margin-top: 70px;
		}

		#titulo{
			color: #39b54a;;
			margin-bottom: 60px;
		}
		
		#download{
			
			margin-left: 1260px;
			
		}

		legend {    
		     color: #39b54a;
		     margin-top:0px;
		     margin-right:auto;
		     margin-left:auto;
		     margin-bottom:0px;
	     	}

		.navbar{
		     margin-top:0px;
		     margin-right:auto;
		     margin-left:auto;
		     margin-bottom:0px;
		}

		.footer-bottom {
		    margin-top: 5.8rem;
		    text-align: center;
		    font-size: 14px;
		    padding-bottom: 0.6rem;
		}

		.copyright {
		    display: inline-block;
		    padding: 0 1rem 0 1.2rem;
		    color: #39b54a;
		}
	
		#salvar{
			margin-top: 47px;
			margin-bottom: auto;
		}

	</style>

	<script>
		angular.module('app', []).controller('appCtrl', function($scope) {
		   
		    var index;
		    var total;

		    $scope.users = [];

		    $scope.msg = function() {
		      alert("Não foi possível calcular o tempo total de pausa");
		    };

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
	
			$scope.somar = function() {
				alert($scope.user.duracao + "minuto(s) de pausa total");
			};
	
			$scope.tempo = function(){
	        		var inicio = document.getElementById("inicio").value;
	        		var fim = document.getElementById("fim").value;
	        		var duracao = fim - inicio;
	        		alert(duracao);
			};
	
		    $scope.selecionados = function (users){
				return lista.some(
					function (user){
						return user.selecionado;
					});
		    };
    		
		});
	</script>
</head>

<body ng-controller="appCtrl" background="hero-bg.jpg">
    
	<legend class="navbar navbar-inverse">
		<nav class="navbar navbar-dark bg-dark">
			Estoque de produtos      
    		</nav>
	</legend>
	
	<div class="jumbotron">
	
	<form>

	  <table ng-show="users.length > 0" class="table">

	  	<h3 id="titulo"><b>Produtos</b></h3>

	  	   <!--Cabeçalho da tabela-->
		   <tr>
			<th id="coluna1">Tipo</th>
			<th id="coluna2">Valor</th>	
			<th id="coluna3">Quantidade</th>
			<th></th>
			<th></th>
		    </tr>
			
		    <!--Exibição recursiva dos campos digitados em update ou !update-->
		    <tr ng-repeat="user in users">

	   	      <td class="col-md-3" id="coluna1">{{user.tipo}}</td>
		      <td class="col-md-3" id="coluna2">R$ {{user.valor}}</td>
		      <td class="col-md-1" id="coluna3">{{user.qtd}}</td> 
		      <td class="col-md-1"> 
		      	<button class="glyphicon glyphicon-edit btn btn-primary" ng-click="editar(user, $index)"></button> 
		      </td>
		      <td class="col-md-1">
		      	<button class="glyphicon glyphicon-trash btn btn-danger" ng-show="users.length > 0" ng-click="apagar(users)" ng-disabled="update">
		      	</button> 
		      </td>

		    </tr>
	  </table>

	</form>

	  <form ng-if="update" name="atualizar" method="post" enctype="multipart/form-data" action="atualizar.php" class="form">

	    <!--	  
	    <select id="opcoes" class="form-control" ng-model="update.tipo">
			<option value="">Tipo de produto</option>
			<option value="Telefone">Telefone</option>
			<option value="Relógio">Relógio</option>
			<option value="TV">TV</option>
	    </select>
	    -->
	    
	    <input type="text" ng-model="update.tipo" class="form-control" placeholder="Produto: TV" id="tipo"/>
	    
	    <input type="number" value="1000" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" id="valor" class="form-control" ng-model="update.valor" placeholder="Valor - Exemplo: 10.00"/>
	    <input type="number" ng-model="update.qtd" class="form-control" placeholder="Quantidade - Exemplo: 2"/>
	    <button type="submit" ng-click="editarOk()" ng-submit="editarOk()" class="glyphicon glyphicon-edit btn btn-primary btn-block"></button>
	    
	  </form>

	  <form ng-show="!update" name="inserir" method="post" enctype="multipart/form-data" action="inserir.php" class="form">
	  
			    
		<input type="text" ng-model="user.tipo" class="form-control" placeholder="Produto: TV" id="tipo"/>   	
				  
		<input type="number" value="1000" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" id="valor" class="form-control" ng-model="user.valor" placeholder="Valor - Exemplo: 10.00"/>
		<input type="number" id="qtd" class="form-control" ng-model="user.qtd" placeholder="Quantidade - Exemplo: 2"/>
		
	  </form>

	  <button id="salvar" class="glyphicon glyphicon-ok btn btn-primary btn-block" ng-click="salvar(user)" ng-disabled="!user.tipo || !user.valor || !user.qtd || user.qtd <= 0 || user.valor <= 0">
	  
	  </button> 

	  <button class="btn btn-primary btn-block" ng-disabled="update" ng-click="erro()">Sobre</button>
	
	</div>

</body>

</html>

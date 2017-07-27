<?php
header('Content-Type: text/html; charset=utf-8');

include 'conexao.php';

$query = "
			SELECT 
				DATE_FORMAT (data,'%d/%m/%Y') datas ,
				TIME_FORMAT(horario_inicio, '%H:%i') horario_inicio,
				CASE horario_fim WHEN '00:00:00' THEN '' ELSE TIME_FORMAT(horario_fim, '%H:%i')  END horario_fim,
			    assunto,
			    local,
			    condutor
			FROM  tb_eventos_camara
			WHERE assunto LIKE '%audiencia%'
			AND data > CURDATE()
			ORDER BY data ASC, 2 ASC, 3 ASC;
";

$selectResult = mysqli_query($conexao, $query);
//echo "<h3>". $query . "</h3>";
?>

<html>
	<head>
	 	<title>Calendário do Poder Legislativo</title>
	 	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
	 	
	 	<link rel="stylesheet" type="text/css" href="resources/libs/bootstrap/css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="resources/libs/bootstrap/css/bootstrap-theme.css">
		<link rel="stylesheet" type="text/css" href="resources/css/style.css">
	 	<style>
	 	
	 	</style>
	 	<script src="resources/libs/JQuery/jquery-2.0.0.min.js" type="text/javascript"></script>
		<script src="resources/libs/bootstrap/js/bootstrap.js" type="text/javascript"></script>
		<script src="resources/js/JsGeral.js" type="text/javascript"></script>
		<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	 	
	 </head>
	
<body onLoad="fillYears(); populateTable(document.dateChooser); Filtros();">

	 <div class="container">
	 
		 <div class="row header">
		 	<div class="col-md-10" >
		 		<h1> Calendário do Poder Legislativo </h1>
		 	</div>
			<div class="col-md-2">
				 <a href="sobre.php" class="button" style="margin-top:20px;">Sobre o projeto</a> 
			</div>			
		 </div>	 	
		<div class="row" style="margin-top:20px;">
			<div class="col-md-1"></div>
			<div class="col-md-4 filtros-container" >
	      		<form name="filtros" method="post" action="index.php"> 
					<p style="margin:5px"> Data:</p> <input type="date" name="data" id="data" onchange="Filtros();" class="form-control" onkeyup="requestFiltro();"/> 
									
					<p style="margin:5px"> Assunto: </p> <input type="text" name="assunto" id="assunto" value="audiencia" class="form-control"  onkeydown="Filtros();"  onkeyup="requestFiltro();"/> 
					<p style="margin:5px"> Condutor:</p><input type="text" name="condutor" id="condutor" class="form-control" onkeydown="Filtros();" onkeyup="requestFiltro();" />
					<div class="row" style="margin-top:5px">
						<div class="col-md-6">
							<p style="margin:0px"> Local: </p>
							<select name="local" id="local" onchange="Filtros();" class="form-control">
					 			<option value=''>Selecione o local</option>			
								<?php 
								$getlocais = "SELECT DISTINCT local FROM tb_eventos_camara ORDER BY 1;";
								$LocaisResult = mysqli_query($conexao, $getlocais);
								while($row = mysqli_fetch_assoc($LocaisResult)) {
									$local = $row['local'];
									if (isset($_POST['local']) && strcmp($_POST['local'], $local) == 0 )
										echo "<option value='$local' selected > $local </option>";
									else 
										echo "<option value='$local' > $local </option>";
								}
								?>
							</select> 
						</div>
						<div class="col-md-6">
							<p style="margin:0px"> Poder: </p>
							<select name="poder" id="poder" onchange="Filtros();" class="form-control">
								<option value=''>Selecione o poder</option>
								<option value='Legislativo'>Poder Legislativo</option>
								<option value='Executivo'>Poder Executivo</option>
							</select>
						</div>
					</div>
					
					
					<!-- <p> <input type="submit" name="filtro" value="Filtrar" /> </p> -->
				</form>
	    	</div>
		    <div class="col-md-6" style="margin-bottom:50px">
		      <table id="calendarTable" class="calendario" border=1 style="text-align:center;">
					<tr class="calendario-tr" style="display:none;">
    					<th id="tableHeader" colspan=7 class="calendario-th"></th>
					</tr>
					<tr class="calendario-tr">
						<th class="calendario-th" >Dom</th>
						<th class="calendario-th" >Seg</th>
						<th class="calendario-th" >Ter</th>
						<th class="calendario-th" >Qua</th>
						<th class="calendario-th" >Qui</th>
						<th class="calendario-th" >Sex</th>
						<th class="calendario-th" >Sáb</th>
					</tr>
					<tbody id="tableBody" class="calendario-tbody" ></tbody>
					<tr class="calendario-tr calendario-footer" >
    					<td class="calendario-td" colspan=7>
    						<p>
    							<form name="dateChooser">
        							<select name="chooseMonth" class="calendario-select" onChange="populateTable(this.form)">
       	    							<option selected>Janeiro<option>Fevereiro<option>Março<option>Abril<option>Maio<option>Junho<option>Julho<option>Agosto<option>Setembro<option>Outubro<option>Novembro<option>Dezembro
    								</select>
    								<select name="chooseYear" class="calendario-select" onChange="populateTable(this.form)">
    								</select>
   								</form>
   						</td>
					</tr>
				</table>
		    </div>
		</div>
		<div>
			<div class="events-table-container">
				<div class="row" id="events-table" >
				</div>
			</div>
		</div>
	</div>
	
</body>

	
</html>
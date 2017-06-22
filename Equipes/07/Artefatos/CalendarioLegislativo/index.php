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
	 	
	 	<script src="resources/libs/JQuery/jquery-2.0.0.min.js" type="text/javascript"></script>
		<script src="resources/libs/bootstrap/js/bootstrap.js" type="text/javascript"></script>
		<script src="resources/js/JsGeral.js" type="text/javascript"></script>
	 
	 </head>
	
<body onLoad="fillYears(); populateTable(document.dateChooser)">
	 <h1> Calendário do Poder Legislativo </h1>
	 <hr/>	<br/>
	
	 <!-- Center -->
	 <div style="height:100% " class="modal-body row">
     	<!-- Side menu -->
     	<div style="height:100%" class="col-md-3">
    		<form name="filtros" method="post" action="index.php"> 
				<p> Data: <input type="date" name="data" id="data" onchange="Filtros();" /> </p>
				<p> Local: 
					<select name="local" id="local" onchange="Filtros();">
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
				</p>
				<p> Assunto: <input type="text" name="assunto" id="assunto" value="audiencia" onkeydown="Filtros();" /> </p>
				<p> Condutor: <input type="text" name="condutor" id="condutor" onkeydown="Filtros();" /> </p>
				<!-- <p> <input type="submit" name="filtro" value="Filtrar" /> </p> -->
			</form>
			
			<br/><br/><br/><br/><br/><br/>
			<br/>
			
			<a href="sobre.php" class="button">Sobre o projeto</a>
  		</div>
  		
  		
  		
  		<div class="col-md-9 corpo-da-pagina" >
    		<!-- Calendar -->
  			<div class="row">
  				<table id="calendarTable" class="calendario" border=1 style="text-align:center;">
					<tr class="calendario-tr" >
    					<th id="tableHeader" colspan=7 class="calendario-th"></th>
					</tr>
					<tr class="calendario-tr">
						<th class="calendario-th" >Domingo</th>
						<th class="calendario-th" >Segunda-Feira</th>
						<th class="calendario-th" >Terça-Feira</th>
						<th class="calendario-th" >Quarta-Feira</th>
						<th class="calendario-th" >Quinta-Feira</th>
						<th class="calendario-th" >Sexta-Feira</th>
						<th class="calendario-th" >Sábado</th>
					</tr>
					<tbody id="tableBody" class="calendario-tbody" ></tbody>
					<tr class="calendario-tr" >
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
			<!-- Events -->
  			<div class="row">	
  				<table class="events-table" id="events-table" >
					<tr >
						<th Class="events-td-th" >Data</th>
						<th Class="events-td-th" >Horario de início</th>
						<th Class="events-td-th" >Horario de término</th>
						<th Class="events-td-th" >Assunto</th>
						<th Class="events-td-th" >Local</th>
						<th Class="events-td-th" >Codutor do evento</th>
					</tr>
	
					<?php		
					while($row = mysqli_fetch_assoc($selectResult)){
						echo '<tr class="events-tr" >';
						echo '<td class="events-td-th" style="width:85;px;padding: 2px;">'.$row['datas'].'</td>';
						echo '<td class="events-td-th" >'.$row['horario_inicio'].'</td>';
						echo '<td class="events-td-th" >'.$row['horario_fim'].'</td>' ;
						echo '<td class="events-td-th" >'.$row['assunto'].'</td>';
						echo '<td class="events-td-th" >'.$row['local'].'</td>';
						echo '<td class="events-td-th" >'.$row['condutor'].'</td>';
						echo '</tr>';
					}
					?>
				</table>		
  			</div>  		
  		</div>
	</div>
	
</body>

	
</html>
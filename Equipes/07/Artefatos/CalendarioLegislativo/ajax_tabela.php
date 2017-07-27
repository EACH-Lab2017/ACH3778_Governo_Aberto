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
	condutor,
	poder
FROM  tb_eventos_camara
WHERE 1=1
";

if ($_GET['local'] != '') $query = $query . " AND local = '{$_GET['local']}' ";

if ($_GET['assunto'] != ''){ 
	$filtro_assunto = str_replace (' ','%',$_GET['assunto']);
	$query = $query . " AND assunto LIKE '%{$filtro_assunto}%' ";
}

if ($_GET['condutor'] != ''){
	$filtro_condutor = str_replace (' ','%',$_GET['condutor']);
	$query = $query . " AND condutor LIKE '%{$filtro_condutor}%' ";
}

if ($_GET['poder'] != '') $query = $query . " AND poder = '{$_GET['poder']}' ";

if (isset($_GET['data']) && $_GET['data'] != ''){ 
	$query = $query . " AND data = '{$_GET['data']}'";
} else{
	$query = $query  . " AND data > CURDATE() "; 
}

$query  = $query . " ORDER BY data ASC, 2 ASC;";
$selectResult = mysqli_query($conexao, $query);
if($selectResult->num_rows == 0){
	echo "<h6>Nenhum evento encontrado</h6>";
}else{
	echo utf8_encode('<div class="row table-row"  >
						<div class="col-md-1" >Data</div>
						<div class="col-md-1" >Horario de início</div>
						<div class="col-md-1" >Horario de término</div>
						<div class="col-md-4" >Assunto</div>
						<div class="col-md-2" >Local</div>
						<div class="col-md-2" >Condutor do evento</div>
						<div class="col-md-1" >Poder</div>
				</div>
	');
	
	while($row = mysqli_fetch_assoc($selectResult)){
		echo '<div class="row table-row"  style="padding:5px ; " >';
		echo '	<div class="col-md-1" >'.$row['datas'].'</div>';
		echo '	<div class="col-md-1" >'.$row['horario_inicio'].'</div>';
		echo '	<div class="col-md-1" >'.$row['horario_fim'].'</div>' ;
		echo '	<div class="col-md-4" >'.$row['assunto'].'</div>';
		echo '	<div class="col-md-2" >'.$row['local'].'</div>';
		echo '	<div class="col-md-2" >'.$row['condutor'].'</div>';
		echo '	<div class="col-md-1" >'.$row['poder'].'</div>';
		echo '</div>';
	}
}


?>

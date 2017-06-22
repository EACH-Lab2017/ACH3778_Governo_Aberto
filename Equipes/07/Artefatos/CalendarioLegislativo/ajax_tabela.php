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

if (isset($_GET['data']) && $_GET['data'] != ''){ 
	$query = $query . " AND data = '{$_GET['data']}'";
} else{
	$query = $query  . " AND data > CURDATE() "; 
}


$query  = $query . " ORDER BY data ASC, 2 ASC;";
$selectResult = mysqli_query($conexao, $query);


echo utf8_encode("<tr >
		<th Class='events-td-th' >Data</th>
		<th Class='events-td-th' >Horario de início</th>
		<th Class='events-td-th' >Horario de término</th>
		<th Class='events-td-th' >Assunto</th>
		<th Class='events-td-th' >Local</th>
		<th Class='events-td-th' >Codutor do evento</th>
	</tr>");

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

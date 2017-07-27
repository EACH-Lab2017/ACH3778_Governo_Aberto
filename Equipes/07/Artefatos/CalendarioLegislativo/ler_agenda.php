<?php

header('Content-Type: text/html; charset=utf-8');

require_once "simple_html_dom.php";

include 'conexao.php';


$html = file_get_html("http://www.camara.sp.gov.br/atividade-legislativa/agenda-da-camara/");

$dias= $html->find('div.agenda-events-list article h2');
$tabelas= $html->find('div.agenda-events-list article table');


$i = 0;
foreach ($dias as $d){
	//echo '<strong>' . $d->plaintext . '</strong> </br> </br>';
	$data = preg_replace('/\D/', '', $d->plaintext );
	$dia = substr($data,0,2);
	$mes = substr($data,2,2);
	$ano = substr($data,4,4);
	$data = $ano . $mes . $dia;
	foreach($tabelas[$i]->last_child()->children as $p){
		//echo $p->children[0]->plaintext . ' | ';
		$temp = preg_replace('/\D/', '', $p->children[0]->plaintext) ;
		$hora_inicio = substr($temp, 0, 4) . '00';
		$hora_fim = "";
		if (strlen($temp) > 4) $hora_fim = substr($temp, 4, 4) . '00';
		
		$assunto = trim( $p->children[1]->plaintext);
		$local = trim ( $p->children[2]->plaintext ) ;
		$vereador = trim( $p->children[3]->plaintext ); 
		
		$selectresult = $conexao->query("
					SELECT * FROM tb_eventos_camara
					WHERE assunto = '{$assunto}'
					AND data = '{$data}'
					AND horario_inicio = '{$hora_inicio}'
					AND local = '{$local}';
		");
		if (mysqli_num_rows($selectresult) == 0){
			$queryInsert = "INSERT INTO `tb_eventos_camara`
				(`assunto`, `data`, `horario_inicio`, `horario_fim`, `local`, `condutor`, 'poder')
				VALUES ('{$assunto}', '{$data}', '{$hora_inicio}', '{$hora_fim}', '{$local}', '{$vereador}', 'Legislativo');";
			
			$conexao->query($queryInsert);
			echo $data . ' | ';
			echo $hora_inicio . ' | ' ;
			echo $hora_fim . ' | ' ;
			echo $assunto . ' | ';
			echo $local . ' | ';
			echo $vereador . ' </br>';
		}
		
	}
	++$i;
	echo '</br>';
}
$conexao->close();
?>
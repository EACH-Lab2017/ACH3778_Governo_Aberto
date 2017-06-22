<?php
header('Content-Type: text/html; charset=utf-8');

$servidor = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'Calendario_Legislativo';

// Conecta-se ao banco de dados MySQL
$conexao = new mysqli($servidor, $usuario, $senha, $banco);
$conexao->set_charset("utf8");

?>
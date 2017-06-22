#!/usr/bin/python
# -*- coding: utf-8 -*-
arq = open ('numero_identificador_lattes_20170511.csv', 'r')
arq_resp = open ('num_id_lattes.txt', 'w')
for linha in arq:
	nomes = linha.split (';')
	arq_resp.write (nomes[0])
	arq_resp.write ("\n")
	print ('Id Lattes extraido: ', nomes[0])
arq.close ()
arq_resp.close ()
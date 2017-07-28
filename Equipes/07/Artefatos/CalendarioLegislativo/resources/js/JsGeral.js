var selectedDay = document.createElement('div');

function getFirstDay(theYear, theMonth){
    var firstDate = new Date(theYear,theMonth,1);
	return firstDate.getDay();
}

function getMonthLen(theYear, theMonth) {	
    var oneDay = 1000 * 60 * 60 * 24;
    var thisMonth = new Date(theYear, theMonth, 1);
	var nextMonth = new Date(theYear, theMonth + 1, 1);
	var len = Math.ceil((nextMonth.getTime() - thisMonth.getTime())/oneDay);
	return len;
}

var theMonths = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

function getObject(obj) {
	var theObj;
 	if (document.all) {
		if (typeof obj == "string") {
			return document.all(obj);
		} else {
			return obj.style;
		}
	}
	if (document.getElementById) {
	    if (typeof obj == "string") {
			return document.getElementById(obj);
		} else {
			return obj.style;
		}
	}
	return null;
}

function populateTable(form) {
    var theMonth = form.chooseMonth.selectedIndex;
	var theYear = parseInt(form.chooseYear.options[form.chooseYear.selectedIndex].text);
	var firstDay = getFirstDay(theYear, theMonth);
	var howMany = getMonthLen(theYear, theMonth);

	getObject("tableHeader").innerHTML = theMonths[theMonth] +  " " + theYear;

	var dayCounter = 1;
	var TBody = getObject("tableBody");
	while (TBody.rows.length > 0) {
		TBody.deleteRow(0);
	}
	var newR, newC;
	var done=false;
	while (!done) {
		newR = TBody.insertRow(TBody.rows.length);
		for (var i = 0; i < 7; i++) {
		    newC = newR.insertCell(newR.cells.length);
		    newC.className = "calendario_dia";
		    newC.onclick = function()
		    	{
					getDayInfo(this);
		    	}       
    		if (TBody.rows.length == 1 && i < firstDay) {
			    newC.innerHTML = ""  ; 
 				continue;
			}
			if (dayCounter == howMany) {
			    done = true;
			}
			newC.innerHTML = (dayCounter <= howMany) ? dayCounter++ : "" ;
		}

	}
}

function fillYears() {
    var today = new Date();
	var thisYear = today.getFullYear();
 	var yearChooser = document.dateChooser.chooseYear;
	for (i = thisYear; i < thisYear + 5; i++) {
		yearChooser.options[yearChooser.options.length] = new Option(i, i);
	}
	setCurrMonth(today);
}

function setCurrMonth(today) {
	document.dateChooser.chooseMonth.selectedIndex = today.getMonth();
}

function sendCheck(){
	var b = 5;
}

function getDayInfo(day){
	this.selectedDay.className = "calendario_dia";
	this.selectedDay = day;
	day.className = "calendario_dia_check";

	var mes = document.dateChooser.chooseMonth.selectedIndex + 1;
	var ano = document.dateChooser.chooseYear.value;
	var dia = day.innerHTML;
	
	if (mes < 10) var mes = "0" + mes;
	if (dia < 10) var dia = "0" + dia;
	var data = ano+"-"+mes+"-"+dia;
	document.getElementById("data").value = data;
	var local = document.getElementById("local").value;
	var assunto = document.getElementById("assunto").value;
	var condutor = document.getElementById("condutor").value;
	var poder = document.getElementById("poder").value;
	

	var xmlhttp;
	
	if (window.XMLHttpRequest){
	    xmlhttp = new XMLHttpRequest();
	}else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
	if (xmlhttp.readyState == XMLHttpRequest.DONE ){
		if(xmlhttp.status == 200){
			document.getElementById("events-table").innerHTML = xmlhttp.responseText;	
		}
		else if(xmlhttp.status == 400) {
	   		alert('There was an error 400');
		}
		else{
   			alert('something else other than 200 was returned AQUIII');
			}
		}
	}
	
 	xmlhttp.open("GET", "ajax_tabela.php?data="+data+"&local="+local+"&assunto="+assunto+"&condutor="+condutor+"&poder="+poder, true);
 	xmlhttp.send();
	
}	



function move() {
    var elem = document.getElementById("myBar"); 
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%'; 
        }
    }
}

var canRequest = false;

function requestFiltro(){
	if(!canRequest)
		return;
	canRequest = false;
	var local = document.getElementById("local").value;
	var assunto = document.getElementById("assunto").value;
	var condutor = document.getElementById("condutor").value;
	var data = document.getElementById("data").value;
	var poder = document.getElementById("poder").value;
	
	var xmlhttp;
	
	if (window.XMLHttpRequest){
	    xmlhttp = new XMLHttpRequest();
	}else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
	if (xmlhttp.readyState == XMLHttpRequest.DONE ){
		if(xmlhttp.status == 200){
			document.getElementById("events-table").innerHTML = xmlhttp.responseText;	
		}
		else if(xmlhttp.status == 400) {
	   		alert('There was an error 400');
		}
		else{
   			alert('something else other than 200 was returned');
			}
		}
	}	
 	xmlhttp.open("GET", "ajax_tabela.php?local="+local+"&assunto="+assunto+"&poder="+poder+"&condutor="+condutor+"&data="+data, true);
 	xmlhttp.send();
}
function Filtros(){
	var timer = setTimeout(function(){
		canRequest = true;
		requestFiltro();
		clearTimeout(timer);
	}, 250);
		
}	



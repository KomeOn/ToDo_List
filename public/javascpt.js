function openNav() {
	$("#nav-bar").css({"width":"250px"});
	$('body').css({"background-color":"rgba(0,0,0,0.4)"});
}
function closeNav() {
	$("#nav-bar").css({"width":"0px"});
	$('body').css({"background-color":"white"});
}

function openTask() {
	$("#task-modal").css({"display":"block"});
}
function closeTask() {
	$("#task-modal").css({"display":"none"});
}
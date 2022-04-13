var statusMenu = false;

function showMenu(){
	if(statusMenu == true){
		document.getElementById('drawer').style.width = "60px";
		document.getElementById('menuItemsID').style.display = "none";
		statusMenu = false;
		hideSubmenu();
		return;
	}else if(statusMenu == false){
		document.getElementById('drawer').style.width = "200px";
		document.getElementById('menuItemsID').style.display = "inline";
		statusMenu = true;
		return;
	}	
}	

function showSubmenu(){
	document.getElementById('submenuID').style.width = "200px";
	document.getElementById('submenu').style.display = "inline";
}

function hideSubmenu(){
	document.getElementById('submenuID').style.width = "0px";
	document.getElementById('submenu').style.display = "none";
}
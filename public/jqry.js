$(document).ready(()=> {
	
	// Declaration of Activity Topic Name
	let actn = $('#actName');
	let add_task = $('#taskn');
	let task_ok = $('#taskn-ok');
	let Wlist = $('#taskW-list');
	let Clist= $('#taskC-list');
	let Tlist = $('#taskT-list');
	let accord = $('.accordin');
	let fkstring = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
	let Tlistarr = JSON.parse(localStorage.getItem('TtaskArray')) || [];
	let Wlistarr = JSON.parse(localStorage.getItem('WtaskArray')) || [];
	let Clistarr = JSON.parse(localStorage.getItem('CtaskArray')) || [];
	
	//Display Total Task List Call
	Tlist_disp();
	
	//Display Pending Task List Call
	Wlist_disp();
	
	//Display Completion Task List Call
	Clist_disp();
//	let Tarr = {	actN: "Activity Name", 
//					taskL: " ", 
//					taskD: fkstring, 
//					imp: "false" 
//				}
//	let Warr = {	actN: "Activity Name", 
//					taskL: " ", 
//					taskD: fkstring, 
//					imp: "false" 
//				};
//	let Carr = {	actN: "Activity Name", 
//					taskL: " ", 
//					taskD: fkstring, 
//					imp: "false"
//				}
	
	//Add new Tasks
	task_ok.click(function(){
		addTask();
	});
	add_task.keypress(function(){
		if(event.keyCode == 13){
			addTask();
		}
	});
	function addTask(){
		let val = add_task.val();
		Tlist_gen(val);
		addtoServer(val);
		saveLocalstorage('TtaskArray', Tlistarr);
		Wlist_gen(val);
		saveLocalstorage('WtaskArray', Wlistarr);
		add_task.val(' ');
		$('#task-modal').css({"display":"none"});
	}
	
	//Display list if present in Local Storage otherwise fetch from Server
	//Display Total Task list if present
	function Tlist_disp(){
		let data = localStorage.getItem('TtaskArray');
		let res = JSON.parse(data) || [];
		if(res.length == 0){
			getTodo(function cb(data){
					data = JSON.stringify(data);
					res = JSON.parse(data);
					(res).forEach((val)=>{
						Tlist_gen(val.taskL);
					});
					});
		}
		 (res).forEach((val)=>{
            Tlist_gen(val.taskL);
   		})
	}
	
	//Display Peding Task List if present
	function Wlist_disp(){
		let data = localStorage.getItem('WtaskArray');
		let res = JSON.parse(data) || [];
//		if(res.length == 0){
//			
//		}
		 (res).forEach((val)=>{
            Wlist_gen(val.taskL);
   		})
	}
	
	//Display Completion Task List if present
	function Clist_disp(){
		let data = localStorage.getItem('CtaskArray');
		let res = JSON.parse(data) || [];
//		if(res.length == 0){
//			
//		}
		 (res).forEach((val)=>{
            Clist_gen(val.taskL);
   		})
	}
	
	//Adding Tasks to Total List
	function Tlist_gen(val){
		var li = $('<li/>').text(val);
		var ldiv = $('<div/>').addClass('panel');
		var lp = $('<p/>').text(fkstring);
		li.addClass('li-item accordion');
		lp.appendTo(ldiv);
		Tlist.append(li,ldiv);
		li.click(function(){
			$(li).next().toggle('slow');
		});
		Tlistarr[Tlistarr.length] = {
			actN: "Activity Name", 
			taskL: val, 
			taskD: fkstring, 
			imp: "false" 
		}
	}
	
	//Adding Tasks to Waiting List
	function Wlist_gen(val){
		var li = $('<li/>').text(val);
		li.addClass('li-item');
		Wlist.append(li);		
		li.click(function(){
			let nodes = $(this).parent().children();
			let index = nodes.index(this);			
			removeVal(index);
			li.remove();
			deletefromServer(val);
			Clist_gen(val);
		});	
		Wlistarr[Wlistarr.length] = {
			actN: "Activity Name", 
			taskL: val, 
			taskD: fkstring, 
			imp: "false" 
		}
	}
	
	//Deleting tasks from pending list and adding it to Completion List
	function Clist_gen(val){
		var li = $('<li/>').text(val);
		li.addClass('li-item');
		Clist.append(li);
		Clistarr[Clistarr.length] = {
			actN: "Activity Name", 
			taskL: val, 
			taskD: fkstring, 
			imp: "false" 
		}
		saveLocalstorage('CtaskArray', Clistarr);
	}
	
	//Save Data into Local Storage
	function saveLocalstorage(name, arr){
		localStorage.setItem(name,JSON.stringify(arr));
	}
	
	//Delete Tasks from The Pending Tasks
	function removeVal(index){
   		Wlistarr.splice(index,1);
  		saveLocalstorage('WtaskArray',Wlistarr);
	}
	
	//Adding lists to server
	function addtoServer(val) {
    	  $.post("/addTodo",
			  {
				actN: "Activity Name", 
				taskL: val, 
			  	taskD: fkstring, 
				imp: "false" 
			  },
			  function(data, status){
				
			  })
				}
	
	//Fetching data from the server
	function getTodo(cb) {
    	$.get("/data", function(data, status){
			cb(data);
  		});
	}
	
	//Deleting data from the server
	function deletefromServer(val) {
		$.post("/retdata",
			  {
				actN: "Activity Name", 
				taskL: val, 
			  	taskD: fkstring, 
				imp: "false" 
			  },
			  function(data, status){
				
			  })
	}
})

var myData;
var currentDealId
function checkStorage(){

	if(localStorage.getItem("myData") != null){
		// myData = JSON.parse(localStorage.getItem("myData"));
		myData = JSON.parse(localStorage.getItem("myData"));
	}else{
		myData = [
			{"dealId" : 0, "client_name" : "Microsoft", "project_name" : "Apollo Project", "project_manager" : "Mary", "project_cost" : 1000},
			{"dealId" : 1, "client_name" : "Intel", "project_name" : "Hermes Project", "project_manager" : "Bob", "project_cost" : 10500},
			{"dealId" : 2, "client_name" : "Apple", "project_name" : "Zeus Project", "project_manager" : "Jane", "project_cost" : 500},
			{"dealId" : 3, "client_name" : "Google", "project_name" : "Aphrodite Project", "project_manager" : "Amy", "project_cost" : 9000},
			{"dealId" : 4, "client_name" : "Apple", "project_name" : "Apple Project", "project_manager" : "Steve", "project_cost" : 11000}
		]	
	}
	currentDealId = myData.length;
	CreateTableFromJSON()
}

 

// localstorage allows us to persist key value pairs in a way that would survive page refreshes, navigation, and user closing/reopening browser.
// localstorage has limits to the size of each object stored.   

var myDataTest = localStorage.getItem("myData")

function CreateTableFromJSON() {    
    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Deal ID', 'Deal Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myData.length; i++) {
        for (var key in myData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
	table.className = "table table-striped table-dark";

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1);                   // TABLE ROW.
	
	var colName = ["Deal ID", "Client Name", "Project Name", "Project Manager", "Project Cost", ""];
	
    for (var i = 0; i < colName.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = colName[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myData.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myData[i][col[j]];
        }
        // Insert Extra Cell for the Delete Icon
        //TODO: Complete this
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = '<button onclick="DeleteRow(' + myData[i].dealId + ')"> <img src="redx.png" width="12px" height="12px"> </button>'
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function AddNewDeal() {
    var clientName = document.getElementById("clientNameInput").value;
    var projectName = document.getElementById("projectNameInput").value;
    var projectManager = document.getElementById("projectManagerInput").value;
    var projectCost = "";


    document.getElementById("clientNameInput").value = "";
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectManagerInput").value = "";


    InsertRow(currentDealId, clientName, projectName, projectManager, projectCost);
    

}

function EditNewDeal() {
    var dealId = document.getElementById("dealIdInput").value;
    var clientName = document.getElementById("clientNameInput").value;
    var projectName = document.getElementById("projectNameInput").value;
    var projectManager = document.getElementById("projectManagerInput").value;


    document.getElementById("dealIdInput").value = "";
    document.getElementById("clientNameInput").value = "";
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectManagerInput").value = "";


    EditRow(dealId, clientName, projectName, projectManager);
}

function EditNewCost() {
    var dealId = document.getElementById("dealIdInput").value;
    var projectCost = document.getElementById("projectCostInput").value;
    document.getElementById("dealIdInput").value = "";
    document.getElementById("projectCostInput").value = "";
    EditCost(dealId,projectCost);
}

function EditCost(dealId, projectCost){
	
	for( var i = 0; i < myData.length; i++){
		if ( myData[i].dealId === parseInt(dealId)) { 
			myData[i].project_cost = projectCost;
		}
	}
	CreateTableFromJSON();
}

function EditRow(dealId, clientName, projectName, projectManager){
	
	for( var i = 0; i < myData.length; i++){
		if ( myData[i].dealId === parseInt(dealId)) { 
			myData[i].client_name = clientName;
			myData[i].project_name = projectName;
			myData[i].project_manager = projectManager;
		}
	}
	CreateTableFromJSON();
}

function InsertRow(dealId, clientName, projectName, projectManager, projectCost) {
    myData.push({"dealId": dealId, "client_name" : clientName, "project_name" : projectName, "project_manager" : projectManager, "project_cost" : projectCost})
    currentDealId++;
    CreateTableFromJSON();
}

function DeleteRow(dealId) {
     
    for( var i = 0; i < myData.length; i++){ 
    
        if ( myData[i].dealId === dealId) { 
    
            myData.splice(i, 1); 
        }
    
    }
    CreateTableFromJSON();
}

function ToFinance(){
	localStorage.setItem("myData",JSON.stringify(myData));
	location.href = "finance-view.html";
}

function ToProgram(){
	localStorage.setItem("myData",JSON.stringify(myData));
	location.href = "program-view.html";
}
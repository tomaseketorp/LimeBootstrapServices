var lbsappstore = {
	init : function(){
		$.getJSON("/api/apps/", function(data) { 
			var vm = new viewModel(data);
			console.log(ko.mapping.toJS(vm));
			ko.applyBindings(vm);
		});
	}
};

/**
ViewModel
*/
var viewModel = function(rawData){
	var self = this;
	$(rawData.apps).each(function(index,app){
	
		if(app.name){
			app.readme = markdown.toHTML(app.readme);
			app.expandedApp= ko.observable(false);
			app.expandApp = function(app){
				app.expandedApp(true);
				location.hash = app.name()
				$("#expanded-"+app.name()).modal('show');
			}
			app.closeApp = function(app){
				console.log(event.currentTarget.id)
				app.expandedApp(false);
				location.hash = '';
				$("#expanded-"+app.name()).modal('hide');
			}
			app.download = function(){
				location.href= '/api/apps/' + app.name + '/download/'
			}
		}		
		
	});



	rawData =	listToMatrix(rawData.apps, 3);

	console.log(rawData);
	self.data = ko.mapping.fromJS(rawData);
}

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;
    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }
        matrix[k].push(list[i]);
    }
    return matrix;
}

/**
Lets get this party on the road
*/
$(function(){
	$(document).ready(function(){
		lbsappstore.init();

	})
	
});






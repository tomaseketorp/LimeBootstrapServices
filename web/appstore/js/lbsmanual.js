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
			app.readme = marked(app.readme);
			// App show be shown from start
			if (location.hash == "#" + app.name){
				app.expandedApp= ko.observable(true);
				rawData.expandedApp = app.name
			} else{
				app.expandedApp= ko.observable(false);
			}
			
			app.expandApp = function(app){
				app.expandedApp(true);
				location.hash = app.name()
				$("#expanded-"+app.name()).modal('show');
			}
			app.closeApp = function(app){
				app.expandedApp(false);
				location.hash = '';
				$("#expanded-"+app.name()).modal('hide');
			}
			app.download = function(){
				location.href= '/api/apps/' + app.name + '/download/'
			}
			
			if(app.info){
				if(app.info.status === 'Release'){
					app.statusColor = "label-success"
				}else if(app.info.status === 'Beta'){
					app.statusColor = "label-warning"
				}else if(app.info.status === 'Development'){
					app.statusColor = "label-danger"
				}
			}
				
		}		
		
	});
	PostProcessingLogic = function(elements){
		$(elements).find("#expanded-"+rawData.expandedApp).modal('show');
	}


	rawData.apps =	listToMatrix(rawData.apps, 3);
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

		if ($(location.hash).length > 0){
				alert("hepp")
				$("#expanded-checklist").modal('show');

			}	
	})
	
});






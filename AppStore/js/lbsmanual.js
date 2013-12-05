var lbsappstore = {
	init : function(){
		$.getJSON("http://limebootstrap.lundalogik.com/API/apps/", function(data) { 
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
	$(rawData).each(function(app){
		app.readme = window.atob(app.readme);

	});

	rawData =	listToMatrix(rawData.apps, 3);
	console.log(rawData);
	this.data = ko.mapping.fromJS(rawData);
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
	lbsappstore.init();
});






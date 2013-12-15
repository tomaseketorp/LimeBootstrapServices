jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

var lbsmanual = {
	init : function(){
		lbsmanual.getData(function(data){
			data = data.files;
			data = lbsmanual.fixData(data);

			var vm = new viewModel(data);

			chapter = vm.getSelectedPage();
	
			vm.selectChapter(chapter);
			ko.applyBindings(vm);
			vm.scrollspy.init();
			vm.scrollspy.refresh();
		})

	},

	setSystemParams : function(){

	},

	fixData : function(data){
		var dataCollecion = [];
		$.each(data,function(i){
			dataCollecion.push(
				new pageObject(data[i]['name'],data[i]['mdB64'])
				);
		})
		console.log(dataCollecion)
		return dataCollecion;
	},

	getData : function(callback){
		$.getJSON("http://localhost:5000/api/manual/", callback);
	},

	parseMd : function(d){
		var m = marked(d);
		m = replaceAll('<table>','<table class="table table-striped table-bordered">',m)
		return m
	}
};

var linkObject = function(anchor,text,level){
	var self = this;
	this.anchor = anchor;
	this.text = text;
	this.level = ko.observable(level);
	this.indent = ko.computed(function(){
		return ((self.level()-1) * 15)+'px';
	});
}

var pageObject = function(filename,md){
	var self = this;

	this.selected = false;

	this.filename = String(filename);

	this.md = md;

	this.name = ko.computed(function(){
		return self.filename.replace('.md','');
	});

	this.uri = ko.computed(function(){
		return '?p='+self.name();
	});

	this.humanName = ko.computed(function(){
		return self.filename.replace('.md','').split('_')[1].replace(/([a-z])([A-Z])/g, '$1 $2');;
	});
	
	this.index = ko.computed(function(){
		return self.filename.split('_')[0];
	});
	
	this.html = ko.computed(function(){
		return lbsmanual.parseMd(Base64.decode(self.md));
	});
}



/**
ViewModel
*/
var viewModel = function(rawData){
	var self = this;
	this.data = ko.mapping.fromJS(rawData);

	this.chapter = ko.observable();
	this.sidebar = ko.observableArray();

	/**
	Refresh scrollspy
	*/


	/**
	Create scrollspy holder
	*/
	this.scrollspy = {};

	/**
	Refresh scrollspy
	*/
	this.scrollspy.refresh = function(){
		$("body").scrollspy('refresh');
	}

	/**
	Create scrollspy
	*/
	this.scrollspy.init = function(){
		$("body").scrollspy({
	      target: '#lbs-sidebar',
	      offset: 0
	    })
	}

	/**
    Fetch the url parameters from the GET-URL
    */
    this.getURLParameter = function(name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
        );
    }

    /**
    Generate menu
    */
    this.generateSidebar = function() {
        $("h2, h3, h4, h5").each(function () {
			var l = $(this).find("a.anchor");
			var hIndex = parseInt(this.nodeName.substring(1)) - 1;
        	$(this).attr("id",l.attr("name"))
            link = new linkObject(
            	l.attr("href"),
            	$(this).text().replace(/(\r\n|\n|\r)/gm,""),
            	hIndex
            	);
            self.sidebar.push(link);
         });
    }

    /**
    getSelectedPage
    */
    this.getSelectedPage = function() {
       p = self.getURLParameter("p");
       filtered = ko.utils.arrayFilter(self.data(), function(item) {
            return p == item.name();
        });
       	return filtered.length > 0 ? filtered[0] : self.data()[0];
    }
    

    /**
    Select Chapter
    */
    this.selectChapter = function(item){
    	item.selected(true);
    	$("#content").html(item.html())
    	self.chapter(item);
    	self.generateSidebar();
    	self.scrollspy.refresh();
    }
}


/**
Lets get this party on the road
*/
$(function(){
	lbsmanual.init();
});

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

/**
String.format
*/
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
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
		return dataCollecion;
	},

	getData : function(callback){
		if(lbsmanual.getURLParameter("s") == 'local'){
			$.getJSON("http://localhost:5000/api/manual/", callback);
		}else{
			$.getJSON("http://limebootstrap.lundalogik.com/api/manual/", callback);
		}
	},

	parseMd : function(d){
		var m = marked(d);
		m = replaceAll('<table>','<table class="table table-striped table-bordered">',m)
		return m
	},

	/**
    Fetch the url parameters from the GET-URL
    */
    getURLParameter : function(name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
        );
    },
};

var linkObject = function(text,level){
	var self = this;

	this.rawText = text;

	this.text =  ko.computed(function(){
		return self.rawText.replace(/(\r\n|\n|\r)/gm,"");
	});

	this.level = ko.observable(level);

	this.name = ko.computed(function(){
		return $.trim(
				self.text()
					.replace(/ /g,'')
					.replace(/"/g, "")
					.replace(/'/g, "")
					.replace(/\(|\)/g, "")
					.replace(/\./g, "")
					.replace(/\?/g, "")
					.replace(/\:/g, "")
					).toLowerCase();
	});

	this.anchor = ko.computed(function(){
		return '#'+self.name();
	});

	this.indent = ko.computed(function(){
		return ((self.level()) * 15)+'px';
	});
}

var pageObject = function(filename,md){
	var self = this;

	this.selected = false;

	this.filename = String(filename);

	this.md = md;

	this.name = ko.computed(function(){
		return self.filename.replace('.md','').split('_')[1]
		.replace(/ /g,'')
					.replace(/"/g, "")
					.replace(/'/g, "")
					.replace(/\(|\)/g, "")
					.replace(/\./g, "").toLowerCase();
	});

	this.uri = ko.computed(function(){
		var source = lbsmanual.getURLParameter("s");
		return '?p='+self.name()+ (source != 'null' ? "&s="+source : "");
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
    Generate menu
    */
    this.generateSidebar = function() {
        self.sidebar([])
        $("h1,h2, h3, h4").each(function () {
			
			var hIndex = parseInt(this.nodeName.substring(1)) - 1;
			link = new linkObject(
            	$(this).text(),
            	hIndex
            	);

			//$(this).html('<a class="anchor" name="{0}" href="{1}"></a>{2}'.format(link.name(),link.anchor(),link.rawText));
            $(this).attr("id",link.name())

            self.sidebar.push(link);
         });
    }

    /**
    getSelectedPage
    */
    this.getSelectedPage = function() {
       p = lbsmanual.getURLParameter("p");
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
    	console.log(item.uri())
    	window.history.pushState({},"", item.uri());
    }

}


/**
Lets get this party on the road
*/
$(function(){
	lbsmanual.init();
});


var _ = require('lodash');

var localstorage = {

	set: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data) );
    },

    get: function (key) {  
        var existingData = JSON.parse(localStorage.getItem(key));
		if(existingData == null) existingData = [];
		return existingData;     
    },

	deleteItem: function(key, data) {
		var allData = this.get(key);	
		var newData = _.filter(allData, function(o) { return o.id != data.id; });   

		this.removeAll(key);
		this.set(key, newData);
	},

	addItem: function(key, data) {

		var existingData = this.get(key);
	    if(existingData == null) existingData = [];
	    if (typeof _.findKey(existingData, ['id', data.id]) === 'undefined') {
	    	existingData.push(data);	
	    	this.set(key, existingData);
	    }	    
	},

	removeAll: function(key) {
		localStorage.removeItem(key);
	}

}

module.exports = localstorage;


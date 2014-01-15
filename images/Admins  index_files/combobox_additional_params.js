Ext.onReady(function(){
	Ext.override(Ext.form.field.ComboBox, {
		// Add additionalParams in combo box that accepts:
		// {name: value} or {name: function() {return value;}}
		getParams: function(queryString) {
			var p = {},
				pageSize = this.pageSize,
				param = this.queryParam;
			
			if (param) {
				p[param] = queryString;
			}
		
			if (pageSize) {
				p.start = 0;
				p.limit = pageSize;
			}
			if (this.additionalParams != null) {
				var pCombined = {};
				for (var attrname in p) { pCombined[attrname] = p[attrname]; }
				for (var attrname in this.additionalParams) {
					if (typeof(this.additionalParams[attrname]) == 'function') {
						pCombined[attrname] = this.additionalParams[attrname]();
					}
					else {
						pCombined[attrname] = this.additionalParams[attrname];
					}
				}
				p = pCombined;
			}
		
				
			return p;
		},
	});
});
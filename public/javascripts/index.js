function App()
{
	var self = this;

	self.userName = ko.observable();
	self.password = ko.observable();

	self.signin = function()
	{
		alert(self.userName() + " " + self.password());
	};
};

var app = new App();
ko.validation.init({ grouping: { observable: false } });
ko.applyBindings(app);

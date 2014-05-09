function DataModel() {
    var self = this;
    self.authenticateUrl = "/login";

    self.login = function (loginInfo) {
        return $.ajax(self.authenticateUrl,{
			type:"POST",
			data:JSON.stringify(loginInfo),
	       		contentType : 'application/json'
		});
    };
}

function App(dataModel) {
    var self = this;

    self.userName = ko.observable();
    self.password = ko.observable();

    self.signin = function () {
        dataModel.login({ userName: self.userName(), password: self.password() })
		.done(
		function () {
			alert("authenticated");
		});
    };
}

var app = new App(new DataModel());
ko.validation.init({ grouping: { observable: false } });
ko.applyBindings(app);

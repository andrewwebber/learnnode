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

function ProtectedAreaViewModel(app){
	var self = this;
	self.message = ko.observable('protectedArea');
	Sammy(function(){
		this.get('#/protected',function(){
			app.activeViewName('protected');

			var accessToken = sessionStorage.getItem('accessToken');
			if(!accessToken){
				this.redirect('#/login');
			}
		});
	});
}

function LoginViewModel(app, dataModel){
	var self = this;
	self.userName = ko.observable();
	self.password = ko.observable();

	self.signin = function () {
		dataModel.login({ userName: self.userName(), password: self.password() }).done(
			function (data) {
				var accessToken = data.token;
				sessionStorage.setItem('accessToken', accessToken);
				var accessToken2 =sessionStorage.getItem('accessToken');
				console.log(accessToken2);
				window.location.hash = '#/protected';
			});
	};

	Sammy(function(){
		this.get('#/login',function(){
			app.activeViewName('login');
		});
	});
}

function App(dataModel) {
	var self = this;
	self.loginViewModel = new LoginViewModel(this,dataModel);	
	self.protectedAreaViewModel = new ProtectedAreaViewModel(this);
	self.activeViewName = ko.observable('');

	Sammy().run('#/protected');
}

var app = new App(new DataModel());
ko.validation.init({ grouping: { observable: false } });
ko.applyBindings(app);

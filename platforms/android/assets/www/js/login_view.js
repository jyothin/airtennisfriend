var LoginView = function() {

    this.initialize = function() {
        this.$el = $('<div/>');
        this.render();
    };

    this.render = function() {
        this.$el.html(this.template());
        return this;
    };

    this.initialize();

}

LoginView.prototype.template = Handlebars.compile($('#login-template').html());

function loginViewOnSubmit(t, e) {
    e.preventDefault();
    //var username = document.getElementById("login-username");
    //var password = document.getElementById("login-password");
    //console.log(username.value+':'+password.value);

    var username = $('#login-username').val();
    var password = $('#login-password').val();

    if(app.checkConnection()) {
        console.log("Logging in...");
        Parse.User.logIn(username, password, {
            success: function(user) {
                home_view.renderPlayersListView();
                var local_storage = app.getStorage('local');
                local_storage.setItem('loggedin', 'true');
                console.log("user loggedin");
            },
            error: function(user, error) {
                console.error("Error: " + error.message);
            }
        });
    }

    return false;
}

function signupOnClick() {
    home_view.renderSignupView();
}

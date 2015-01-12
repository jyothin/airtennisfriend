var SignupView = function() {

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

SignupView.prototype.template = Handlebars.compile($('#signup-template').html());

function signupViewOnSubmit(t, e) {
    e.preventDefault();
    var username = document.getElementById("signup-username");
    var password = document.getElementById("signup-password");
    var email = $('#signup_form').find("input[name='signup-email']");
    console.log(username.value+":"+password.value+":"+email.val());
    if(app.checkConnection()) {
        var user = new Parse.User();
        user.set("username", username.value);
        user.set("password", password.value);
        user.set("email", email.val());
        user.signUp(null, {
            success: function(user) {
                //Show profile info view
                console.log("User created");
                home_view.renderInfoView();
                app.getGeoLocation();
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.message);
                home_view.renderSignupView();
            }
        });
    }
    return false;
};


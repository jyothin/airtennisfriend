var ProfileView = function() {

    var profile = {};

    this.initialize = function() {
        this.$el = $('<div/>');
        this.render();
    };

    this.setProfile = function(p) {
        //profile = $.extend(true, {}, p);
        profile = p;

        this.render();
    };

    this.render = function() {
        /*
        var keys = [];
        var values = [];
        for(var k in profile) {
            keys.push(k);
            values.push(profile[k]);
        }
        console.log(keys);
        console.log(values);
        */
        this.$el.html(this.template(profile));
        return this;
    };

    this.initialize();

}

ProfileView.prototype.template = Handlebars.compile($('#profile-template').html());

function pushOnSubmit(t, e) {
    e.preventDefault();
    var message = $(t).find('#message');
    console.log(message.val());

    if(app.checkConnection()) {

        var local_storage = app.getStorage('local');
        var install_data = JSON.parse(local_storage.getItem('install_data'));
        console.log("Installation Id:" + install_data.installation_id);
        console.log("Subscribed channels:" + install_data.channels);

        Parse.Push.send({
            channels: ["AirTennisFriend"],
            data: {
                alert: message.val(),
            },
        }, {
            success: function() {
                navigator.notification.alert('Message sent', function() {
                    console.log("Push was successful");    
                });
            },
            error: function(error) {
                navigator.notification.alert('Unable to send message. Try again later.', function() {
                    console.log("Error: " + error.code + " : " + error.message);
                });
            }
        });

    }

    return false;

};

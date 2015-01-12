var HomeView = function() {

    var profile_view;
    var players_list_view;

    var info_view;
    var signup_view;
    var login_view;

    this.setStateToReady = function(id) {
        var parentElement = document.getElementById(id);
        if(parentElement) {
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        }
    };

    this.showSettingsButton = function(show) {
        var settings = this.$el.find('#settings');
        if(show) {
            settings.css('display', 'inherit');
        } else {
            settings.css('display', 'none');
        }
    };

    this.showFilterButton = function(show) {
        var search = this.$el.find('#filter');
        if(show) {
            search.css('display', 'inherit');
        } else {
            search.css('display', 'none');
        }
    };

    this.showBackButton = function(show, renderBackPage) {
        var back = this.$el.find('#back');
        back.unbind('click');
        if(show) {
            back.css('display', 'inherit');
            back.bind("click", function(event) {
                if(renderBackPage === 'signupview') {
                    home_view.renderSignupView();
                } else if(renderBackPage === 'loginview') {
                    home_view.renderLoginView();
                } else if(renderBackPage == 'playerslistview') {
                    home_view.renderPlayersListView();
                }
            });
        } else {
            back.css('display', 'none');
        }
    };

    this.renderInfoView = function() {
        this.$el.html(this.template({title: 'Profile Details'}));
        $('.content', this.$el).html(info_view.$el);
        this.showBackButton(true, 'signupview');
        this.showFilterButton(false);
        this.showSettingsButton(false);
    };

    this.renderSignupView = function() {
        this.$el.html(this.template({title: 'Sign Up'}));
        $('.content', this.$el).html(signup_view.$el);
        this.showBackButton(true, 'loginview');
        this.showFilterButton(false);
        this.showSettingsButton(false);
    };

    this.renderLoginView = function() {
        this.$el.html(this.template({title: 'Log In'}));
        $('.content', this.$el).html(login_view.$el);
        this.showBackButton(false, '');
        this.showFilterButton(false);
    };

    this.renderProfileView = function(id) {
        this.$el.html(this.template({title: 'Profile'}));

        var session_storage = app.getStorage('session');

        if(session_storage.getItem(id) === null) {

            if(app.checkConnection()) {
                var Profile = Parse.Object.extend("Profile");
                var query = new Parse.Query(Profile);
                query.get(id, {
                    success: function(profile) {
                        var last_seen = new Date(profile.updatedAt);
                        var profile_pic = null;
                        if(profile.get('profile_pic')) {
                            profile_pic = profile.get('profile_pic').url();
                        }
                        var p = {
                            'profile_pic': profile_pic,
                            'name': profile.get('name'),
                            'age': profile.get('age'),
                            'gender': profile.get('gender'),
                            'location': profile.get('location'),
                            'club': profile.get('club'),
                            'skill_level': profile.get('skill_level'),
                            'id': profile.id,
                            'last_seen': MONTHS[last_seen.getMonth()]+" "+last_seen.getDate()+", "+last_seen.getFullYear(),
                        };
                        session_storage.setItem(id, JSON.stringify(p));
                        $('.content', this.$el).html(profile_view.$el);
                        home_view.showBackButton(true, 'playerslistview');
                        home_view.showFilterButton(false);
                        profile_view.setProfile(p);
                    },
                    error: function(error) {
                        console.error("Error: " + error.message);
                    }
                });
            }
        } else {
            var p = JSON.parse(session_storage.getItem(id));
            $('.content', this.$el).html(profile_view.$el);
            home_view.showBackButton(true, 'playerslistview');
            home_view.showFilterButton(false);
            profile_view.setProfile(p);
        }
    };

    this.renderPlayersListView = function() {
        this.$el.html(this.template({title: 'Players'}));

        var session_storage = app.getStorage('session');
        var stored_distance = session_storage.getItem("distance");

        var local_storage = app.getStorage('local');
        var distance = local_storage.getItem('distance');

        if(local_storage.getItem('geo_location')) {
            var geo_location = JSON.parse(local_storage.getItem('geo_location'));
        }

        if(local_storage.getItem('players') === null || distance !== stored_distance) {

            if(stored_distance) {
                local_storage.setItem('distance', distance);
            } else {
                local_storage.removeItem('distance');
                distance = local_storage.getItem('distance');
            }

            if(app.checkConnection()) {
                var Profile = Parse.Object.extend("Profile");
                var query = new Parse.Query(Profile);

                //TODO: sort by most recent updatedAt
                //query.ascending("updatedAt");
                //query.descending("updatedAt");
                query.descending('updatedAt');

                //TODO: sort by nearest in radius
                if(distance !== null && geo_location) {
                    console.log("Distance :" + distance);

                    var reference_point = new Parse.GeoPoint({latitude: geo_location.latitude, longitude: geo_location.longitude});
                    query.withinKilometers('geo_location', reference_point, distance);
                    //query.near("geo_location", userGeoPoint);
                    //query.withinMiles("geo_location", userGeoPoint);
                    //query.withinRadians("geo_location", userGeoPoint);
                 
                }

                //query.limit(10);
                query.find({
                    success: function(results) {
                        var players = [];
                        for(var i=0; i<results.length; i++) {
                            var last_seen = new Date(results[i].updatedAt);
                            var profile_pic = null;
                            if(results[i].get('profile_pic')) {
                                profile_pic = results[i].get('profile_pic').url();
                            }
                            players[players.length] = {
                                'profile_pic': profile_pic,
                                'name': results[i].get('name'),
                                'age': results[i].get('age'),
                                'gender': results[i].get('gender'),
                                'location': results[i].get('location'),
                                'club': results[i].get('club'),
                                'skill_level': results[i].get('skill_level'),
                                'id': results[i].id,
                                'last_seen': MONTHS[last_seen.getMonth()]+" "+last_seen.getDate()+", "+last_seen.getFullYear(),
                            };
                        }
                        local_storage.setItem('players', JSON.stringify(players));
                        $('.content', this.$el).html(players_list_view.$el);
                        home_view.showBackButton(false, '');
                        home_view.showFilterButton(true);
                        players_list_view.setPlayers(players);
                    },
                    error: function(error) {
                        console.error("Error: " + error.message);
                    }
                });
            }

        } else {
            var players = JSON.parse(local_storage.getItem('players'));
            $('.content', this.$el).html(players_list_view.$el);
            this.showBackButton(false, '');
            this.showFilterButton(true);
            players_list_view.setPlayers(players);
        }
    };

    this.render = function() {

        /*
        var html = 
          "<div class='app'>" +
              "<h1>Air Tennis Friend</h1>" +
              "<div id='deviceready' class='blink'>" +
                  "<p class='event listening'>Connecting to Device</p>" +
                  "<p class='event received'>Device is Ready</p>" +
              "</div>" +
          "</div>";
        this.$el.html(html);
        */

        //Check if user had logged in
        var session_storage = app.getStorage('session');
        //session_storage.clear();
        var local_storage = app.getStorage('local');
        //local_storage.clear();
        if(local_storage.getItem('loggedin')) {
            this.renderPlayersListView();
        } else {
            //this.renderInfoView();
            //this.renderSignupView();
            this.renderLoginView();
        }

        //touchScroll('content');

        return this;
    };

    this.initialize = function() {
        this.$el = $('<div/>');

        profile_view = new ProfileView();
        players_list_view = new PlayersListView();

        info_view = new InfoView();
        signup_view = new SignupView();
        login_view = new LoginView();

        this.render();
    };

    this.initialize();

}

HomeView.prototype.template = Handlebars.compile($('#home-template').html());

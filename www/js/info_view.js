var InfoView = function() {

    this.initialize = function() {
        this.$el = $('<div/>');
        this.render();
    };

    this.render = function() {
        this.$el.html(this.template());
        return this;
    };

    this.initialize();

};

InfoView.prototype.template = Handlebars.compile($('#info-template').html());

function uploadInfo(user, profile_pic_parse_file, name, age, gender, skill_level, loc, club) {
    var local_storage = app.getStorage('local');
    var geo_location = JSON.parse(local_storage.getItem('geo_location'));
    console.log(geo_location);
    if (!DEBUG) {
      var geo_point = new Parse.GeoPoint({latitude: geo_location.latitude, longitude: geo_location.longitude});
    }

    //var Info = Parse.Object.extend("Profile");
    //var info = new Info();
    //info.set("user", user);
    if(profile_pic_parse_file) {
        //info.set("profile_pic", profile_pic_parse_file);
        user.set("profile_pic", profile_pic_parse_file);
    }
    if(geo_point) {
      //info.set("geo_location", geo_point);
      user.set("geo_location", geo_point);
    }
    //info.set("name", name);
    user.set("name", name);
    //info.set("age", age);
    user.set("age", age);
    //info.set("gender", gender);
    user.set("gender", gender);
    //info.set("skill_level", skill_level);
    user.set("skill_level", skill_level);
    //info.set("location", loc);
    user.set("location", loc);
    //info.set("club", club);
    user.set("club", club);
    
    //info.save(null, {
    user.save(null, {
        success: function(info) {
            console.log("User info saved");
            home_view.renderPlayersListView();
        }
    });

}

function infoViewOnSubmit(t, e) {
    e.preventDefault();
    var name = document.getElementById("name");
    var age = $('#info_form').find("input[name='age']");
    //var gender = document.getElementById("gender");
    var gender = $('#info_form').find("input[name='gender']");
    var loc = document.getElementById("location");
    var club = document.getElementById("club");
    var skill_level = document.getElementById("skill_level");

    if(app.checkConnection()) {
        var user = Parse.User.current();
        console.log(user.get('username'));
        /*
        user.set("name", name.value);
        user.set("age", age.val());
        user.set("gender", gender.val());
        user.set("skill_level", skill_level.value);
        */

        if($('#info_profile_pic_image').css('display') !== 'none') {
            var profile_pic = $('#info_profile_pic_image').attr('src');
            var profile_pic_parse_file = new Parse.File('profile_pic'+'_'+user.get('username')+'.jpg', {base64: profile_pic});
            //var profile_pic_parse_file = new Parse.File('profile_pic'+'_'+user.get('username')+'.jpg', profile_pic);
            profile_pic_parse_file.save().then(function() {
                console.log("Profile pic uploaded");
                uploadInfo(user, profile_pic_parse_file, name.value, age.val(), gender.val(), skill_level.value, loc.value, club.value);
            }, function(error) {
                console.log('Error: ' + error.message); 
            });

        } else {
            console.log("No profile pic uploaded!");
            uploadInfo(user, null, name.value, age.val(), gender.val(), skill_level.value, loc.value, club.value);
        }
    }
    return false;
}

function infoProfilePicOnClick(t, e) {
    app.getPic('info_profile_pic_image');
    $('#info_profile_pic_placeholder').css('display', 'none');
    $('#info_profile_pic_image').css('display', 'inherit');
}

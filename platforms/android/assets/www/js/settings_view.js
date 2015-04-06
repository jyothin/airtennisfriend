function settingsOnClick(t, e) {
    console.log('Settings on click');
    if(!DEBUG) {
        $(t).attr('href', 'settings.html');
        return false;
    } else {
        $(t).attr('href', '#settings-view');
        return false;
    }
};

function _getStorage(type) {
    if(typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        var storage = window[type + 'Storage'];
        if(!storage) {
            return null;
        } else {
            return storage;
        }
    } else {
        console.error("No Web Storage support!");
    }
}

function clearLoginInfo(t, e) {
    e.preventDefault();

    //$(t).find('span').addClass('icon icon-check');
    Parse.User.logOut();
    var current_user = Parse.User.current();
    console.log(current_user);

    var local_storage = _getStorage("local");
    console.log(local_storage.getItem('loggedin'));
    local_storage.removeItem("loggedin");

    if(!DEBUG && current_user === null) {
        navigator.notification.alert('Cleared all log in information', function() {
            console.log('Cleared...');
        });
    }

    //home_view.render();

    return false;
};

function clearFilters(t, e) {
    e.preventDefault();

    var local_storage = _getStorage("session");
    console.log(local_storage.getItem('distance'));
    local_storage.removeItem("distance");

    if(!DEBUG) {
        navigator.notification.alert('Cleared all filters', function() {
            console.log('Cleared...');
        });
    }

};

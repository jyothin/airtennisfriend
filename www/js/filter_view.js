function filterOnClick(t, e) {
    console.log('Filter on click');
    if(!DEBUG) {
        $(t).attr('href', 'filter.html');
        return false;
    } else {
        $(t).attr('href', '#filter-view');
        return true;
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

function filterViewOnSubmit(t, e) {
    e.preventDefault();
    var distance = $(t).find("input[name='distance']");
    //var email = $('#signup_form').find("input[name='signup-email']");
    console.log(distance.val());

    var session_storage = _getStorage("session");
    console.log(session_storage.getItem('distance'));
    session_storage.setItem('distance', distance.val());

    //home_view.renderPlayersListView(distance.val());

    console.log($('#close').attr('href'));
    $('#close').trigger('click');

    return false;
};

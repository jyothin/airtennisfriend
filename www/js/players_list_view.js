var PlayersListView = function() {

    var players = [];

    this.initialize = function() {
        this.$el = $('<div/>');
        this.render();
    };

    this.setPlayers = function(list) {
        players = list;
        this.render();
    };

    this.render = function() {
        this.$el.html(this.template(players));
        return this;
    };

    this.initialize();

}

PlayersListView.prototype.template = Handlebars.compile($('#players-list-template').html());

function playerOnClick(t, e) {
    e.preventDefault();
    //var id = $(t).attr("id").split('/')[1];
    var name = $(t).attr("name");
    home_view.renderProfileView(name);
    return false;
};

var protocol = window.location.protocol + "//";
var host = window.location.host + "/";
var paths = window.location.pathname.split('/');
// var path = (paths.length > 1) ? paths[1] : paths[0];
var path = paths[1];
var baseURL = protocol + host + path + "/";

$(document).ready(function(){
    activeNav();
    setTitle();
});

function logout() {
    axios.get(baseURL + 'Login/doLogout').then(function (response) {
        location.reload();
    });
}

function activeNav() {
    var getPath = paths[2];
    var masterData = ["Category","Users"];
    var active = (jQuery.inArray(getPath, masterData) == -1) ? getPath : "MasterData";
    $('#nav' + active).addClass("active");
}

function setTitle() {
    var getPath = paths[2];
    $('#set_title').append("<h3>"+ getPath +"</h3>");
    $('#set_title').attr("style","padding:10px");
}

function showHideModal(modalName) {
    if ($("#" + modalName + "").hasClass('in')) {
        $("#" + modalName + "").modal('hide');
    } else {
        $("#" + modalName + "").modal('show');
    }
}
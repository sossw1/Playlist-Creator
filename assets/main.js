$(document).ready(function () {
    /*** Splash screen ***/
    //display only once per session
    if (sessionStorage.getItem('splash') !== 'true') {
        $('#splash').show()
        sessionStorage.setItem('splash', 'true');
    } else {
        $('#splash').hide();
    }

    $('.home-page').show();         // Show home page by defaut hidden

    // Splash Screen animation timer
    var timer1 = setInterval(function () {
        $("#splash").css("opacity", "0");
        var timer2 = setInterval(function () {
            $("#splash").css("display", "none");
        }, 810);
    }, 2500);


    var userChoice = 0;
    var userList = JSON.parse(localStorage.getItem("playlistsList")) || [];
    $('.modal').modal();

    // when clicking on New playlist button
    $(document).on("click", ".new-playlist", function (event) {
        window.location.href = "newplaylist.html";
    });


    /*** Building the playlist list if any ***/
    function playlistBuild() {
        $(".playlists-list").empty(); // To avoid repeated elements 
        // Looping through the array of playlists
        for (let i = 0; i < userList.length; i++) {
            var playlistEl = $(`<li class="collection-item avatar my-playlist">`);
            // Adding attributes and children with text
            playlistEl.attr("data-name", userList[i].playlistName);
            playlistEl.attr("data-index", i);
            playlistEl.append(`<i class="material-icons circle ${userList[i].iconColor}">${userList[i].icon}</i>
            <span class="title playlist-title">${userList[i].playlistName}</span>
            <p>${userList[i].description}</p>
            <a href="#!" class="secondary-content" id="remove" data-index="${i}"><i class="material-icons">clear</i></a>`)
            $(".playlists-list").append(playlistEl);
        };
    };

    playlistBuild();

    // when clicking on a playlist button
    $(document).on("click", ".my-playlist", function (event) {
        event.preventDefault();
        userChoice = ($(this).data("index"));
        localStorage.setItem("index", JSON.stringify(userChoice));
        window.location.href = "playlistview.html";
    });

    // Hide Clear All button if no playlist
    if (userList.length == 0) {
        $("#clear-all").hide();
    }

    // for Clear All button after confirmation with the modal
    $("#modal-yes").on("click", function (event) {
        userList = [];
        localStorage.clear();
        // Hide Clear All btn once used 
        $("#clear-all").hide();

        $(".playlists-list").empty()
    });

    // Remove 1 playlist at the time
    $(document).on("click", "#remove", function (event) {
        event.stopPropagation();
        let i = $(this).data("index");
        userList.splice(i, 1);
        for (let j = 0; j < userList.length; j++) { userList[j].index = j }
        localStorage.setItem("playlistsList", JSON.stringify(userList));
        playlistBuild()
    })
})

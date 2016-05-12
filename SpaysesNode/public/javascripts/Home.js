///<reference href="/javascripts/jquery-1.10.2.intellisense.js" />

$(function () {
    //jQuery.scrollSpeed(100, 800);
    
    
    //InitStickyHeader();
    
    InitSideMenu();

    //$('.tile').mosaic({
    //    opacity		: 0.8			//Opacity for overlay (0-1)
    //});

    //$('.tile-grp').finalTilesGallery({
    //    imageSizeFactor: [[4000, .9], [1024, .8], [800, .7], [600, .4], [480, .2], [320, .1]]
    //});

});

function InitStickyHeader() {
    
    $(".tile-container").each(function () {
        var container = $(this);
        
        $(window).scroll(function () {
            var header = container.children(".stick"),
                offset = container.offset(),
                posY = offset.top - $(window).scrollTop(),
                height = container.height();
            
            if (posY <= 50) {
                if (posY + height <= 50) {
                    header.removeClass("stick-fixed");
                } else {
                    header.addClass("stick-fixed");
                }
            } else {
                header.removeClass("stick-fixed");
            }
        })
    });
}

function InitSideMenu() {
    var sideMenu = $("#side-menu");
    
    $("#menu-toggle").on('click', function () { 
        
        if (sideMenu.hasClass("side-menu-closed")) {
            sideMenu.removeClass("side-menu-closed");

            sideMenu.animate({
                left: "0px",
            }, 300, function () {
                // Animation complete.
            });

        } else {
            sideMenu.addClass("side-menu-closed");

            sideMenu.animate({
                left: "-200px",
            }, 300, function () {
                // Animation complete.
            });
        }
    });
}
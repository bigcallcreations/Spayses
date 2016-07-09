$(function () {
    var errCount = 0;
    
    var socket = io();
    
    socket.on('test', function (data) {
        alert(data);
    });
    
    $('.register-section #username').blur(function (e) {
        var val = $('.register-section #username').val();
        if (val != "") {
            $.ajax({
                type: 'GET', 
                url: '/api/user/' + val
            }).done(function (found) {
                if (found) {
                    errorCount(true);
                    $('.validationMsg-username').html('Username already taken');
                    $('.register-section #username').addClass('input-validation-err');
                    $('#registerbtn').addClass('disabled').attr('disabled', true);
                } else {
                    errorCount(false);
                    $('.validationMsg-username').html('');
                    $('.register-section #username').removeClass('input-validation-err');
                    
                    if (errCount == 0)
                        $('#registerbtn').removeClass('disabled').attr('disabled', false);
                }
            });
        } else {
            errorCount(false);
            $('.validationMsg-username').html('');
            $('.register-section #username').removeClass('input-validation-err');
            if (errCount == 0)
                $('#registerbtn').removeClass('disabled').attr('disabled', false);
        }
    });
    
    $('.register-section #email').blur(function (e) {
        var val = $('.register-section #email').val();
        if (val != "") {
            $.ajax({
                type: 'GET', 
                url: '/api/email/' + $('.register-section #email').val()
            }).done(function (found) {
                if (found) {
                    errorCount(true);
                    $('.validationMsg-email').html('Email already taken');
                    $('.register-section #email').addClass('input-validation-err');
                    $('#registerbtn').addClass('disabled').attr('disabled', true);
                } else {
                    errorCount(false);
                    $('.validationMsg-email').html('');
                    $('.register-section #email').removeClass('input-validation-err');
                    if (errCount == 0)
                        $('#registerbtn').removeClass('disabled').attr('disabled', false);
                }
            });
        } else {
            errorCount(false);
            $('.validationMsg-email').html('');
            $('.register-section #email').removeClass('input-validation-err');
            if (errCount == 0)
                $('#registerbtn').removeClass('disabled').attr('disabled', false);
        }
    });
    
    $('.resendVerify').on('click', function () { 
        socket.emit('resendverify');
    })
    
    socket.on('resendverifycomfirm', function (data) {
        alert(data);
    });
    
    function errorCount(add) {
        if (add) errCount++;
        else {
            errCount--;
            if (errCount < 0) errCount = 0;
        }
    }
});



$(".su-btn").on('click', function () {
    $(".register-section").css("display", "block");
    $(".login-section").css("display", "none");
});

//$(".si-btn").on('click', function () {
//    $(".login-section").css("display", "block");
//    $(".register-section").css("display", "none");
//});

$(".fp-btn").on('click', function () {
    $(".login-section").css("display", "none");
    $(".register-section").css("display", "none");
    $(".forgotpw-section").css("display", "block");
});

$(".register-section #close").on('click', function () {
    $(".register-section").css("display", "none");
});

$(".login-section #close").on('click', function () {
    $(".login-section").css("display", "none");
});

$(".forgotpw-section #close").on('click', function () {
    $(".forgotpw-section").css("display", "none");
});

$("#register-top").click(function () {
    $(".login-form").css("display", "block");
    $("#backdrop").css("display", "block");
});

$("#login-title button").click(function () {
    $(".login-form").css("display", "none");
    $("#backdrop").css("display", "none");
});




//Facebook login

function fb_login() {
    FB.login(function (response) {
        
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID
            
            FB.api('/me?fields=name,email', function (response) {
                user_email = response.email; //get user email
          // you can store this data into your database             
            });

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'public_profile,email'
    });
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId      : '1760206740913834',
        cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.6' // use graph api version 2.5
    });
    
    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
}
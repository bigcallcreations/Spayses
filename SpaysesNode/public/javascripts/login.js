$(function () { 

});

$(".su-btn").on('click', function () {
    $(".register-section").css("display", "block");
    $(".login-section").css("display", "none");
});

$(".si-btn").on('click', function () {
    $(".login-section").css("display", "block");
    $(".register-section").css("display", "none");
});

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
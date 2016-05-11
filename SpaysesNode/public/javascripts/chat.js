var m_name = "";

$(function () {
    var socket = io();
    $('form').submit(function () {
        socket.emit('chat', { message: $('#m').val(), user: m_name });
        $('#m').val('');
        return false;
    });
    
    socket.on('chat', function (data) {
        var who = "you";
        if (data.user == m_name)
            who = "me";

        //addMessage(who, data.message, data.user);
        //scrollToBottom();
    });

    socket.on('userConnected', function (data) {
        var who = "you";
        if (data.user == m_name)
            who = "me";

        //addMessage("userAdded", data);
        //scrollToBottom();
    });

})

$("#start").on('click', function () {
    var name = $("#name").val();

    if (name != "") {
        m_name = name;
    }

    $(".chatWindow").css('display', 'block');
    $(".nameWindow").css('display', 'none');
})

function addMessage(who, message, user) {
    var li = $(
            '<li class=' + who + '>' +
				'<div class="image">' +
					'<b></b>' +
				'</div>' +
				'<p></p>' +
			'</li>');

    li.find('p').text(message);

    if (user)
        li.find('b').text(user);

    $('#messages').append(li);
}

function scrollToBottom() {
    $("html, body").animate({ scrollTop: $(document).height() - $(window).height() }, 1000);
}


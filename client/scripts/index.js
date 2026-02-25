
console.log("How did you get here..?")

const totalScreenWidth = screen.width;
if (totalScreenWidth < 1100) {
    $(".left-panel").addClass("left-panel-mobile").removeClass("left-panel");
    $(".right-panel").remove();
}

function sendMessage(eCount) {
    $("#messageheader").text("Shoot Me a Message" + "e".repeat(eCount));
    setTimeout(() => sendMessage((eCount + 1) % Math.floor(screen.width / 128)), 100);
}

sendMessage(0);

$("#message-form").on("submit", e => {
    e.preventDefault();

    const formData = new FormData($("#message-form")[0]);
    const data = Object.fromEntries(formData.entries());

    $("#message-form")[0].reset();

    console.log(data);

    $.post('/contact', data, res => {
        console.log(res);
    });
});

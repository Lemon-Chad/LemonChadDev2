
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

$("#submit-form").on("click", () => {
    $("#message-form").trigger("submit");
    $("#message-form")[0].reset();
    return false;
});

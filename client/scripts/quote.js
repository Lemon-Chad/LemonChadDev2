
const QUOTE_INSTANCES = [
    $("#myquote1"),
    $("#myquote2"),
    $("#myquote3"),
    $("#myquote4"),
    $("#myquote5"),
    $("#myquote6"),
    $("#myquote7"),
    $("#myquote8"),
]

const QUOTE_ROLLOUT_MS = 500;

const QUOTE_RANGE = 3;

function quoteIndex(idx) {
    for (let i = 0; i < QUOTE_INSTANCES.length; i++) {
        QUOTE_INSTANCES[i].css("opacity", (idx - QUOTE_RANGE <= i && i <= idx) ? "1" : "0");
        if (i == idx - QUOTE_RANGE)
            QUOTE_INSTANCES[i].css("background-color", "var(--tert-color)");
        else if (i == idx - QUOTE_RANGE + 1)
            QUOTE_INSTANCES[i].css("background-color", "var(--seco-color)");
        else
            QUOTE_INSTANCES[i].css("background-color", "var(--prim-color)");
    }

    setTimeout(() => quoteIndex((idx + 1) % (QUOTE_INSTANCES.length + QUOTE_RANGE + 1)), QUOTE_ROLLOUT_MS);
}

$(() => quoteIndex(0));

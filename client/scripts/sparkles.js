
// First, turn template sparkle into multiple SVGs

const SPARKLE_COUNT = 15;
const SPARKLE_TIMEOUT_MS = 4000;

function animateSparkle(ele) {
    ele.animate(
        [
            { opacity: 0 },
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: (Math.random() + 0.5) * SPARKLE_TIMEOUT_MS / 2,
            easing: 'ease-in-out'
        }
    );
    
    ele.style.top = Math.random() * 100 + "%";
    ele.style.left = Math.random() * 100 + "%";
    ele.style.rotate = Math.random() * 360 + "deg";
    setTimeout(() => animateSparkle(ele), (0.5 + Math.random()) * SPARKLE_TIMEOUT_MS);
}

$(() => {
    const sparkleDiv = $("#sparkles");

    // Fetch the sparkle svg
    fetch("/assets/sparkle.svg")
        .then(resp => resp.text())
        .then(svgText => {
            const parser = new DOMParser();
            for (let i = 0; i < SPARKLE_COUNT; i++) {
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                const svgElement = svgDoc.querySelector('svg');

                svgElement.classList.add("sparkle-instance")
                sparkleDiv.append(svgElement);

                setTimeout(() => animateSparkle(svgElement), Math.random() * 2 * SPARKLE_TIMEOUT_MS);
            }
        })
        .catch(err => {
            console.log(err);
        });
});

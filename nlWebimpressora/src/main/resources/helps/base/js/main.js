const mergeObjs = (obj, model) =>
    Object.fromEntries(Object.entries(model).map(([key, value]) => (!(key in obj) ? [key, value] : [key, obj[key]])));

const randomBetween = (min, max) => Math.random() * (max - min) + min;

class ShootingStar {
    static #EXTRA_MOVEMENT = 50;
    static POSSIBLE_DIRECTIONS = ["right-up", "left-up", "right-down", "left-down"]; // /* *\ */ \*
    static DEFAULT_SHOOTING_STAR_CONFIGURATION = {
        width: 150,
        angle: { min: 2, max: 10 },
        randomnessInSeconds: 10,
    };
    static #onGoingStarAnimationIds = [];

    constructor(containerSelector) {
        this.containerSelector = containerSelector;
        this.id = Date.now();
    }

    static stopAllShootingStarEvents = () => {
        // Limpa todas as animações, cancelando-as dentro do setTimeout
        ShootingStar.#onGoingStarAnimationIds.length = 0;
    };

    stop = () => {
        ShootingStar.#onGoingStarAnimationIds = ShootingStar.#onGoingStarAnimationIds.filter((id) => id !== this.id);
    };

    start = (partialShootingStarConfig = {}) => {
        const config = mergeObjs(partialShootingStarConfig, ShootingStar.DEFAULT_SHOOTING_STAR_CONFIGURATION);

        ShootingStar.#onGoingStarAnimationIds.push(this.id);

        const randomShootingStarEvent = () => {
            const interval = Math.random() * config.randomnessInSeconds * 1000;

            setTimeout(() => {
                if (!ShootingStar.#onGoingStarAnimationIds.includes(this.id)) {
                    return;
                }

                const starContainerEl = document.querySelector(this.containerSelector);

                if (!starContainerEl) {
                    this.stop();
                    return;
                }

                const star = document.createElement("div");
                star.classList.add("shooting-star");
                star.style.width = config.width + "px";

                const direction =
                    ShootingStar.POSSIBLE_DIRECTIONS[
                        Math.floor(Math.random() * ShootingStar.POSSIBLE_DIRECTIONS.length)
                    ];
                const inclination = Math.random() * config.angle.max + config.angle.min;

                const { height: containerHeight, width: containerWidth } = starContainerEl?.getBoundingClientRect() ?? {
                    height: 0,
                    width: 0,
                };

                if (direction.includes("down")) {
                    star.style.top = Math.random() * 50 + "%";
                } else {
                    star.style.bottom = Math.random() * 50 + "%";
                }

                if (direction.includes("left")) {
                    star.style.left = "-" + config.width + "px";
                } else {
                    star.style.right = "-" + config.width + "px";
                }

                star.style.transform =
                    "rotateZ(" +
                    (direction === "right-down" || direction === "left-up" ? "-" : "") +
                    inclination +
                    "deg)";

                let distance =
                    Math.min(
                        Math.abs(containerHeight / Math.sin((inclination * Math.PI) / 180)),
                        Math.abs(containerWidth / Math.cos((inclination * Math.PI) / 180))
                    ) +
                    config.width +
                    ShootingStar.#EXTRA_MOVEMENT;
                if (direction.includes("right")) distance *= -1;

                requestAnimationFrame(() => {
                    star.style.transform += "translateX(" + distance + "px)";
                });

                starContainerEl.appendChild(star);
                setTimeout(() => {
                    star.remove();
                    randomShootingStarEvent();
                }, 1750);
            }, interval);
        };

        randomShootingStarEvent();
    };
}

class Constellation {
    static #allConstellations = [];
    static DEFAULT_STARS_CONFIG = {
        quantity: { min: 30, max: 50 },
        size: { min: 2, max: 5 },
    };
    #shouldBlink = false;

    constructor() {
        this.stars = [];
        Constellation.#allConstellations.push(this);
    }

    static removeAllExistingConstellations = () => {
        Constellation.#allConstellations.forEach((constellation) =>
            constellation.stars.forEach((star) => star.remove())
        );
        Constellation.#allConstellations.length = 0;
    };

    generateRandomStarsElements = (partialConfig = {}) => {
        const config = mergeObjs(partialConfig, Constellation.DEFAULT_STARS_CONFIG);
        document.querySelectorAll(".star").forEach((el) => el.remove());

        return Array.from(Array(Math.floor(randomBetween(config.quantity.min, config.quantity.max))).keys()).map(
            (_starNumber) => {
                const starHeight = Math.floor(randomBetween(config.size.min, config.size.max));
                const top = randomBetween(2, 98);
                const left = randomBetween(1, 99);

                const style =
                    "height: " + starHeight + "px;width: " + starHeight + "px;top: " + top + "%;left: " + left + "%;";

                const star = document.createElement("div");
                star.setAttribute("style", style);
                star.classList.add("star");
                this.stars.push(star);
                return star;
            }
        );
    };

    stopBlinking = () => {
        this.#shouldBlink = false;
    };

    startBlinking = () => {
        this.#shouldBlink = true;
        this.#blink();
    };

    #blink = () => {
        if (!this.#shouldBlink) return;

        const interval = Math.random() * 5 * 1000; // 0 – 5 segundos
        setTimeout(() => {
            const star = this.stars[Math.floor(Math.random() * this.stars.length)];

            this.#blink();

            if (!star) return;
            star.classList.add("blink");
            setTimeout(() => star.classList.remove("blink"), 400);
        }, interval);
    };
}

const startStars = () => {
    const headerEl = document.querySelector("header");
    if (!headerEl) {
        console.error("Não foi possível encontrar o elemento de header");
        return;
    }

    const starsContainerEl = document.createElement("div");
    starsContainerEl.classList.add("stars-container");

    const constellation = new Constellation();
    constellation.generateRandomStarsElements().forEach((el) => starsContainerEl.appendChild(el));

    headerEl.appendChild(starsContainerEl);

    const shootingStar = new ShootingStar("header .stars-container");
    shootingStar.start();
};

startStars();

window.addEventListener("message", (event) => {
    if (event.origin !== location.origin) return;
    if (event.data.id === "MS_CORES") {
        document.head.innerHTML += `<style>
            header { background: ${event.data.payload.mainBackgroundGradient} }
            :root { --bs-primary: ${event.data.payload.primaryColorRGB} }
        </style>`;
    }
});

window.opener?.postMessage({
    id: "NLPopupLoaded",
});

function init(): boolean {
    if (typeof window.nextmusicApi?.setSpeed !== "function") {
        return false;
    }

    const api = window.nextmusicApi;

    function createInput(): HTMLInputElement {
        const input = document.createElement("input");
        input.id = "mod-speed-input";
        input.type = "text";
        input.value = "1";

        function apply(): void {
            const val = parseFloat(input.value);
            if (!isNaN(val) && val > 0) {
                api.setSpeed(String(val));
            } else {
                input.value = "1";
                api.setSpeed("1");
            }
        }

        input.addEventListener("mousedown", (e: MouseEvent) =>
            e.stopPropagation(),
        );
        input.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            input.focus();
            input.select();
        });
        input.addEventListener("keydown", (e: KeyboardEvent) => {
            e.stopPropagation();
            const allowed = [
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
            ];
            if (
                !allowed.includes(e.key) &&
                !/^\d$/.test(e.key) &&
                e.key !== "."
            ) {
                e.preventDefault();
            }
            if (e.key === "." && input.value.includes(".")) {
                e.preventDefault();
            }
            if (e.key === "Enter") {
                apply();
                input.blur();
            }
        });
        input.addEventListener("keyup", (e: KeyboardEvent) =>
            e.stopPropagation(),
        );
        input.addEventListener("keypress", (e: KeyboardEvent) =>
            e.stopPropagation(),
        );
        input.addEventListener("blur", apply);

        return input;
    }

    function injectInput(): void {
        const target = document.querySelector(
            '[class*="PlayerBarDesktopWithBackgroundProgressBar_meta"]',
        );
        if (!target) return;
        if (target.querySelector("#mod-speed-input")) return;

        api.setSpeed("1");
        target.prepend(createInput());
    }

    injectInput();

    window.speedsObserver?.disconnect();
    window.speedsObserver = new MutationObserver(() => injectInput());
    window.speedsObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });

    return true;
}

const giveUpAt = Date.now() + 30_000;

function waitAndInitSafe(): void {
    if (Date.now() > giveUpAt) {
        return;
    }
    if (!init()) {
        setTimeout(waitAndInitSafe, 300);
    }
}

waitAndInitSafe();

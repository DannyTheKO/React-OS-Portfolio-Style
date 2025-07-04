export function btnOpenAndClose(element, header_action) {
    let btnOpen = document.querySelector(`#${element.id}_btn_open`);
    let btnClose = header_action.querySelector(`#${element.id}_btn_close`);

    // Open and Close function
    if (btnOpen != null && btnClose != null) {
        // Open "Select" Feature
        // When user action is single click
        btnOpen.addEventListener("click", () => {
            // Remove any Selected class from ALL previous icons
            document.querySelectorAll(".selected").forEach(icon => {
                icon.classList.remove("selected");
            });

            // Toggle 'Selected' class on current icon
            btnOpen.classList.toggle("selected");
        });

        // When user action is double click
        btnOpen.addEventListener("dblclick", () => {
            // Remove any Selected class from ALL previous icons
            document.querySelectorAll(".selected").forEach(icon => {
                icon.classList.remove("selected");
            });

            btnOpen.classList.remove("selected");
        })

        // Add click listener to document to handle clicking outside
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".icon")) {
                btnOpen.classList.remove("selected");
            }
        })

        // Open Button Action
        btnOpen.addEventListener("dblclick", () => {
            if (element.style.display === "none") {
                windowsRiseZIndex(element)
                element.style.display = "flex";
                element.style.flexDirection = "column";

                setTimeout(() => {
                    element.style.opacity = 1;
                }, 200);
            }
            windowsRiseZIndex(element)
        })

        // Close Button Action
        btnClose.addEventListener("click", () => {
            element.style.opacity = 0;

            setTimeout(() => {
                element.style.display = "none";
            }, 200);
        });
    }

    return {btnOpen: btnOpen, btnClose: btnClose};
}

// Popup Windows
export async function popupElement(content) {
    // Get the desktop container
    let container = document.querySelector("#Popup_Container");

    // Get the specific popup element name .PopupTrigger
    let popupOpenZone = content.querySelectorAll(".popupTrigger");
    // console.log(popupOpenZone);

    let nextPopupId = parseInt(container.dataset.popupContainerId);

    popupOpenZone.forEach((popupContent) => {
        popupContent.addEventListener("click", async () => {
            // We assign ID for the trigger area where the popup element create in the container
            // This is for identify the window if the popup already open of not!
            const checkPopupContent = container.querySelector(`[data-popup-id = "${popupContent.dataset.popupContentId}" ]`)

            // if already exist, rise the z index
            if (checkPopupContent != null) {
                setTimeout(() => {
                    windowsRiseZIndex(checkPopupContent)
                }, 50)
            } else {
                // When the element is click, we create windows element with assign popup ID
                const popupTemplate = `
                <div id="Popup">
                    <div class="Popup_header">
                        <div class="Popup_header_name">[ ${popupContent["dataset"].popupTitle} ]</div>
                        <div class="Popup_header_action">
                            <img id="Popup_btn_remove" class="svg" src="svg/close-btn.svg" alt="Close">
                        </div>
                    </div>
                    <div class="Popup_main popup">
                        ${await popupContent.innerHTML}
                    </div>
                </div>
            `;
                const parser = new DOMParser();
                const popup = parser.parseFromString(popupTemplate, "text/html");
                const popupNode = popup.body.firstChild;

                const {element, header, header_action, main} = windowElement(popupNode)
                dragElement(element, header);
                initializeZIndex(element);

                setTimeout(() => {
                    // Popup Style
                    element.style.display = "flex";
                    element.style.flexDirection = "column";
                    element.style.overflow = "hidden"
                    element.style.height = "auto";
                    element.style.top = "20%";
                    element.style.left = "25%";
                    element.style.boxShadow = "0 0 20px rgb(0, 0, 0, 1)";

                    windowsRiseZIndex(element);

                    // Animation
                    element.style.opacity = "1";

                }, 100)

                // Remove element button
                // this is where the element will be removed when user is click
                // After the element is created, we create an event listener at the "Popup_btn_remove"
                // this will remove the parent element
                const btnRemove = header_action.querySelector(`#${element.id}_btn_remove`);
                btnRemove.style.cursor = "pointer";
                btnRemove.addEventListener("click", () => {
                    element.style.opacity = "0";

                    setTimeout(() => {
                        element.remove();
                    }, 100)
                })

                // Append the element
                container.appendChild(popupNode);
                // console.log(popupNode)

                // console.log("Popup Content: " + popupNode.dataset.popupId);
                // console.log("Container ID: " + container.dataset.popupContainerId);
                // console.log("==============================")
            }
        });
    });
}


// Get windows position and other element inside of that
export function windowElement(element) {
    var header = element.querySelector(`.${element.id}_header`); // DONT FUCKING TOUCH IT
    var header_action = header.querySelector(`.${element.id}_header_action`); // DONT YOU EVEN THINK ABOUT IT
    var main = element.querySelector(`.${element.id}_main`);

    // Default windows style when start up
    element.style.display = "none";
    element.style.position = "absolute"
    element.style.transition = `opacity 0.1s ease 0s`
    element.style.opacity = "0";

    // Header action styling
    if (header_action != null) {
        header_action.style.cursor = "pointer";
    }

    initializeZIndex(element);

    return {element, header, header_action, main};
}

// Drag function
export function dragElement(element, header) {
    let initialX = 0, initialY = 0;
    let currentX = 0, currentY = 0;

    // Get user screen width and height
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    let topBarElement = document.querySelector("#Topbar_Container .Topbar");
    let topBarHeight = topBarElement.getBoundingClientRect().height;

    let isWindows = false;

    // Check element if there is a header ? if not, we use the whole div
    if (header) {
        // Topbar styling
        header.style.cursor = "grab";
        header.style.userSelect = "none";
        isWindows = true;

        // Window mode - drag from header
        header.onmousedown = (e) => {
            windowsRiseZIndex(element);
            startDragging(e);
        };
    } else {
        element.style.cursor = "pointer";
        isWindows = false;

        // Icon mode - drag from icon
        element.onmousedown = (e) => {
            windowsRiseZIndex(element);
            startDragging(e);
        };
    }

    // When mouse is pressed
    function startDragging(e) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        currentX = e.clientX;
        currentY = e.clientY;

        document.onmouseup = stopDragging;
        // call a function whenever the cursor moves:
        document.onmousemove = dragElement;
    }

    // When mouse is pressed, we drag element
    function dragElement(e) {
        e.preventDefault();
        initialX = currentX - e.clientX;
        initialY = currentY - e.clientY;
        currentX = e.clientX;
        currentY = e.clientY;

        // Calculate new position
        let newTop = element.offsetTop - initialY;
        let newLeft = element.offsetLeft - initialX;

        // Ensure window stays within viewport (adjusted for zoom)
        let maxTop;
        if (isWindows) {
            maxTop = viewportHeight - header.offsetHeight;
        } else {
            maxTop = viewportHeight - element.offsetHeight;
        }

        let maxLeft = viewportWidth - element.offsetWidth;

        // Element new drag position
        newTop = Math.max(topBarHeight, Math.min(newTop, maxTop));
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));

        element.style.top = newTop + "px";
        element.style.left = newLeft + "px";

        // Style base on situation
        if (isWindows) {
            element.style.transition = `opacity 0.1s ease 0s, 
            box-shadow 0.1s ease 0s`;

            header.style.cursor = "grabbing";
            element.style.opacity = "0.8"
            element.style.boxShadow = "0 0 40px #000000"
        } else {
            element.style.transition = `opacity 0.1s ease 0s, 
            box-shadow 0.1s ease 0s`;

            element.style.cursor = "grabbing";
            element.style.opacity = "0.8"
        }
    }

    // When mouse is unpressed
    function stopDragging() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        // Style base on situation
        if (isWindows) {
            header.style.cursor = "grab";
            element.style.opacity = "1"
            element.style.boxShadow = "0 0 20px #000000"
        } else {
            element.style.cursor = "pointer";
            element.style.opacity = "1"
        }
    }
}


// make this
function windowResize(element) {

}

function windowsRiseZIndex(element) {
    const currentZIndex = parseInt(getComputedStyle(element).getPropertyValue("--desktop-zIndex"));
    const thresholdZIndex = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--desktop-zIndex-threshold"));

    if (currentZIndex < thresholdZIndex) {
        const newZIndex = thresholdZIndex + 1;

        // Update element z-index
        element.style.zIndex = newZIndex;
        element.style.setProperty("--desktop-zIndex", newZIndex);

        // Update threshold
        document.documentElement.style.setProperty("--desktop-zIndex-threshold", newZIndex);
    }
}

// Z-index management
function initializeZIndex(element) {
    // Initial values
    element.style.setProperty("--desktop-zIndex", "1");

    // Click handler for z-index updates
    element.addEventListener("click", () => {
        windowsRiseZIndex(element)
    });
}
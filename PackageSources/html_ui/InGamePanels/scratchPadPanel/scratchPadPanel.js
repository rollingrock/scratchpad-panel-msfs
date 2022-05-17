let isPainting = false;
let lineWidth = 5;
let darkModeToggle = false;

class IngamePanelScratchPadPanel extends TemplateElement {
    constructor() {
        super(...arguments);
    }
    connectedCallback() {
        super.connectedCallback();
        this.m_MainDisplay = document.querySelector("#MainDisplay");
        this.m_MainDisplay.classList.add("hidden");
        this.m_Footer = document.querySelector("#Footer");
        this.m_Footer.classList.add("hidden");

        const canvas = document.getElementById('drawing-board');
        const ctx = canvas.getContext('2d');


        const toolbar = document.getElementById('toolbar');

        const canvasOffsetX = canvas.offsetLeft;
        const canvasOffsetY = canvas.offsetTop;

        canvas.width = window.innerWidth - canvasOffsetX;
        canvas.height = window.innerHeight - canvasOffsetY;

        window.addEventListener('resize', e => {
            canvas.width = window.innerWidth - canvasOffsetX;
            canvas.height = window.innerHeight - canvasOffsetY;
        });

        toolbar.addEventListener('click', e => {
            if (e.target.id === 'clear') {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            if (e.target.id === 'blackC') {
                if (!darkModeToggle) {
                    ctx.strokeStyle = "black";
                } else {
                    ctx.strokeStyle = "white";
                }
            }

            if (e.target.id === 'redC') {
                ctx.strokeStyle = "red";
            }

            if (e.target.id === 'greenC') {
                ctx.strokeStyle = "green";
            }

            if (e.target.id === 'blueC') {
                ctx.strokeStyle = "blue";
            }

            if (e.target.id === 'darkMode') {
                if (!darkModeToggle) {
                    e.target.textContent = "Light Mode";
                    document.getElementById('scratchPadPanel').style.backgroundColor = "black";
                    document.getElementById('blackC').style.backgroundColor = "white";
                    ctx.strokeStyle = "white";
                } else {
                    e.target.textContent = "Dark Mode";
                    document.getElementById('scratchPadPanel').style.backgroundColor = "white";
                    document.getElementById('blackC').style.backgroundColor = "black";
                    ctx.strokeStyle = "black";
                }
                darkModeToggle = !darkModeToggle;
            }

        });

        canvas.addEventListener('mousedown', (e) => {
            isPainting = true;
        });

        canvas.addEventListener('mouseup', e => {
            isPainting = false;
            ctx.stroke();
            ctx.beginPath();
        });

        const draw = (e) => {
            if (!isPainting) {
                return;
            }

            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';

            ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - 50);
            ctx.stroke();
        }

        canvas.addEventListener('mousemove', draw);

    }
    initialize() {}
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    updateImage() {}
}
window.customElements.define("ingamepanel-custom", IngamePanelScratchPadPanel);
checkAutoload();
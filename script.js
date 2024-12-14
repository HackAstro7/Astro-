(function () {
    // Configurações iniciais
    const menuWidth = 290; // Largura do menu
    let banca = 1000; // Valor inicial da banca
    const percentualEntrada = 0.1; // Percentual da banca para entrada
    const updateInterval = 15000; // Intervalo para atualização da previsão (ms)
    let currentPrediction = null;
    let status = "rolling"; // Status inicial

    // Criação e adição do menu
    const menu = createMenu();
    document.body.appendChild(menu);

    // Eventos principais
    document.addEventListener("dblclick", (e) => toggleMenu(menu, e.clientY, e.clientX));
    document.getElementById("closeMenu").addEventListener("click", () => closeMenu(menu));

    // Cria o menu visual
    function createMenu() {
        const menuElement = document.createElement("div");
        Object.assign(menuElement.style, {
            position: "fixed",
            width: `${menuWidth}px`,
            background: "#1e1e1e",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid #00FF00",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            display: "none",
            zIndex: "9999",
        });

        menuElement.id = "jv-menu";

        menuElement.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="https://i.ibb.co/HV6Yqrj/a-6235889258005dd77352c139d73f670f-removebg-preview.png"
                     style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #00FF00; margin-right: 10px;">
                <div style="flex-grow: 1; text-align: center;">
                    <h3 style='margin: 0; font-size: 18px; color: white;'>@𝗔𝘀𝘁𝗿𝗼𝟳𝗽𝗿𝗲𝘃𝗶𝗮𝘀</h3>
                    <div style='font-size: 12px; color: #00FF00; margin-top: 3px;'>
                        <i class="fab fa-instagram" style="margin-right: 5px; color: #00FF00;"></i>
                        
                    </div>
                    <div id="hackingMessage" style="font-size: 14px; color: #00FF00; margin-top: 10px;">Bem-vindo ao Astro7</div>
                </div>
                <span id="closeMenu" style="cursor: pointer; font-size: 14px; color: white;">❌</span>
            </div>
            <div id="messageArea" style="margin-top: 10px; padding: 5px; background-color: #333; border-radius: 5px;">
                <p id="messageText" style="margin: 0; font-size: 14px;">Nenhuma mensagem no momento</p>
            </div>
            <div style="margin-top: 10px; text-align: center;">
                <span class="chance" style="color: #00FF00; font-weight: bold;">Chance: 99.99%</span>
                <div style="margin-top: 5px;">Entrar no: <span class="colorIndicator">🟢</span></div>
                <div id="winMessage" style="color: #00FF00; font-weight: bold; display: none;"></div>
                <div style="margin-top: 10px; font-size: 12px; color: #00FF00;">
                    Astro7 | Versão: 4.0
                </div>
            </div>
        `;
        return menuElement;
    }

    // Alterna a exibição do menu
    function toggleMenu(menu, y, x) {
        menu.style.top = `${y}px`;
        menu.style.left = `${x}px`;
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    }

    // Fecha o menu
    function closeMenu(menu) {
        menu.style.display = "none";
    }

    // Processa o resultado simulado da API
    function processResult(apiResult) {
        const colorSymbol = apiResult.color;
        const displayColorSymbol = colorSymbol === 0 ? "⚪️" : colorSymbol === 1 ? "🟢" : "⚫";
        document.querySelector(".colorIndicator").innerText = displayColorSymbol;

        // Define a chance de forma aleatória
        const chance = Math.min(90 + Math.random() * 10, 100).toFixed(2);
        document.querySelector(".chance").innerText = `Chance: ${chance}%`;

        if (apiResult.status === "complete") {
            if (currentPrediction === colorSymbol) {
                const winMessageElement = document.getElementById("winMessage");
                winMessageElement.innerText = `Win no: ${displayColorSymbol}`;
                winMessageElement.style.display = "block";
                banca += percentualEntrada * banca * 2;
                setTimeout(() => {
                    winMessageElement.style.display = "none";
                }, 3000);
            } else {
                banca -= percentualEntrada * banca;
            }
        }

        console.log(`Banca atual: R$ ${banca.toFixed(2)}`);
    }

    // Gera um resultado simulado e processa
    function play() {
        if (status === "rolling") {
            currentPrediction = Math.floor(Math.random() * 3);
            const data = {
                status: "complete",
                color: Math.floor(Math.random() * 3),
                roll: Math.floor(Math.random() * 100),
            };
            processResult(data);
            status = "complete";
        }
    }

    // Inicializa o ciclo de previsão
    function init() {
        setInterval(() => {
            play();
            status = "rolling";
        }, updateInterval);
    }

    // Exibe mensagens no menu
    function showMessage(message) {
        const messageText = document.getElementById("messageText");
        messageText.textContent = message;
    }

    // Mensagens iniciais
    showMessage("Bem-vindo ao Astro 7 prévias!");
    init();
})();

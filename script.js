// Aguarda o carregamento completo do HTML para ativar os scripts
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. CALCULADORA DE IMPACTO SUSTENTÁVEL
    // ==========================================
    const formCalculadora = document.querySelector(".calc-box"); // Se houver tag form ao redor
    const btnSimular = document.querySelector(".calc-box button");

    if (btnSimular) {
        btnSimular.addEventListener("click", (e) => {
            e.preventDefault(); // Evita recarregar a página caso seja um formulário

            const inputArea = document.querySelector(".calc-box input[type='number']");
            const selectTecnologia = document.querySelector(".calc-box select");
            
            if (!inputArea || !selectTecnologia) return;

            const area = parseFloat(inputArea.value);
            const tecnologia = selectTecnologia.value;

            if (isNaN(area) || area <= 0) {
                alert("Por favor, insira uma quantidade de hectares válida (maior que zero).");
                return;
            }

            let resultadoMensagem = "";

            // Lógica de cálculo baseado na tecnologia escolhida
            if (tecnologia === "Irrigação Inteligente por Gotejamento") {
                const aguaEconomizada = area * 12000; // Simulação de litros por hectare
                resultadoMensagem = `Com a Irrigação por Gotejamento em ${area} hectares, você economizará aproximadamente ${aguaEconomizada.toLocaleString('pt-BR')} litros de água por ano!`;
            } else if (tecnologia === "Uso de Painéis Solares e Biomassa") {
                const CO2Reduzido = area * 2.5; // Simulação de toneladas de CO2
                resultadoMensagem = `A transição energética em ${area} hectares reduzirá cerca de ${CO2Reduzido.toFixed(1)} toneladas de CO2 da atmosfera anualmente!`;
            } else if (tecnologia === "Agricultura de Precisão via Drones") {
                const defensivosEvitados = area * 15; // Simulação em kg ou litros de insumos salvos
                resultadoMensagem = `O mapeamento por Drones em ${area} hectares evitará o desperdício de até ${defensivosEvitados.toLocaleString('pt-BR')}kg de insumos defensivos!`;
            }

            // Cria ou atualiza um box de resultado na tela de forma limpa
            let boxResultado = document.querySelector("#resultado-calculo");
            if (!boxResultado) {
                boxResultado = document.createElement("p");
                boxResultado.id = "resultado-calculo";
                boxResultado.style.marginTop = "15px";
                boxResultado.style.fontWeight = "bold";
                boxResultado.style.color = "#2e7d32"; // Tom verde sustentável
                btnSimular.after(boxResultado);
            }
            boxResultado.textContent = resultadoMensagem;
        });
    }

    // ==========================================
    // 2. QUIZ DA SUSTENTABILIDADE
    // ==========================================
    const alternativasQuiz = document.querySelectorAll(".quiz-box p, .quiz-box button, .quiz-box li"); 
    // Nota: O seletor acima busca capturar onde estão as opções A, B e C. 
    // Para garantir o clique perfeito sem mudar o HTML, adicionamos o evento baseado no texto clicado:

    alternativasQuiz.forEach(opcao => {
        // Altera o cursor para indicar clique nas opções
        if(opcao.textContent.includes("A)") || opcao.textContent.includes("B)") || opcao.textContent.includes("C)")) {
            opcao.style.cursor = "pointer";
            
            opcao.addEventListener("click", () => {
                // Remove destaques anteriores
                alternativasQuiz.forEach(opt => opt.style.backgroundColor = "transparent");

                if (opcao.textContent.startsWith("B)")) {
                    opcao.style.backgroundColor = "#c8e6c9"; // Verde claro para correto
                    alert("Resposta Correta! 🌟 A rotação de culturas e a irrigação automatizada são pilares da preservação do solo e da água.");
                } else {
                    opcao.style.backgroundColor = "#ffcdd2"; // Vermelho claro para incorreto
                    alert("Resposta Incorreta. ❌ Tente novamente! Lembre-se das práticas benéficas ao meio ambiente.");
                }
            });
        }
    });

    // ==========================================
    // 3. MAPA AGRÍCOLA INTERATIVO
    // ==========================================
    const regioesMapa = document.querySelectorAll(".mapa-box div, .mapa-box span, .mapa-box ul li");

    regioesMapa.forEach(regiao => {
        // Garante interatividade visual apenas nos blocos/itens de regiões
        if(regiao.textContent.includes("Centro-Oeste") || regiao.textContent.includes("Sudeste") || regiao.textContent.includes("Sul")) {
            regiao.style.cursor = "pointer";
            regiao.style.transition = "transform 0.2s";

            regiao.addEventListener("mouseenter", () => {
                regiao.style.transform = "scale(1.05)";
            });

            regiao.addEventListener("mouseleave", () => {
                regiao.style.transform = "scale(1)";
            });

            regiao.addEventListener("click", () => {
                let infoRegiao = "";
                if (regiao.textContent.includes("Centro-Oeste")) {
                    infoRegiao = "No Centro-Oeste, a inteligência de dados com drones otimiza vastas plantações de grãos.";
                } else if (regiao.textContent.includes("Sudeste")) {
                    infoRegiao = "O Sudeste lidera o uso de usinas solares integradas e o reaproveitamento de biomassa da cana.";
                } else if (regiao.textContent.includes("Sul")) {
                    infoRegiao = "O Sul destaca-se mundialmente no Plantio Direto e no manejo integrado para conservação do solo.";
                }
                alert(`📍 Região: ${infoRegiao}`);
            });
        }
    });

    // ==========================================
    // 4. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
    // ==========================================
    const formContato = document.querySelector(".contato-box form") || document.querySelector("form");

    if (formContato) {
        formContato.addEventListener("submit", (evento) => {
            // Captura as entradas de dados dinamicamente pelas posições/tipos
            const inputNome = formContato.querySelector("input[type='text']");
            const inputEmail = formContato.querySelector("input[type='email']");
            const txtMensagem = formContato.querySelector("textarea");

            if (inputNome && inputEmail && txtMensagem) {
                const nome = inputNome.value.trim();
                const email = inputEmail.value.trim();
                const mensagem = txtMensagem.value.trim();

                // Verifica se os campos estão vazios
                if (nome === "" || email === "" || mensagem === "") {
                    evento.preventDefault(); // Impede o envio do formulário
                    alert("Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Mensagem).");
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    evento.preventDefault();
                    alert("Por favor, insira um endereço de e-mail válido.");
                } else {
                    evento.preventDefault(); // Retém na página para simular o sucesso visualmente
                    alert(`Obrigado pelo apoio, ${nome}! Sua mensagem sobre o Agrinho 2026 foi recebida. Juntos pelo futuro sustentável!`);
                    formContato.reset(); // Limpa as caixas de digitação
                    
                    const boxSucesso = document.querySelector("#resultado-calculo");
                    if(boxSucesso) boxSucesso.textContent = ""; // Reseta calculadora se necessário
                }
            }
        });
    }
});

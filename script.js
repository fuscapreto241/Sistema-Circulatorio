document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        const conteudo = botao.nextElementSibling;
        const aberto = conteudo.style.display === "block";
        conteudo.style.display = aberto ? "none": "block";
    });
});

/*SCRIPT LINHA DO TEMPO*/ 
//LINHA DO TEMPO
function mostrarAno(id, botao) {
    // Esconde todos os eventos de uma vez só
    document.querySelectorAll(".evento").forEach(ev => ev.style.display = "none");
    
    // Remove a classe 'ativo' de todos os botões de anos
    document.querySelectorAll(".anos button").forEach(btn => btn.classList.remove("ativo"));

    // Mostra o evento selecionado e ativa o botão atual
    let eventoSelecionado = document.getElementById(id);
    eventoSelecionado.style.display = "block";
    botao.classList.add("ativo");

    // Rolar suavemente até o marco
    eventoSelecionado.scrollIntoView({ behavior: "smooth", block: "center" });
}

//QUIZ (DADOS E LÓGICA)

const perguntas = [
    {
        pergunta: "Qual é a principal função do coração no sistema circulatório?",
        alternativas: [
            "Produzir as células de defesa do organismo",
            "Filtrar os resíduos do sangue",
            "Bombear o sangue para todo o corpo",
            "Realizar as trocas gasosas nos pulmões"
        ],
        correta: 2,
        explicacao: "O coração é um órgão muscular que bombeia o sangue, permitindo o transporte de oxigênio, nutrientes e outras substâncias pelo organismo."
    },
    {
        pergunta: "Quantas cavidades possui o coração humano?",
        alternativas: [
            "Duas cavidades",
            "Três cavidades",
            "Quatro cavidades",
            "Seis cavidades"
        ],
        correta: 2,
        explicacao: "O coração humano possui quatro cavidades: átrio direito, ventrículo direito, átrio esquerdo e ventrículo esquerdo."
    },
    {
        pergunta: "Qual componente do sangue é responsável principalmente pelo transporte de oxigênio?",
        alternativas: [
            "Plaquetas",
            "Hemácias",
            "Leucócitos",
            "Plasma"
        ],
        correta: 1,
        explicacao: "As hemácias transportam oxigênio por meio da hemoglobina, uma proteína que contém ferro."
    },
    {
        pergunta: "Qual é a principal função das plaquetas?",
        alternativas: [
            "Transportar hormônios",
            "Combater diretamente todos os agentes infecciosos",
            "Produzir oxigênio para as células",
            "Participar da coagulação sanguínea"
        ],
        correta: 3,
        explicacao: "As plaquetas participam da coagulação do sangue, ajudando a formar coágulos que controlam sangramentos."
    },
    {
        pergunta: "Qual alternativa apresenta corretamente a função dos vasos sanguíneos?",
        alternativas: [
            "Artérias levam sangue para fora do coração, veias o conduzem de volta e capilares permitem trocas com os tecidos",
            "Artérias levam sangue somente aos pulmões e veias somente ao cérebro",
            "Veias bombeiam o sangue e capilares produzem células sanguíneas",
            "Capilares impedem todas as trocas entre o sangue e os tecidos"
        ],
        correta: 0,
        explicacao: "As artérias conduzem o sangue para fora do coração, as veias o levam de volta e os capilares permitem trocas de gases, nutrientes e resíduos com os tecidos."
    },
    {
        pergunta: "O que acontece durante a pequena circulação, também chamada de circulação pulmonar?",
        alternativas: [
            "O sangue sai do ventrículo esquerdo e segue diretamente para o corpo",
            "O sangue circula apenas entre os rins e o fígado",
            "O sangue vai do ventrículo direito aos pulmões e retorna ao átrio esquerdo",
            "O sangue sai do átrio esquerdo e retorna diretamente ao ventrículo direito"
        ],
        correta: 2,
        explicacao: "Na circulação pulmonar, o sangue pobre em oxigênio sai do ventrículo direito, segue para os pulmões para realizar trocas gasosas e retorna oxigenado ao átrio esquerdo."
    },
    {
        pergunta: "Por que a circulação humana é considerada dupla e completa?",
        alternativas: [
            "Porque o sangue circula somente pelas artérias e veias",
            "Porque o sangue passa duas vezes pelo coração em um ciclo completo e não ocorre mistura normal entre sangue rico e pobre em oxigênio dentro do coração",
            "Porque existem dois corações que trabalham separadamente",
            "Porque o sangue transporta apenas duas substâncias diferentes"
        ],
        correta: 1,
        explicacao: "A circulação é dupla porque possui os circuitos pulmonar e sistêmico. É completa porque não ocorre mistura normal entre o sangue rico e o pobre em oxigênio dentro do coração."
    },
    {
        pergunta: "Qual condição é caracterizada pelo acúmulo de placas de gordura, colesterol e outras substâncias nas paredes das artérias?",
        alternativas: [
            "Hipertensão arterial",
            "Anemia",
            "Arritmia",
            "Aterosclerose"
        ],
        correta: 3,
        explicacao: "A aterosclerose envolve a formação de placas nas paredes das artérias, podendo estreitar os vasos e dificultar a circulação sanguínea."
    },
    {
        pergunta: "No sistema ABO, qual característica corresponde ao sangue do tipo AB?",
        alternativas: [
            "Possui os antígenos A e B nas hemácias",
            "Não possui os antígenos A e B nas hemácias",
            "Possui somente o antígeno A nas hemácias",
            "Possui somente o antígeno B nas hemácias"
        ],
        correta: 0,
        explicacao: "O sangue tipo AB apresenta os antígenos A e B nas hemácias e, normalmente, não possui anticorpos anti-A nem anti-B no plasma."
    },
    {
        pergunta: "Qual alternativa apresenta um hábito que contribui para a saúde cardiovascular?",
        alternativas: [
            "Fumar regularmente",
            "Evitar todas as atividades físicas",
            "Manter uma alimentação equilibrada e praticar atividades físicas regularmente",
            "Ignorar o acompanhamento da pressão arterial"
        ],
        correta: 2,
        explicacao: "Uma alimentação equilibrada, a prática regular de atividades físicas e o acompanhamento da saúde ajudam a reduzir o risco de doenças cardiovasculares."
    }
];


let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}
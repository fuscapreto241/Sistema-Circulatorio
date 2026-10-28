// ==================================================
// 1. LISTA DE PACIENTES
// ==================================================

// Array que armazena os dados dos quatro pacientes.
// Cada paciente possui nome, tipo sanguíneo e avatar.
const patients = [
  { name: 'Lia Martins', type: 'A', avatar: 'lia' },
  { name: 'Ravi Costa', type: 'B', avatar: 'ravi' },
  { name: 'Bia Oliveira', type: 'AB', avatar: 'bia' },
  { name: 'Caio Santos', type: 'O', avatar: 'caio' },
];

// ==================================================
// 2. COMPATIBILIDADE SANGUÍNEA
// ==================================================

// Objeto que define quais tipos sanguíneos podem
// doar sangue para cada tipo de paciente.
//
// A: pode receber de A e O.
// B: pode receber de B e O.
// AB: pode receber de A, B, AB e O.
// O: pode receber somente de O.
//
// Esta lógica considera o sistema ABO para transfusões
// de hemácias. Na prática, o fator Rh também importa.
const compatibleDonors = {
  A: ['A', 'O'],
  B: ['B', 'O'],
  AB: ['A', 'B', 'AB', 'O'],
  O: ['O']
};


// Array com todos os tipos sanguíneos disponíveis
// para o jogador escolher durante o jogo.
const types = ['A', 'B', 'AB', 'O'];


// ==================================================
// 3. VARIÁVEIS DE CONTROLE DO JOGO
// ==================================================

// Indica qual paciente está sendo atendido.
// O índice começa em 0, ou seja, no primeiro paciente.
let patientIndex = 0;

// Guarda a quantidade de respostas corretas.
let score = 0;

// Controla se o jogador já acertou a bolsa
// do paciente atual.
//
// Quando locked for true, novas escolhas são ignoradas.
let locked = false;


// ==================================================
// 4. SELEÇÃO DOS ELEMENTOS DO HTML
// ==================================================

// Cria uma função auxiliar chamada $.
// Ela recebe um seletor CSS e procura o elemento
// correspondente dentro do documento HTML.
const $ = (selector) => document.querySelector(selector);


// Guarda referências aos elementos HTML do jogo.

// Elemento que mostra o nome do paciente.
const patientName = $('#patientName');

// Elemento que mostra o tipo sanguíneo do paciente.
const patientBlood = $('#patientBlood');

// Elemento que exibe a pontuação do jogador.
const scoreEl = $('#score');

// Barra visual que indica o progresso do jogo.
const progressFill = $('#progressFill');

// Elemento que apresenta mensagens ao jogador.
const feedback = $('#feedback');

// Área onde ficam os botões dos tipos sanguíneos.
const choices = $('#bloodChoices');

// Botão utilizado para avançar ao próximo paciente.
const nextButton = $('#nextButton');

// Botão utilizado para reiniciar o jogo.
const resetButton = $('#resetButton');

// Elemento que representa a cena do hospital.
const scene = $('.hospital-scene');

// Elemento que mostra o tipo sanguíneo da bolsa.
const sceneBagType = $('#sceneBagType');

// Painel que contém as informações da missão.
const missionPanel = $('.mission-panel');


// ==================================================
// 5. CRIAÇÃO DOS BOTÕES DE TIPOS SANGUÍNEOS
// ==================================================

function renderChoices() {

  // Remove todos os botões existentes na área de escolhas.
  // Isso evita duplicar os botões quando outro paciente
  // for carregado.
  choices.replaceChildren();

  // Percorre cada tipo sanguíneo presente no array types.
  types.forEach((type) => {

    // Cria um novo elemento HTML <button>.
    const button = document.createElement('button');

    // Define a classe CSS do botão.
    // Ela será utilizada para estilizar o botão no CSS.
    button.className = 'blood-choice';

    // Define o tipo do botão como button.
    // Assim, ele não tenta enviar formulários por acidente.
    button.type = 'button';

    // Define o texto que aparecerá dentro do botão.
    button.textContent = type;

    // Adiciona uma descrição acessível para leitores
    // de tela, identificando o tipo sanguíneo da bolsa.
    button.setAttribute('aria-label', `Bolsa tipo ${type}`);

    // Adiciona um evento de clique ao botão.
    // Quando ele for clicado, a função chooseBlood será
    // executada, recebendo o tipo e o próprio botão.
    button.addEventListener('click', () => {
      chooseBlood(type, button);
    });

    // Insere o botão criado dentro da área de escolhas.
    choices.append(button);
  });
}


// ==================================================
// 6. CARREGAMENTO DO PACIENTE ATUAL
// ==================================================

function loadPatient() {

  // Busca no array o paciente correspondente ao índice atual.
  const patient = patients[patientIndex];

  // Atualiza o nome exibido na página.
  patientName.textContent = patient.name;

  // Atualiza o tipo sanguíneo do paciente.
  patientBlood.textContent = patient.type;

  // Exibe um ponto de interrogação na bolsa,
  // indicando que nenhuma bolsa foi escolhida ainda.
  sceneBagType.textContent = '?';

  // Remove a classe que representa a cena feliz.
  // Isso prepara a cena para o próximo paciente.
  scene.classList.remove('is-happy');

  // Exibe uma mensagem inicial para orientar o jogador.
  feedback.textContent = 'Selecione uma bolsa para iniciar.';

  // Restaura a classe CSS padrão das mensagens.
  feedback.className = 'game-feedback';

  // Libera as escolhas para o paciente atual.
  locked = false;

  // Esconde o botão de avançar até que a resposta
  // correta seja selecionada.
  nextButton.hidden = true;

  // Cria novamente os botões de tipos sanguíneos.
  renderChoices();
}


// ==================================================
// 7. VERIFICAÇÃO DA BOLSA ESCOLHIDA
// ==================================================

function chooseBlood(type, button) {

  // Se o paciente atual já foi atendido corretamente,
  // interrompe a função para evitar novas respostas.
  if (locked) return;

  // Obtém os dados do paciente que está sendo atendido.
  const patient = patients[patientIndex];

  // Atualiza a representação visual da bolsa
  // com o tipo sanguíneo escolhido pelo jogador.
  sceneBagType.textContent = type;


  // ------------------------------------------------
  // 7.1. VERIFICAÇÃO DE COMPATIBILIDADE
  // ------------------------------------------------

  // Verifica se o tipo escolhido está dentro da lista
  // de doadores compatíveis com o sangue do paciente.
  if (compatibleDonors[patient.type].includes(type)) {

    // Bloqueia novas escolhas após o acerto.
    locked = true;

    // Aumenta a pontuação em um ponto.
    score++;

    // Adiciona a classe CSS que destaca a resposta correta.
    button.classList.add('correct');

    // Percorre todos os botões de escolha.
    // Depois do acerto, desativa todos eles.
    [...choices.children].forEach((item) => {
      item.disabled = true;
    });

    // Adiciona uma classe CSS que representa
    // a reação positiva da cena do hospital.
    scene.classList.add('is-happy');

    // Atualiza a pontuação exibida na tela.
    // O elemento <i> pode ser estilizado pelo CSS.
    scoreEl.innerHTML = `${score} <i>/ ${patients.length}</i>`;

    // Atualiza a largura da barra de progresso.
    // A porcentagem é calculada pela pontuação dividida
    // pela quantidade total de pacientes.
    progressFill.style.width =
      `${score / patients.length * 100}%`;

    // Exibe uma mensagem de acerto com o tipo sanguíneo
    // e o nome do paciente.
    feedback.textContent =
      `Isso! A bolsa ${type} é compatível com ${patient.name}. O paciente está recebendo a transfusão.`;

    // Aplica a classe CSS correspondente ao acerto.
    feedback.className = 'game-feedback good';


    // ------------------------------------------------
    // 7.2. AVANÇO OU FINALIZAÇÃO DO JOGO
    // ------------------------------------------------

    // Verifica se ainda existem pacientes para atender.
    if (patientIndex < patients.length - 1) {

      // Define o texto do botão para avançar.
      nextButton.textContent = 'Próximo paciente →';

      // Torna o botão visível para o jogador.
      nextButton.hidden = false;

    } else {

      // Se não houver mais pacientes,
      // mantém o botão de avançar escondido.
      nextButton.hidden = true;

      // Executa a função responsável por finalizar o jogo.
      finishGame();
    }


  // ------------------------------------------------
  // 7.3. RESPOSTA INCORRETA
  // ------------------------------------------------

  } else {

    // Adiciona a classe CSS que destaca temporariamente
    // o botão escolhido de maneira incorreta.
    button.classList.add('wrong');

    // Exibe uma mensagem informando que a bolsa
    // não é compatível com o paciente.
    feedback.textContent =
      `Essa bolsa não é compatível com ${patient.name}. Tente outra opção.`;

    // Aplica a classe CSS correspondente ao erro.
    feedback.className = 'game-feedback bad';

    // Aguarda 700 milissegundos e depois remove
    // a classe de erro do botão.
    //
    // setTimeout executa uma função após determinado tempo.
    window.setTimeout(() => {
      button.classList.remove('wrong');
    }, 700);
  }
}


// ==================================================
// 8. FINALIZAÇÃO DO JOGO
// ==================================================

function finishGame() {

  // Substitui o nome do paciente por uma mensagem
  // indicando que todos os atendimentos terminaram.
  patientName.textContent = 'Missão concluída!';

  // Substitui o tipo sanguíneo por um coração.
  // O símbolo ♥ é um caractere de texto.
  patientBlood.textContent = '♥';

  // Exibe uma mensagem de conclusão da missão.
  feedback.textContent =
    'Você ajudou os quatro pacientes. Que bom ter você na equipe!';

  // Aplica a aparência de mensagem positiva.
  feedback.className = 'game-feedback good';

  // Adiciona uma classe ao painel da missão.
  // O CSS pode utilizar essa classe para mudar sua aparência.
  missionPanel.classList.add('complete');

  // Mostra o botão que permite reiniciar o jogo.
  resetButton.hidden = false;
}


// ==================================================
// 9. EVENTO DO BOTÃO PRÓXIMO PACIENTE
// ==================================================

// Adiciona um evento de clique ao botão de avançar.
nextButton.addEventListener('click', () => {

  // Aumenta o índice para selecionar o próximo paciente.
  patientIndex++;

  // Atualiza a página com os dados do novo paciente.
  loadPatient();
});


// ==================================================
// 10. EVENTO DO BOTÃO REINICIAR
// ==================================================

// Adiciona um evento de clique ao botão de reiniciar.
resetButton.addEventListener('click', () => {

  // Retorna ao primeiro paciente.
  patientIndex = 0;

  // Zera a pontuação do jogador.
  score = 0;

  // Atualiza a pontuação exibida para zero de quatro.
  scoreEl.innerHTML = '0 <i>/ 4</i>';

  // Zera a barra de progresso.
  progressFill.style.width = '0%';

  // Remove a classe que indica a conclusão da missão.
  missionPanel.classList.remove('complete');

  // Esconde novamente o botão de reiniciar.
  resetButton.hidden = true;

  // Carrega o primeiro paciente e restaura
  // o estado inicial do jogo.
  loadPatient();
});


// ==================================================
// 11. INICIALIZAÇÃO DO JOGO
// ==================================================

// Executa a função pela primeira vez.
// Assim que o JavaScript chega a esta linha,
// o primeiro paciente é carregado na página.
loadPatient();
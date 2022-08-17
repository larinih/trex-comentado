var trex_running; //variável que armazena as imagens para a animação
var trex; //variável que armazena o sprite do trex
var ground; //variável que armazena o sprite do solo
var groundImg; //variável que armazena a imagem do solo
var invisibleGround; //variável para armazenar o solo invisivel 
var nuvem; //variavel  para armazenar o sprite da nuvem
var cloudImg; //variavel para armazenar a imagem da nuvem
var cacto; //variável criada para armazenar o sprite de cacto
var cacto1, cacto2, cacto3, cacto3, cacto4, cacto5, cacto6; //variável criada para carregar as imagens de cactos
var score = 0; //variável que armazena o valor inicial da pontuação 
var PLAY = 1; //variável do estado de jogo JOGAR
var END = 0; //variável do estado de jogo FIM
var gameState = PLAY; //variável que armazena os estados de jogo
function preload(){
 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png") //carregas as imagens
 groundImg = loadImage("ground2.png") //carrega a imagem do solo
 cloudImg = loadImage("cloud.png") //carrega a imagem da nuvem
 cacto1 = loadImage("obstacle1.png") //carrega a a imagem do cacto 1
 cacto2 = loadImage("obstacle2.png") //carrega a a imagem do cacto 2
 cacto3 = loadImage("obstacle3.png") //carrega a a imagem do cacto 3
 cacto4 = loadImage("obstacle4.png")//carrega a a imagem do cacto 4
 cacto5 = loadImage("obstacle5.png")//carrega a a imagem do cacto 5
 cacto6 = loadImage("obstacle6.png")//carrega a a imagem do cacto 6
}

function setup() {
  createCanvas(600, 200); // tamanho da tela
 
  trex = createSprite(50, 100, 20, 50);  //criar um sprite de trex
  trex.addAnimation("running", trex_running); //adiciona a animação
  trex.scale = 0.5; // muda a escala 
  ground = createSprite(200, 180, 400, 20); //cria o solo
  
  ground.addImage(groundImg) //adicona a imagem do solo
 invisibleGround = createSprite(200, 200, 400, 20) //criando o solo invisível 
 invisibleGround.visible = false //fazendo com que o solo fique invisível

}

function draw() {
  background(128); //plano de fundo
  fill("black")
  text("Pontuação: "+score, 500, 50);
  

  if(gameState == PLAY){ //verifica se o estado do jogo é igual a PLAY se for igual a play adicionamos as instruções que só acontecem quando o estado é jogar
    ground.velocityX = -2; //velocidade para o solo
    score = score + Math.round(frameCount/60); // ATUALIZA A PONTUAÇÃO 

    if(ground.x < 0) { //condição para redefinir o solo
      ground.x = 300; //solo volta para o meio
    }

    if(keyDown("space") && trex.y >= 100){ // condição para o trex pular //adicionar a condição para ele pular até 100
      trex.velocityY = -10; //ao pressionar espaço o trex ganha velocidade para cima (pula)
    }

    trex.velocityY = trex.velocityY + 0.8; //adiciona gravidade 

    gerarNuvens(); //chamar a função para gerar as nuvens

    geraObstaculos(); //chamar a função para gerar obstáculos


  
  }
  else if(gameState == END){//verifica se o estado do jogo é FIM se for adicionamos a instruções que só ocorrem quando o estado do jogo for fim
    ground.velocityX = 0; //velocidade para o solo quando 
  }


 
  

 trex.collide(invisibleGround); //impede que o trex caia //colidir no solo invisivel

 
  drawSprites(); //desenha todos os sprites na tela
}


function gerarNuvens(){ // função para gerar nuvens
 
  if(frameCount % 60 == 0){ //gerar nuvens a cada 60 quadros 
    nuvem = createSprite(600, 100, 40, 10); //sprite para gerar nuvens
    nuvem.velocityX = -3; //velocidade da nuvem
    nuvem.addImage(cloudImg); //adicionando a imagem
    nuvem.scale = 0.4; //escala
    nuvem.y = Math.round(random(10,60)) //nuvens em posição aleatória

    //ajustar a profundidade 
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //atribuir tempo de vida
    nuvem.lifetime = 200;
  }
}

function geraObstaculos(){
  if(frameCount % 60 == 0){//cria um obstáculo a cada 60 quadros
    cacto = createSprite(600, 165, 10, 40); //cria um sprite de obstáculo
    cacto.velocityX = -6 //dá velocidade para o cacto
    var sorteio = Math.round(random(1,6)) //cria uma variável que armazena um número sorteado entre 1 a 6
    switch(sorteio){ //bloco do switch que verifica o número que foi sorteado e cria 6 casos para cada número possível a ser sorteado
      case 1: cacto.addImage(cacto1) // caso o número sorteado for 1 , adiciona a imagem do cacto 1
      break
      case 2: cacto.addImage(cacto2) // caso o número sorteado for 2 , adiciona a imagem do cacto 2
      break
      case 3: cacto.addImage(cacto3) // caso o número sorteado for 3 , adiciona a imagem do cacto 3
      break
      case 4: cacto.addImage(cacto4) // caso o número sorteado for 4 , adiciona a imagem do cacto 4
      break
      case 5: cacto.addImage(cacto5) // caso o número sorteado for 5 , adiciona a imagem do cacto 5
      break
      case 6: cacto.addImage(cacto6)// caso o número sorteado for 6 , adiciona a imagem do cacto 6
      break
      default: break
    }
    cacto.scale = 0.5; //escala da imagem
    cacto.lifetime = 300 //tempo de vida
  }
}
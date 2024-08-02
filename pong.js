// coisas da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

// velocidade bolinha
let velocidadeXBolinha = 4
let velocidadeYBolinha = 4

//variaveis raquete oponente
let xRaqueteOponente = 583
let yRaqueteOponente = 150
let comprimentoRaqueteOponente = 10
let alturaRaqueteOponente = 90
let velocidadeYOponente;

// variaveis raquete
let xRaquete = 5
let yRaquete = 150
let comprimentoRaquete = 10
let alturaRaquete = 90

let colidiu = false;

// placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo
let raquetada;
let ponto;

function preload(){
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3") 
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0,100,0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBorda();  
  raqueteEu();
  movimentoPlayerRaquete();
  colisaoRaquetePlayer();
  colisaoMinhaRaqueteBiblioteca();
  raqueteOponente();
  movimentoRaqueteOponente();
  colisaoRaqueteOponenteBiblioteca();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
function colisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0){ velocidadeYBolinha *= -1;
  } 
}
function raqueteEu(){
   rect(xRaquete, yRaquete, comprimentoRaquete, alturaRaquete);
}
function movimentoPlayerRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}
function colisaoRaquetePlayer(){
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete)
  {
       velocidadeXBolinha *= -1;
    raquetada.play();
   }
}
function colisaoMinhaRaqueteBiblioteca(){
  colidiu =
  collideRectCircle(xRaquete, yRaquete, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function raqueteOponente(){
   rect(xRaqueteOponente, yRaqueteOponente, comprimentoRaqueteOponente, alturaRaqueteOponente);
}
function movimentoRaqueteOponente(){
 velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaqueteOponente / 2 -30;
  yRaqueteOponente += velocidadeYOponente
}
function colisaoRaqueteOponenteBiblioteca(){
  colidiu =
  collideRectCircle(xRaqueteOponente, yRaqueteOponente, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function incluiPlacar(){
  stroke(255)
  textAlign(CENTER)
  textSize(16)
  fill(color(207, 134, 0))
  rect(150, 10, 40, 20)
  fill(255)
  text(meusPontos, 170, 26);
   fill(color(207, 134, 0))
  rect(450, 10, 40, 20)
  fill(255)
  text(pontosOponente, 470, 26)
}
function marcaPonto(){
  if(xBolinha > 595){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 5){
    pontosOponente += 1;
    ponto.play();
  }
}
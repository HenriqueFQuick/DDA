//Pontos inicial e final
//[X1,Y1,X2,Y2]
[X_INICIAL, Y_INICIAL, X_FINAL,Y_FINAL] = [-150,-280,130,130]

var Scale = 0
var slider

function setup() {
  createCanvas(windowWidth, windowHeight-20);
  //Caso seja necessaria uma escala maior, modificar o primeiro ( valor minimo ) e o segundo    parametro ( valor maximo ) - Usar apenas valores >= 1
  slider = createSlider(1, 50, 40, -2);
}

function draw() {

  background(0xfff);
  translate(width/2, height/2);
  Scale = slider.value()
  //Caso nao queira visualizar o plano cartesiano, basta comentar a chamada do metodo abaixo
  drawCartesianPlane();
  //Caso queira ver apenas o funcionamento do algoritmo, use a funcao DDA. Com ela, podera usar a escala com o slice, porem nao tera prints
  //Caso queira ver os prints dos pontos, use a funcao DDA2. Com ela, a escala nao podera ser modificada, a explicacao do algoritmo e prints tambem se encontra essa funcao
  DDA(X_INICIAL,X_FINAL,-Y_INICIAL/2,-Y_FINAL);
}

function drawCartesianPlane(){
  stroke('black')
  x=0 
  y=0
  i=0
  
  //adicionar eixos x e y
    strokeWeight(8);
    line(0,-windowHeight,0, windowHeight)
    line(-windowWidth,0,windowWidth,0)
  
  //adicionar linhas do plano
    strokeWeight(1);
    for(i = 0; i < windowWidth; i+=Scale){
      if(Scale > 16){
        text(i/Scale,i,-6)
        text(-i/Scale,-i,-6)
        if(i!=0){
          text(i/Scale,6,-i)
          text(-i/Scale,6,i)
        }
      }
      line(i,-windowHeight, i, windowHeight)
      line(-i,-windowHeight, -i, windowHeight)
      line(-windowWidth,i,windowWidth,i)
      line(-windowWidth,-i,windowWidth,-i)
    }
}

function DDA(x1, x2, y1, y2){
  stroke('red');
  strokeWeight(8)
  
  dx = x2 - x1;
  dy = y2 - y1;

  if(Math.abs(dx) > Math.abs(dy))
    passos = Math.abs(dx)
  else
      passos = Math.abs(dy)
  x_incr = dx / passos
  y_incr = dy / passos

  x = x1
  y = y1
  point(round(x)*Scale, round(y)*Scale)
  for(var i = 1; i <= passos; i++){
    x = x + x_incr 
    y = y + y_incr
    point(round(x)*Scale, round(y)*Scale)
  }
}

function DDA2(x1, x2, y1, y2){
  stroke('red');
  strokeWeight(8)
  
  //variacao x e variacao y
    dx = x2 - x1;
    dy = y2 - y1;
  
  //caso 1: 
  //  |dx| (variacao do x) > |dy| (variacao do y), ou seja, coeficiente angular maior que 1
  //  1 ponto por coluna
  //  x_incr = variavel
  //  y_incr = 1
  //caso 2: 
  //  |dx| (variacao do x) > |dy| (variacao do y), ou seja, coeficiente angular entre 0 e 1
  //  1 ponto por linha
  //  x_incr = 1
  //  y_incr = variavel
    if(Math.abs(dx) > Math.abs(dy))
      passos = Math.abs(dx)
    else
      passos = Math.abs(dy)
    x_incr = dx / passos
    y_incr = dy / passos

  
  //ponto inicial
    x = x1
    y = y1
    point(round(x)*Scale, round(y)*Scale)
    print('X0: '+x+',  Y0: '+(-y))
    print('X0 round: '+round(x)+',  Y0 round: '+round(-y))
  //for para os pontos intermediarios e final
    for(var i = 1; i <= passos; i++){
      x = x + x_incr 
      y = y + y_incr
      point(round(x)*Scale, round(y)*Scale)
      print('X'+i+':  '+x+',  Y'+i+':  '+(-y))
      print('X'+i+' round:  '+round(x)+',  Y'+i+' round:  '+round(-y))
    }
  noLoop()
}
var chessBoard=[];
for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;
	}
}

//赢法数组
var win=[];
var count=0;//赢法种类
var over=false;//游戏未结束

//赢法的统计数组
var myWin=[];//我方
var computerWin=[];//对方

//初始化赢法数组
for(var i=0;i<15;i++){
	win[i]=[];
	for(var j=0;j<15;j++){
		win[i][j]=[];
	}
}

//横列
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		//win[0][0][0]=true
		//win[0][1][0]=true
		//win[0][2][0]=true
		//win[0][3][0]=true
		//win[0][4][0]=true  count表示种类，前面2个数字表示棋盘上的5个棋子已经连成一条线。

		//win[0][1][1]=true
		//win[0][2][1]=true
		//win[0][3][1]=true
		//win[0][4][1]=true
		//win[0][5][1]=true
		for(var k=0;k<5;k++){
			win[i][j+k][count]=true;
		}
		count++;
	}
}


//纵列
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			win[j+k][i][count]=true;
		}
		count++;
	}
}

//斜线
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			win[j+k][i+k][count]=true;
		}
		count++;
	}
}


//反斜线
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			win[i+k][j-k][count]=true;
		}
		count++;
	}
}

for(var i=0;i<count;i++){
	myWin[i]=0;
	computerWin[i]=0;
}

//console.log(count);

var me=true;//黑棋或白棋的判断
var chess=document.getElementById("chess");
var context=chess.getContext("2d");

context.strokeStyle="#BFBFBF";

var logo=new Image();
logo.src="images/logo.jpg";
logo.onload=function(){
	context.drawImage(logo,0,0,450,450);
	drawChessBoard();
}

function drawChessBoard(){
for(var i=0;i<15;i++){
	context.moveTo(15+i*30,15);
    context.lineTo(15+i*30,435);
    context.stroke();
    context.moveTo(15,15+i*30);
    context.lineTo(435,15+i*30);
    context.stroke();
  }
}

var oneStep=function(i,j,me){//i和j 表示棋子的索引，me表示白棋还是黑棋
    context.beginPath();//画棋子
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	//渐变
	var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	if(me){
		gradient.addColorStop(0,"#0A0A0A");
	    gradient.addColorStop(1,"#636766");
	}else{
		gradient.addColorStop(0,"#D1D1D1");
	    gradient.addColorStop(1,"#F9F9F9");
	}
	
	context.fillStyle=gradient;
	context.fill();//填充
}


chess.onclick=function(e){
	if(over){
		return;
	}

	if(!me){//这个函数实现我方下棋，如若不是我方，直接退出。
		return;
	}
		var x=e.offsetX;//相对于触发事件对象的鼠标坐标
		var y=e.offsetY;
		var i=Math.floor(x/30);
		var j=Math.floor(y/30);
		if(chessBoard[i][j]==0){
			oneStep(i,j,me);
			chessBoard[i][j]==1;
			
			for(var k=0;k<count;k++){
				if(win[i][j][k]){
					myWin[k]++;
					computerWin[k]=6;
					if(myWin[k]==5){//如果存在一个K使得myWin【K】=5，那么说明第K种赢法被实现。
						window.alert("你赢了");
						over=true;
					}
				}
			}
			if(!over){
				me=!me;//将下棋的权利交给计算机
				computerAI();//实现计算机的棋路
			}
		}
}

var computerAI=function(){
	//记录分数
	var myScore=[],
	    computerScore=[],
	    max=0,//保存最高的分数
	    u=0,v=0;//保存最高分的点的坐标
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			myScore[i][j]=0
			computerScore[i][j]=0;
		}
	}
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(chessBoard[i][j]==0){
				for(var k=0;k<count;k++){
					if(win[i][j][k]){
						switch(myWin[k]){//黑棋要进行拦截
							case "1":myScore[i][j]+=200; break;
							case "2":myScore[i][j]+=400; break;
							case "3":myScore[i][j]+=2000; break;
							case "4":myScore[i][j]+=10000; break;
						}
/*
						if(myWin[k]==1){
							myScore[i][j]+=200;
						}else if(myWin[k]==2){
                            myScore[i][j]+=400;
						}else if(myWin[k]==3){
                            myScore[i][j]+=2000;
						}else if(myWin[k]==4){
                            myScore[i][j]+=10000;
						}

						if(computerWin[k]==1){
							computerScore[i][j]+=220;
						}else if(computerWin[k]==2){
                            computerScore[i][j]+=420;
						}else if(computerWin[k]==3){
                            computerScore[i][j]+=2100;
						}else if(computerWin[k]==4){
                            computerScore[i][j]+=20000;
						}*/

						switch(computerWin[k]){
							case "1":computerScore[i][j]+=220; break;
							case "2":computerScore[i][j]+=420; break;
							case "3":computerScore[i][j]+=2100; break;
							case "4":computerScore[i][j]+=20000; break;
						}
						/*if(computerWin[k]==1){
							computerScore[i][j]+=220;
						}else if(computerWin[k]==2){
							computerScore[i][j]+=420;
						}*/
					}
				}
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]==max){
					if(computerScore[i][j]>computerScore[u][v]){
						u=i;
						v=j;
					}
				}
				if(computerScore[i][j]>max){
					max=computerScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]==max){
					if(myScore[i][j]>myScore[u][v]){
						u=i;
						v=j;
					}
				}
			}
		}
	}
    oneStep(u,v,false);
    chessBoard[u][v]=2;
    //更新赢法的统计数组
    for(var k=0;k<count;k++){
				if(win[u][v][k]){
					computerWin[k]++;
					myWin[k]=6;
					if(computerWin[k]==5){//如果存在一个K使得myWin【K】=5，那么说明第K种赢法被实现。
						window.alert("计算机赢了");
						over=true;
					}
				}
			}
			if(!over){
				me=!me;//将下棋的权利交给我方
			}
}
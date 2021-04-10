function dis_ap(a,b,c,d,e,f,g,h,i){
    document.getElementById("begin").style.display = a==1?"unset":"none";
    document.getElementById("comp").style.display = b==1?"unset":"none";
    document.getElementById("early").style.display = c==1?"unset":"none";
    document.getElementById("late").style.display = d==1?"unset":"none";
    document.getElementById("random").style.display = e==1?"unset":"none";
    document.getElementById("again").style.display = f==1?"unset":"none";
    document.getElementById("defeat").style.display = g==1?"unset":"none";
    document.getElementById("back").style.display = h==1?"unset":"none";
    document.getElementById("back_m").style.display = i==1?"unset":"none";
}

var a = [[2,2,2],[2,2,2],[2,2,2]];
var m = [0,0,0,0,0,0,0,0,0];
var p1=0,p2=0,p1_win=0,turn=1,n=0,pc=0,rand_1,rand_2,mark=1,round=1;

function begin(){
    for(let i=0;i<3;i++)
        for(let j=0;j<3;j++)
            a[i][j]=0;
    dis_ap(0,0,0,0,0,1,1,0,1);
    document.getElementById("turn_t").style.display = "unset";
    document.getElementById("round_t").style.display = "unset";
    window.alert("第"+round+"局开始");
    document.getElementById("p1").style.left = "0";
    document.getElementById("p2").style.right = "0";
}

function vspc(order){
    switch(order){
        case 0:
            rand_1 = parseInt(Math.random()*2,10)==0?-1:1;
            vspc(rand_1);
            window.alert("你为："+(rand_1==-1?"1p先手":"2p后手"));
            break;
        case -1:
            begin();
            pc=1;
            document.getElementById("pc_2").innerHTML = "2p(后手电脑)";
            break;
        case 1:
            begin();
            rand_1 = parseInt(Math.random()*3,10);
            rand_2 = parseInt(Math.random()*3,10);
            change_turn(rand_1,rand_2);
            pc=-1;
            document.getElementById("pc_1").innerHTML = "1p(先手电脑)";
            break;
    }
}
function again(){
    clear(1);
    if(pc==-1){
        rand_1 = parseInt(Math.random()*3,10);
        rand_2 = parseInt(Math.random()*3,10);
        change_turn(rand_1,rand_2);
    }
}
function defeat(){
    if(turn%2==0){
        p1++;
        window.alert("p1 win")
    }
    else{
        p2++;
        window.alert("p2 win")
    }
    round++;
    again();
}
function back_m(){
    dis_ap(1,1);
    document.getElementById("p1").style.left = "-25%";
    document.getElementById("p2").style.right = "-25%";
    turn = 1;
    round = 1;
    p1 = 0;
    p2 = 0;
    document.getElementById("turn").innerHTML = turn;
    document.getElementById("round").innerHTML = round;
    document.getElementById("score_1").innerHTML = p1;
    document.getElementById("score_2").innerHTML = p2;
    document.getElementById("m_1").style.backgroundColor = "lightgray";
    document.getElementById("m_2").style.backgroundColor = "lightgray";
    document.getElementById("m_3").style.backgroundColor = "lightgray";
    document.getElementById("m_4").style.backgroundColor = "lightgray";
    document.getElementById("m_5").style.backgroundColor = "lightgray";
    document.getElementById("m_6").style.backgroundColor = "lightgray";
    document.getElementById("m_7").style.backgroundColor = "lightgray";
    document.getElementById("m_8").style.backgroundColor = "lightgray";
    document.getElementById("m_9").style.backgroundColor = "lightgray";
    for(let i=0;i<3;i++)
        for(let j=0;j<3;j++)
            a[i][j]=0;
    document.getElementById("pc_1").innerHTML = "1p(先手)";
    document.getElementById("pc_2").innerHTML = "2p(后手)";
}
function pc_opera() { 
    if(pc==0){}
    else{
        var flag=0;
        for(let i=0;i<3;i++){//自动填充
            for(let j=i;j<3;j++){
                if(a[i][j]==pc&&a[i][j==2?0:j+1]==pc&&a[i][j==1?0:j==2?1:2]==0){
                    change_turn(i,j==1?0:j==2?1:2);
                    flag = 1;
                    break;
                }
                else if(a[j][i]==pc&&a[j==2?0:j+1][i]==pc&&a[j==1?0:j==2?1:2][i]==0){
                    change_turn(j==1?0:j==2?1:2,i);
                    flag = 1;
                    break;
                } 
            }
            
            if(flag==1)
                break;
            if((a[1][1]==pc&&a[0][1]==pc&&a[2][1]==0)){
                change_turn(2,1);
                flag = 1;
                break;
            }
            else if((a[1][1]==pc&&a[1][0]==pc&&a[1][2]==0)){
                change_turn(1,2);
                flag = 1;
                break;
            }
            else if(a[i][i]==pc&&a[i==2?0:i+1][i==2?0:i+1]==pc&&a[i==1?0:i==2?1:2][i==1?0:i==2?1:2]==0){
                change_turn(i==1?0:i==2?1:2,i==1?0:i==2?1:2);
                flag = 1;
                break;
            }
            else if(a[i][2-i]==pc&&a[i==2?0:i+1][i==2?2:1-i]==pc&&a[i==1?2:i==2?1:0][2-(i==1?2:i==2?1:0)]==0){
                change_turn(i==1?2:i==2?1:0,2-(i==1?2:i==2?1:0));
                flag = 1;
                break;
            }
        }
        if(flag==0){
            for(let i=0;i<3;i++){//自动截堵
                for(let j=i;j<3;j++){
                    if(a[i][j]==-1*pc&&a[i][j==2?0:j+1]==-1*pc&&a[i][j==1?0:j==2?1:2]==0){
                        change_turn(i,j==1?0:j==2?1:2);
                        flag = 1;
                        break;
                    }
                    else if(a[j][i]==-1*pc&&a[j==2?0:j+1][i]==-1*pc&&a[j==1?0:j==2?1:2][i]==0){
                        change_turn(j==1?0:j==2?1:2,i);
                        flag = 1;
                        break;
                    } 
                }
                if(flag==1)
                    break;
                if((a[1][1]==-1*pc&&a[0][1]==-1*pc&&a[2][1]==0)){
                    change_turn(2,1);
                    flag = 1;
                    break;
                }
                else if((a[1][1]==-1*pc&&a[1][0]==-1*pc&&a[1][2]==0)){
                    change_turn(1,2);
                    flag = 1;
                    break;
                }
                else if(a[i][i]==-1*pc&&a[i==2?0:i+1][i==2?0:i+1]==-1*pc&&a[i==1?0:i==2?1:2][i==1?0:i==2?1:2]==0){
                    change_turn(i==1?0:i==2?1:2,i==1?0:i==2?1:2);
                    flag = 1;
                    break;
                }
                else if(a[i][2-i]==-1*pc&&a[i==2?0:i+1][i==2?2:1-i]==-1*pc&&a[i==1?2:i==2?1:0][2-(i==1?2:i==2?1:0)]==0){
                    change_turn(i==1?2:i==2?1:0,2-(i==1?2:i==2?1:0));
                    flag = 1;
                    break;
                }
            }
        }
        if(flag==0){//随机填充
            do{
            rand_1 = parseInt(Math.random()*3,10);
            rand_2 = parseInt(Math.random()*3,10);
            }
            while(a[rand_1][rand_2]!=0)
            change_turn(rand_1,rand_2);
        }
    }
}

function change_turn(cha_1,cha_2) { //p是回合数，用turn带即可
    if(cha_1==0&&cha_2==0)
        document.getElementById("m_1").style.backgroundColor = turn%2!=0?"white":"black";
    else if(cha_1==0&&cha_2==1)
        document.getElementById("m_2").style.backgroundColor = turn%2!=0?"white":"black";
    else if(cha_1==0&&cha_2==2)
        document.getElementById("m_3").style.backgroundColor = turn%2!=0?"white":"black";
    else if(cha_1==1&&cha_2==0)
        document.getElementById("m_4").style.backgroundColor = turn%2!=0?"white":"black";
    else if(cha_1==1&&cha_2==1)
        document.getElementById("m_5").style.backgroundColor = turn%2!=0?"white":"black";
    else if(cha_1==1&&cha_2==2)
        document.getElementById("m_6").style.backgroundColor = turn%2!=0?"white":"black";
    else if(cha_1==2&&cha_2==0)
        document.getElementById("m_7").style.backgroundColor = turn%2!=0?"white":"black";
    else if(cha_1==2&&cha_2==1)
        document.getElementById("m_8").style.backgroundColor = turn%2!=0?"white":"black";
    else
        document.getElementById("m_9").style.backgroundColor = turn%2!=0?"white":"black";
    a[cha_1][cha_2] = (turn%2!=0?-1:1);
    turn++;
    result();
 }

function result(){
    arrow();
    document.getElementById("turn").innerHTML = turn;
    for (let i=0;i<3;i++){
        if ((a[i][0]==-1&&a[i][1]==-1&&a[i][2]==-1)||(a[0][i]==-1&&a[1][i]==-1&&a[2][i]==-1)||(a[0][0]==-1&&a[1][1]==-1&&a[2][2]==-1)||(a[0][2]==-1&&a[1][1]==-1&&a[2][0]==-1)) {
            p1_win = -1;
            break;
        }
        else if ((a[i][0]==1&&a[i][1]==1&&a[i][2]==1)||(a[0][i]==1&&a[1][i]==1&&a[2][i]==1)||(a[0][0]==1&&a[1][1]==1&&a[2][2]==1)||(a[0][2]==1&&a[1][1]==1&&a[2][0]==1)) {
            p1_win = 1;
            break;
        }
    }
    if(p1_win==-1){
        p1++;
        setTimeout( function(){
            window.alert("p1 win");
            clear();
        }, 1 * 500 );
    }
    else if(p1_win==1){
        p2++;
        setTimeout( function(){
            window.alert("p2 win");
            clear();
        }, 1 * 500 );
    }
    else{
        for(let i=0;i<3;i++)
            for(let j=0;j<3;j++)
                if(a[i][j]!=0)
                    n++;
        if(n==9){
            setTimeout( function(){
            window.alert("It's a draw");
            clear();
            },1 * 500 );
        }
        n=0;
    }
    setTimeout( function(){
        if(pc==0||turn%2==(pc==1?0:1))
            pc_opera();
    }, 1 * 600 );
}
function arrow(a){
    document.getElementById("arrow_1").style.opacity = a==-1?"1":turn%2;
    document.getElementById("arrow_2").style.opacity = a==-1?"1":turn%2;
    document.getElementById("arrow_3").style.opacity = a==-1?"0":turn%2==0?"1":"0";
    document.getElementById("arrow_4").style.opacity = a==-1?"0":turn%2==0?"1":"0";
}

function clear(b){
    arrow(-1);
    round+=b==1?0:1;
    p1_win = 0;
    turn = 1;
    document.getElementById("turn").innerHTML = turn;
    document.getElementById("round").innerHTML = round;
    document.getElementById("score_1").innerHTML = p1;
    document.getElementById("score_2").innerHTML = p2;
    document.getElementById("m_1").style.backgroundColor = "lightgray";
    document.getElementById("m_2").style.backgroundColor = "lightgray";
    document.getElementById("m_3").style.backgroundColor = "lightgray";
    document.getElementById("m_4").style.backgroundColor = "lightgray";
    document.getElementById("m_5").style.backgroundColor = "lightgray";
    document.getElementById("m_6").style.backgroundColor = "lightgray";
    document.getElementById("m_7").style.backgroundColor = "lightgray";
    document.getElementById("m_8").style.backgroundColor = "lightgray";
    document.getElementById("m_9").style.backgroundColor = "lightgray";
    window.alert("第"+round+"局开始");
    for(let i=0;i<3;i++)
        for(let j=0;j<3;j++)
            a[i][j]=0;
}
function error(){}
function m_(i,j){
    a[i][j]==0?change_turn(i,j):error();
}
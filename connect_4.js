let player=
{
name : null,
id: null,
color: null,
class: null
};
function checkifWon(arr)
{
    let sum=0;
    let val=0;
    let counter=0;
    for (let i=0;i<arr.length;i++)
    {
    if(arr[i]!=val)
    {
    sum=0;
    counter=0;
    if (arr.slice(i).length < 4 )
    {
    break;
    }
    }
    counter++;
    sum=sum+arr[i];
    val=arr[i]+1;
    if (counter >= 4)
    {
    console.log("Winner");
    break;
    }
    else
    {
    continue;
    }    
}
}
function checkHorizontal(index,player)
{
let marked_row=$('td:nth-child('+index+')').children("[class="+player.class+"]").eq(0).parent().parent().index();
let m=marked_row+1;
let marked_values=$('tr:nth-child('+m+')').children().children("[class="+player.class+"]").parent()
if (marked_values.length >=4 )
{
let arr=[]
let sum=0;
for (let i=0;i<marked_values.length;i++)
{
arr.push(marked_values.eq(i).index());
}
checkifWon(arr);
}
}
function checkVertical(index,player)
{
markedcells=$('td:nth-child('+index+')').children("[class="+player.class+"]").length;
if(markedcells >= 4)
{
let arr=[]
let marked_values=$('td:nth-child('+index+')').children("[class="+player.class+"]").parent().parent();
for (let i=0;i<marked_values.length;i++)
    {
        arr.push(marked_values.eq(i).index());
    }
checkifWon(arr);
}
}


let token=$(".connect4 td");
player.id="P1"
player.color='red';
player.class='marked_player1';
token.on('mouseenter',function(event)
{
    let index=$(this).index()+1;
    $('td:nth-child('+index+')').toggleClass('highlight-column')
})
token.on('mouseleave',function(event)
{
    let index=$(this).index()+1;
    $('td:nth-child('+index+')').toggleClass('highlight-column')
})
token.on('click',function(event)
{
    let index=$(this).index()+1;
    //console.log($(this).parent().index());
	
    if (player.id=='P1')
    {
        $('td:nth-child('+index+')').children(":not([class]):last").addClass(player.class);
	    checkVertical(index,player);
        checkHorizontal(index,player);
        //checkDiagonal(index,player)
        $("td").children(":not([class])").css('border-color','green');
        player.id='P2';
        player.color='green';
	    player.class='marked_player2';
    }
    else
    {
        $('td:nth-child('+index+')').children(":not([class]):last").addClass(player.class);
	    checkVertical(index,player);
	    checkHorizontal(index,player);
        $("td").children(":not([class])").css('border-color','red');
        player.id='P1'; 
        player.color='red';
        player.class='marked_player1';   
    } 
})
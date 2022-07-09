let player=
{
name : null,
id: null,
color: null,
class: null
};

function checkifWon(arr)
{
arr.sort();
let newarr=[]
let val=0;
let counter=0;
for (let i=0;i<arr.length;i++)
{
if(arr[i]!=val)
{
newarr=[];
counter=0;
if (arr.slice(i).length < 4 )
{
break;
}
}
counter++;
val=arr[i]+1;
newarr.push(arr[i]);
if (counter >= 4 )
{
return newarr
} 
}
}
function Congratulate(elements_connected)
{

if(player.name)
{$(".Winner_announcement").text("The Winner is "+player.name).css("color",player.color);}
else{$(".Winner_announcement").text("The Winner is "+player.color).css("color",player.color);}
elements_connected.forEach(ele=>ele.children().addClass('blinker'))
}
function checkFirstDiagonal(index,marked_row)
{
    let arr=[];
    let matchObject={};
    let filteredObj=[];
    let diff= index>marked_row+1? marked_row:index-1;
    let starting_row=marked_row-diff;
    let starting_col=index-diff;
    let number_of_cells=index-starting_col+(7-index<6-marked_row?7-index:6-marked_row);
    for (let i=0;i<number_of_cells;i++)
    {
        if ($('td:nth-child('+starting_col+')').eq(starting_row).children("[class="+player.class+"]").length)
        {
        index=$('td:nth-child('+starting_col+')').eq(starting_row).children("[class="+player.class+"]").parent().index()
        matchObject[index]=$('td:nth-child('+starting_col+')').eq(starting_row).children("[class="+player.class+"]").parent();
        arr.push(index);
        }
        starting_col+=1;
        starting_row+=1;
    }
newarr=checkifWon(arr);
if (newarr)
    {
        newarr.forEach(ele=>filteredObj.push(matchObject[ele]))
        return filteredObj;
    }
}
function checkSecondDiagonal(index,marked_row)
{
    let arr=[];
    let matchObject={};
    let filteredObj=[];
    let index_inverse=7-index;
    let diff= marked_row+1>index_inverse?index_inverse:marked_row;
    let ending_row=marked_row-diff;
    let ending_col=index+diff;
    let number_of_cells=ending_col-index+(index>6-marked_row?6-marked_row:index);
    for (let i=0;i<number_of_cells;i++)
    {
        if ($('td:nth-child('+ending_col+')').eq(ending_row).children("[class="+player.class+"]").length)
        {
        index=$('td:nth-child('+ending_col+')').eq(ending_row).children("[class="+player.class+"]").parent().index();
        matchObject[index]=$('td:nth-child('+ending_col+')').eq(ending_row).children("[class="+player.class+"]").parent();
        arr.push(index);
        }
        ending_col-=1;
        ending_row+=1;
    }
newarr=checkifWon(arr);
if (newarr)
    {
        newarr.forEach(ele=>filteredObj.push(matchObject[ele]))
        return filteredObj;
    }
}
function checkDiagonal(index,player)
{
let marked_row=$('td:nth-child('+index+')').children("[class="+player.class+"]").eq(0).parent().parent().index();
let match_arr1= checkFirstDiagonal(index,marked_row);
let match_arr2= checkSecondDiagonal(index,marked_row);
if (match_arr1)
{
    return match_arr1;
}
else if (match_arr2)
{
    return match_arr2;
}
}
function checkHorizontal(index,player)
{
let marked_row=$('td:nth-child('+index+')').children("[class="+player.class+"]").eq(0).parent().parent().index();
let matchObject={};
let filteredObj=[];
let newarr=[];
let m=marked_row+1;
let marked_values=$('tr:nth-child('+m+')').children().children("[class="+player.class+"]").parent();
if (marked_values.length >=4 )
{
let arr=[];
for (let i=0;i<marked_values.length;i++)
{
index=marked_values.eq(i).index();
matchObject[index]=marked_values.eq(i);
arr.push(index);
}
newarr=checkifWon(arr);
if (newarr)
{
    newarr.forEach(ele=>filteredObj.push(matchObject[ele]))
    return filteredObj;
}

}
}
function checkVertical(index,player)
{
let matchObject={};
let filteredObj=[];
markedcells=$('td:nth-child('+index+')').children("[class="+player.class+"]").length;
if(markedcells >= 4)
{
let arr=[]

let marked_values=$('td:nth-child('+index+')').children("[class="+player.class+"]").parent().parent();
let marked_td=$('td:nth-child('+index+')').children("[class="+player.class+"]").parent();
for (let i=0;i<marked_values.length;i++)
    {
        index=marked_values.eq(i).index();
        matchObject[index]=marked_td.eq(i)
        arr.push(index);
    }
newarr=checkifWon(arr);
if (newarr)
{
    newarr.forEach(ele=>filteredObj.push(matchObject[ele]))
    return filteredObj;
}
}
}


let token=$(".connect4 td");
player.id="P1"
player.color='red';
player.class='marked_player1';
let winner_flag=false;
let result;
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
    if (player.id=='P1')
    {
        $('td:nth-child('+index+')').children(":not([class^=marked]):last").addClass(player.class);
        result=checkVertical(index,player)
	    if (result)
        {
            Congratulate(result);
        }
        result=checkHorizontal(index,player);
        if(result)
        {
            Congratulate(result);
        }
        result=checkDiagonal(index,player);
        if(result)
        {
            Congratulate(result);
        }
        $("td").children(":not([class^=marked])").css('border-color','green');
        player.name=$("input").eq(1).val();
        player.id='P2';
        player.color='green';
	    player.class='marked_player2';
    }
    else
    {
        $('td:nth-child('+index+')').children(":not([class^=marked]):last").addClass(player.class);
        result=checkVertical(index,player)
	    if (result)
        {
            Congratulate(result);
        }
        result=checkHorizontal(index,player);
        if(result)
        {
            Congratulate(result);
        }
        result=checkDiagonal(index,player);
        if(result)
        {
            Congratulate(result);
        }
        $("td").children(":not([class^=marked])").css('border-color','red');
        player.id='P1'; 
        player.name=$("input").eq(0).val();
        player.color='red';
        player.class='marked_player1';   
    } 
})
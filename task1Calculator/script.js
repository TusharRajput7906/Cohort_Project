// let EmptyBtn=document.querySelector("#EmptyBtn");
// let percentageBtn=document.querySelector("#percentageBtn");
// let backspaceBtn=document.querySelector("#backspaceBtn");
// let divideBtn=document.querySelector("divideBtn");
// let sevenBtn=document.querySelector("#sevenBtn");
// let eightBtn=document.querySelector("#eightBtn");
// let nineBtn=document.querySelector("#nineBtn");
// let multiplyBtn=document.querySelector("#multiplyBtn");
// let fourBtn=document.querySelector("#fourBtn");
// let fiveBtn=document.querySelector("#fiveBtn");
// let sixBtn=document.querySelector("#sixBtn");
// let subtractBtn=document.querySelector("#subtractBtn");
// let oneBtn=document.querySelector("#oneBtn");
// let twoBtn=document.querySelector("#twoBtn");
// let threeBtn=document.querySelector("#threeBtn");
// let addBtn=document.querySelector("#addBtn");
// let dblZeroBtn=document.querySelector("#dblZeroBtn");
// let zeroBtn=document.querySelector("#zeroBtn");
// let dotBtn=document.querySelector("#dotBtn");
// let equalBtn=document.querySelector("#equalBtn");
// let answer=document.querySelector(".ans")
let input=document.querySelector("#display");
// let arr=[];

// function calculator(a,b,operator){
//     switch(operator){
//         case "+":
//             return a+b;

//         case "-":
//             return a-b;
        
//         case "*":
//             return a*b;

//         case "/":
//             return a/b;
//     }
// }

window.addEventListener("keydown",(e)=>{
    if(e.key==="1"){
        input.value+=e.key;
    }else if(e.key==="2"){
        input.value+=e.key;
    }else if(e.key==="3"){
        input.value+=e.key;
    }else if(e.key==="4"){
        input.value+=e.key;
    }else if(e.key==="5"){
        input.value+=e.key;
    }else if(e.key==="6"){
        input.value+=e.key;
    }else if(e.key==="7"){
        input.value+=e.key;
    }else if(e.key==="8"){
        input.value+=e.key;
    }else if(e.key==="9"){
        input.value+=e.key;
    }else if(e.key==="0"){
        appendValue(0);
    }else if(e.key==="/"){
        appendValue('/');
    }else if(e.key==="*"){
        appendValue('*');
    }else if(e.key==="-"){
        appendValue('-');
    }else if(e.key==="+"){
        appendValue('+');
    }else if(e.key==="."){
        appendValue('.');
    }else if(e.key==="%"){
        appendValue("%");
    }else if(e.key==="Backspace"){
        deleteLast();
    }else if(e.key==="Enter"){
        calculate();
    }
});

function appendValue(value){
    input.value+=value;
};

function clearDisplay(){
    input.value="";
};

function deleteLast(){
    input.value=input.value.slice(0,-1);
};
function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}
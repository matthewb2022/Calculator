function getHistory() {
    return document.getElementById("history-value").innerText;

}
function printHistory(num){
    document.getElementById("history-value").innerText = num;
}

function getOutput(){
    return document.getElementById("output-value").innerText;
}
function printOutput(num){
    var numString = num.toString();

    if (num == ""){
        document.getElementById("output-value").innerText = num;
        return;
    }
    if (numString.substring(numString.length - 1, numString.length).localeCompare('.') == 0){
        document.getElementById("output-value").innerText = num;
        return;
    }

    if (numString.localeCompare('-0') == 0){
        document.getElementById("output-value").innerText = num;
        return;
    }

    if (getFormattedNumber(num).localeCompare('0') == 0){
        document.getElementById("output-value").innerText = num;
        return;
    }

    if (numString.includes('0.')){
        document.getElementById("output-value").innerText = num;
        return;
    }
    else{
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}




window.onload = function(){
    renderFunctionality();  
};


function getFormattedNumber(num){
    if (num == "-"){
        return "";
    }

    var n = Number(num);
    if (num.toString().length > 8){
        n = n.toExponential();
        if (n.toString().length > 8){
            var final = n.toString().substring(0, 4) + n.toString().substring(n.toString().length - 4, n.toString().length);
            return final;

        }
    }
    var value = n.toLocaleString("en");
    return value;
}
function reverseNumberFormat(num){
    var numString = num.toString();

    return Number(num.replace(/,/g, ''));
}

function swapStyleSheet(element){
    var header = document.getElementsByTagName('head')[0];
    if (element.getAttribute("href").localeCompare("style.css") == 0){

        var styleSheet = document.createElement('link');
        styleSheet.rel = 'stylesheet';
        styleSheet.type = 'text/css';
        styleSheet.href = 'style2.css';
        styleSheet.id = 'style';

        header.removeChild(element);
        header.appendChild(styleSheet);



        var empty1 = document.getElementById('empty1');
        empty1.setAttribute("class", "number");

        empty1.innerText = 0;
        var zero = document.getElementById("0");
        zero.setAttribute("class", "empty");
        zero.innerText = '';
        zero.setAttribute("id", "empty1");
        empty1.setAttribute("id", '0');
        var empty2 = document.getElementById('empty2');
        empty2.setAttribute("class", "number");
        empty2.setAttribute("id", ".");
        empty2.innerText = '.';
        var backspace = document.getElementById("backspace");

        backspace.innerText = "+/-";
        backspace.setAttribute("id", "plus/minus");
        document.getElementById("tog").innerHTML = "back";
        refreshListeners();
        renderFunctionality();




    }
    else{
        document.getElementById("style").setAttribute("href", "style.css");
        var styleSheet = document.createElement('link');
        styleSheet.rel = 'stylesheet';
        styleSheet.type = 'text/css';
        styleSheet.href = 'style.css';
        styleSheet.id = 'style';

        header.removeChild(element);
        header.appendChild(styleSheet);
        var empty1 = document.getElementById('0');
        empty1.setAttribute("class", "empty");

        empty1.innerText = '';
        var zero = document.getElementById("empty1");
        zero.setAttribute("class", "number");
        zero.innerText = '0';
        zero.setAttribute("id", "0");
        empty1.setAttribute("id", 'empty1');
        var empty2 = document.getElementById('.');
        empty2.setAttribute("id", "empty2");
        empty2.setAttribute("class", "empty");
        empty2.innerText = '';
        var backspace = document.getElementById("plus/minus");
        backspace.setAttribute("id", "backspace");

        backspace.innerText = "CE";
        document.getElementById("tog").innerText = "improve";
        refreshListeners();
        renderFunctionality();



    }
}

function refreshListeners(){
    var number = document.getElementsByClassName("number");

    for(var i = 0; i < number.length; i++){

        number[i].removeEventListener('click', numFunc, true);

    }
    var operator = document.getElementsByClassName("operator");
    for(var i = 0; i < operator.length; i++){
        operator[i].removeEventListener('click', opFunc, true);


    }

}

var changeStyle = document.getElementById("tog");
changeStyle.addEventListener('click', function(){

    swapStyleSheet(document.getElementById("style"));


}
                            )


var opFunc = function(){
    if (this.id == "clear"){
        printHistory("");
        printOutput("");

    }
    else if (this.id == "plus/minus"){

        var output = reverseNumberFormat(getOutput()).toString();

        if (output.substring(0, 1).localeCompare('-') == 0){

            output = output.substring(1, output.length);
            printOutput(output);

        }
        else{
            output = '-' + output;
            printOutput(output);
        }
    }
    else if (this.id == "backspace"){

        var output = reverseNumberFormat(getOutput()).toString();
        if (output){
            output = output.substr(0, output.length - 1);
            printOutput(output);
        }
    }
    else {
        var output = getOutput();
        var history = getHistory();
        if (output == ""&&history!=""){

            if (isNaN(history[history.length-1])){
                history = history.substr(0, history.length-1);
            }
        }
        if (output != "" || history != ""){
            output = output == "" ? 
                output: reverseNumberFormat(output);
            history = history + output;

            if (this.id == "="){
                var result = eval(history);
                printOutput(result);
                printHistory("");
            }
            else {
                history = history+this.id;
                printHistory(history);
                printOutput("");

            }
        }
    }
}

var numFunc = function(){

    if (getOutput().length >= 8){
        return;
    }
    if (getOutput().includes('.') || this.id.toString().localeCompare('.') == 0){

        var output = getOutput();
        output = output + this.id;
        document.getElementById("output-value").innerText = output;
        return;
    }
    if (getOutput().localeCompare('-0') == 0){
        var output = getOutput();
        output = '-' + this.id;
        printOutput(output);
        return;
    }

    var output = reverseNumberFormat(getOutput());

    if (output == 0){
        printOutput(getOutput() + this.id);
        return;
    }
    if (output != NaN){

        output = output + this.id;

        printOutput(output);
    }
}
function renderFunctionality(){
    var operator = document.getElementsByClassName("operator");
    for(var i = 0; i < operator.length; i++){
        operator[i].addEventListener('click', opFunc);


    }

    var number = document.getElementsByClassName("number");

    for(var i = 0; i < number.length; i++){

        number[i].addEventListener("click", numFunc);



    }
}
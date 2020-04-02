var filtro = function (obj) {
    obj.options[obj.selectedIndex].setAttribute("disabled","disabled");
    let tipo = obj.options[obj.selectedIndex].attributes["type"].nodeValue;
    switch (tipo) {
        case 'input': 
            SelectFilter.addTypeInput(obj.value.toLowerCase());
            break;
        case 'inputDate':
            SelectFilter.addTypeDate(obj.value.toLowerCase());
            break;
        case 'inputRange': 
            SelectFilter.addTypeInputRange(obj.value.toLowerCase());
            break;
        case 'inputSelectMulti': 
            SelectFilter.addTypeInputMultipleSelect(obj.value.toLowerCase());
            break;
        case 'selectMulti':
            let arr = obj.options[obj.selectedIndex].attributes["arr"].nodeValue;
            SelectFilter.addTypeMultipleSelect(obj.value.toLowerCase(), JSON.parse(arr) );
            break;
    }
    obj.value="0";
}

var clearList = function (OptionList, TitleName) { OptionList.length = 0; }

var getValues = function (objForm, objStrArray){
    if (objForm.length!=0)
        for (i=0;i<objForm.length;i++)
            objStrArray.value=(i==0)
                ? objForm.options[i].value
                    : objStrArray.value+", "+objForm.options[i].value;   
        else
            objStrArray.value='';
   	return objStrArray.value;
}

var bubbleSort = function (inputArray, inputArray1, start, rest){
    for (var i = rest - 1; i >= start;  i--){
        for (var j = start; j <= i; j++){
            if (inputArray1[j+1] < inputArray1[j]){
                var tempValue = inputArray[j];
                var tempValue1 = inputArray1[j];
                inputArray[j] = inputArray[j+1];
                inputArray1[j] = inputArray1[j+1];
                inputArray[j+1] = tempValue;
                inputArray1[j+1] = tempValue1;
            }
        }
    }
    return inputArray;
}

var move =  function (side, docFormObjLista, docFormObjSelected, bSort = true) {   
    var temp1 = new Array();
    var temp2 = new Array();
    var tempa = new Array();
    var tempb = new Array();
    var current1 = 0;
    var current2 = 0;
    var y=0;
    var attribute;
    if (side == "right") {  
        attribute1 = docFormObjLista; 
        attribute2 = docFormObjSelected;
    } else {  
        attribute1 = docFormObjSelected;
        attribute2 = docFormObjLista; 
    }
    for (var i = 0; i < attribute2.length; i++) {  
        y=current1++
        temp1[y] = attribute2.options[i].value;
        tempa[y] = attribute2.options[i].text;
    }
    for (var i = 0; i < attribute1.length; i++) {   
        if ( attribute1.options[i].selected ) {
            y=current1++
            temp1[y] = attribute1.options[i].value;
            tempa[y] = attribute1.options[i].text;
        } else {  
            y=current2++
            temp2[y] = attribute1.options[i].value; 
            tempb[y] = attribute1.options[i].text;
        }
    }
    if (bSort)
        temp1=bubbleSort(temp1,tempa, 0, temp1.length - 1);
    if (bSort)
        temp2=bubbleSort(temp2,tempb, 0, temp1.length - 1);
    clearList(attribute2,attribute2);
    for (var i = 0; i < temp1.length; i++) {  
        attribute2.options[i] = new Option();
        attribute2.options[i].value = temp1[i];
        attribute2.options[i].text =  tempa[i];
    }
    clearList(attribute1,attribute1);
    if (temp2.length>0) {	
        for (var i = 0; i < temp2.length; i++) {   
            attribute1.options[i] = new Option();
            attribute1.options[i].value = temp2[i];
            attribute1.options[i].text =  tempb[i];
        }
    }
    return true;
}


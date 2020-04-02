var SelectFilter = ( () => {

    let _strName = "";

    const _createObjInputChk = (strName) => {
        const _removeObj = () => {
            let oTr = document.getElementById("tr_" + strName);
            oTr.parentNode.removeChild(oTr);
            let objSelelect=document.getElementById("id_select_campos");
            for (let i = 0; i<(objSelelect.length); i++){
                if (objSelelect[i].value == strName.toUpperCase())
                    objSelelect[i].removeAttribute("disabled");
            }
        }
        obj = document.createElement('input');
        obj.type="checkbox"
        obj.id = "chk_" + strName;
        obj.checked="checked"
        obj.addEventListener('click', () => { _removeObj(); });
        return obj;
    }

    const _strLabel = (strOld) => {
        let arr = strOld.split("_");
        let strNew = '';
        for ( let i=0; i < arr.length; i++ )
            strNew += arr[i].substr(0,1).toUpperCase() + arr[i].substr(1, arr[i].length)+ " ";
        return strNew.substr(0, strNew.length-1);
    }

    const _creaTr = () => {
        let obj = document.createElement('tr');
        obj.id = "tr_"+_strName;
        return obj;
    }

    const _creaTdChk = () => {
        let obj = document.createElement('td');
        obj.setAttribute("valign", "top");
        let oInput = _createObjInputChk(_strName);
        obj.appendChild(oInput);  
        return obj;
    }

    const _creaTdLabel = () => {
        let obj = document.createElement('td');
        obj.setAttribute("valign", "top");
        obj.appendChild(document.createTextNode(_strLabel(_strName)));
        return obj;
    }  

    return {
        insertOption : function (strName) {
            let initPanelCaja = function () { 
                document.getElementById("id_"+ strName).value = '';
            }
            let x = document.getElementById("id_"+ strName +"_selected");
            let option = document.createElement("option");
            option.value = document.getElementById("id_" + strName).value
            option.text = document.getElementById("id_" + strName).value;
            x.add(option);
            initPanelCaja();  
        },
        deleteOption : function (strName) {
            let x = document.getElementById("id_"+ strName + "_selected");
            x.remove(x.selectedIndex);
        },
        addTypeInput : (strName) => {
            let creaTd2 = () => {
                let oInput = document.createElement('input');
                oInput.type="text";
                oInput.id = "id_"+ _strName;
                oInput.name = _strName;
                let obj = document.createElement('td');
                obj.appendChild(oInput);
                return obj;
            }
            _strName = strName;
            let oTr = _creaTr();
            oTr.appendChild(_creaTdChk());
            oTr.appendChild(_creaTdLabel());
            oTr.appendChild(creaTd2());
            document.getElementById('tab_mi_filtro_aux').appendChild(oTr);
        },
        addTypeInputMultipleSelect : function (strName) {
            let creaTdTable = function () {
                let creaTdInput = function () {
                    let creaInput = function () {
                        let obj = document.createElement('input');
                        obj.type="text";
                        obj.id = "id_" + _strName; 
                        obj.name = _strName;
                        obj.value = "";
                        return obj;
                    }
                    let obj = document.createElement('td');
                    obj.appendChild(creaInput());
                    return obj;
                }
                let creaTdButton = function () {
                    let creaButton = function () {                        
                        let obj = document.createElement('input');
                        obj.id = "id_button_" + _strName;
                        obj.name = "button_" + _strName;
                        obj.type = "button";
                        obj.value = "Agregar";                    
                        obj.setAttribute("onclick",
                            "SelectFilter.insertOption('" + _strName + "');"
                            + "getValues(document.getElementById('id_" + _strName + "_selected'),"
                            + "document.getElementById('strArr_" + _strName + "'));"                             
                        );
                        return obj;
                    }
                    let obj = document.createElement('td');
                    obj.setAttribute("align", "center");
                    obj.appendChild(creaButton());
                    return obj;
                }
                let creaTdSelectMultiple = function () {
                    let creaSelect = function () {
                        let obj = document.createElement('select');
                        obj.id = "id_"+ _strName + "_selected";
                        obj.name = _strName + "_selected";
                        obj.title = "Elimine con doble click";
                        obj.multiple = "multiple";
                        obj.setAttribute("style", "cursor:pointer");
                        obj.setAttribute("ondblclick",
                            "SelectFilter.deleteOption('" + _strName + "');"
                            + "getValues(document.getElementById('id_" + _strName + "_selected'),"
                            + "document.getElementById('strArr_" + _strName + "'));"                             
                        );
                        return obj;
                    }
                    let creaInput = function () {
                        let obj  = document.createElement('input');
                        obj.id = "strArr_"+_strName;
                        obj.name = "strArr_"+_strName;
                        obj.type = "hidden";
                        obj.value = "";
                        return obj;
                    }
                    let obj = document.createElement('td');
                    obj.appendChild(creaSelect());
                    obj.appendChild(creaInput());
                    return obj;
                }
                let oTr = [];
                oTr[0] = document.createElement('tr');
                oTr[0].appendChild(creaTdInput());
                oTr[1] = document.createElement('tr');
                oTr[1].appendChild(creaTdButton());
                oTr[2] = document.createElement('tr');
                oTr[2].appendChild(creaTdSelectMultiple());
                let oTable = document.createElement('table');
                oTable.appendChild(oTr[0]);
                oTable.appendChild(oTr[1]);
                oTable.appendChild(oTr[2]);
                let obj = document.createElement('td');              
                obj.appendChild(oTable);
                return obj;
            }   
            _strName = strName;
            let oTr = _creaTr();
            oTr.appendChild(_creaTdChk());
            oTr.appendChild(_creaTdLabel());
            oTr.appendChild(creaTdTable());
            document.getElementById('tab_mi_filtro_aux').appendChild(oTr);
        },
        addTypeInputRange : function (strName) {
            let creaTdTable = function () {
                let creaTdInput = function () {
                    let creaInput = function () {
                        let obj = document.createElement('input');
                        obj.type="text";
                        obj.id = "id_" + _strName;
                        obj.name = _strName;
                        return obj;
                    }
                    let obj = document.createElement('td');
                    obj.appendChild(creaInput());
                    return obj;
                }
                let oTr = _creaTr();
                oTr.appendChild(creaTdInput());
                _strName = strName + "_hasta";
                oTr.appendChild(_creaTdLabel());
                oTr.appendChild(creaTdInput());
                let oTable = document.createElement('table');
                oTable.appendChild(oTr);
                let obj = document.createElement('td');              
                obj.appendChild(oTable);
                return obj;
            }
            _strName = strName;
            let oTr = _creaTr();
            oTr.appendChild(_creaTdChk());
            _strName = strName + "_desde";
            oTr.appendChild(_creaTdLabel());
            oTr.appendChild(creaTdTable());           
            document.getElementById('tab_mi_filtro_aux').appendChild(oTr);
        },
        addTypeDate : function (strName) {
            let creaTdTable = function () {
                let creaTdInputScript = function () {
                    let creaDiv = function () {
                        let creaInput = function () {
                            let obj = document.createElement('input');
                            obj.type="text";
                            obj.id = "id_" + _strName;
                            obj.name = _strName;
                            obj.setAttribute("readonly","readonly");
                            return obj;
                        }
                        let creaScript = function () {
                            let obj = document.createElement('script');
                            obj.innerHTML = "Calendar.setup("
                                + "{inputField : 'id_"+_strName+"'," 
                                + "ifFormat : '%d/%m/%Y', "
                                + "button : 'id_"+_strName+"', "
                                + "align : 'Tr'});";
                            return obj;
                        }
                        let obj = document.createElement('div');
                        obj.appendChild(creaInput());
                        obj.appendChild(creaScript());
                        return obj;
                    }
                    let obj = document.createElement('td');
                    obj.appendChild(creaDiv());
                    return obj;
                }
                let oTr = document.createElement('tr');
                oTr.appendChild(creaTdInputScript());
                _strName = strName + "_hasta";
                oTr.appendChild(_creaTdLabel());
                oTr.appendChild(creaTdInputScript());
                let oTable = document.createElement('table');
                oTable.appendChild(oTr);
                let obj = document.createElement('td');              
                obj.appendChild(oTable); 
                return obj;               
            }
            _strName = strName;
            let oTr = _creaTr();
            oTr.appendChild(_creaTdChk());
            _strName = strName + "_desde";
            oTr.appendChild(_creaTdLabel());
            oTr.appendChild(creaTdTable());           
            document.getElementById('tab_mi_filtro_aux').appendChild(oTr);
        },
        addTypeMultipleSelect : function ( strName, arr ) {
            let creaTd2 = function () {              
                let creaSelect0 = function () {
                    let obj = document.createElement('select');
                    obj.setAttribute("style", "width:100%");
                    obj.id = "id_" + _strName +"_list";
                    obj.name = _strName + "_list";
                    obj.title = "Elimine con doble click";
                    obj.multiple = "multiple";
                    obj.setAttribute("style", "cursor:pointer");
                    obj.setAttribute("ondblclick",
                        "move('right', document.getElementById('id_" + _strName 
                            + "_list'), document.getElementById('id_" + _strName 
                            + "_selected')); getValues(document.getElementById('id_" + _strName 
                            + "_selected'), document.getElementById('strArr_" + _strName + "'));"                             
                    );
                    let aOptions = [];  
                    for ( let i = 0; i < (arr.length); i++) {
                        aOptions[i] = document.createElement("option");	
                        aOptions[i].value = arr[i][0];
                        aOptions[i].text = arr[i][1];
                        obj.appendChild(aOptions[i]);
                    }
                    return obj;
                }
                let creaButton0 = function () {
                    let obj = document.createElement('input');
                    obj.type="button"
                    obj.value=">>"
                    obj.setAttribute( "onclick", 
                        "move('right', document.getElementById('id_" + _strName 
                             + "_list'), document.getElementById('id_" + _strName 
                             + "_selected')); getValues(document.getElementById('id_" + _strName 
                             + "_selected'), document.getElementById('strArr_" + _strName + "'));" 
                    );
                    return obj;
                }
                let creaButton1 = function () {
                    let obj = document.createElement('input');
                    obj.type="button"
                    obj.value="<<"
                    obj.setAttribute( "onclick", 
                        "move('left', document.getElementById('id_" + _strName 
                            + "_list'), document.getElementById('id_" +_strName
                            + "_selected')); getValues(document.getElementById('id_" + _strName
                            + "_selected'), document.getElementById('strArr_" + _strName + "'));" 
                    );
                    return obj;
                }
                let creaSelect1 = function () {
                    let obj = document.createElement('td');
                    obj = document.createElement('select');
                    obj.setAttribute("style", "width:100%");
                    obj.id = "id_"+ _strName+"_selected";
                    obj.name = _strName+"_selected";
                    obj.title = "Elimine con doble click";
                    obj.multiple = "multiple";
                    obj.setAttribute("style", "cursor:pointer");
                    obj.setAttribute("ondblclick",
                        "move('left', document.getElementById('id_" + _strName 
                            + "_list'), document.getElementById('id_" + _strName
                            + "_selected')); getValues(document.getElementById('id_" + _strName 
                            + "_selected'), document.getElementById('strArr_" + _strName + "'));"                             
                    );
                    return obj;
                }
                let creaInput = function () {
                    let obj = document.createElement('input');
                    obj.id = "strArr_"+_strName;
                    obj.name = "strArr_"+_strName;
                    obj.type = "hidden";
                    obj.value = "";
                    return obj;
                }
                let creaTable = function () {
                    let arrTd = [];
                    arrTd[0] = document.createElement('td');
                    arrTd[0].width="45%";
                    arrTd[0].appendChild(creaSelect0());
                    arrTd[1] = document.createElement('td');
                    arrTd[1].width="10%";
                    arrTd[1].align="center";
                    arrTd[1].appendChild(creaButton0());
                    arrTd[1].appendChild(creaButton1());
                    arrTd[2] = document.createElement('td');
                    arrTd[2].width="45%";
                    arrTd[2].appendChild(creaSelect1());
                    arrTd[2].appendChild(creaInput());
                    let oTr = document.createElement('tr');
                    oTr.appendChild(arrTd[0]);
                    oTr.appendChild(arrTd[1]);
                    oTr.appendChild(arrTd[2]);
                    let oTable = document.createElement('table');
                    oTable.setAttribute("style","width: 100%");
                    return oTable.appendChild(oTr);
                }
                let obj = document.createElement('td');
                obj.appendChild(creaTable());
                return obj;
            }
            _strName = strName;
            let oTr = _creaTr();
            oTr.appendChild(_creaTdChk());
            oTr.appendChild(_creaTdLabel());
            oTr.appendChild(creaTd2());       
            document.getElementById('tab_mi_filtro_aux').appendChild(oTr);
        }        
    }
}
)();











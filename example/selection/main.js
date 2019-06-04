window.onload = function(){
    addDIVEmptyFirstLine();
    const editor = document.querySelector('div[contenteditable=true]');
    editor.addEventListener('input', setInfo);
    editor.addEventListener('keydown', addDIVEmptyFirstLine);
    editor.addEventListener('keyup', addDIVEmptyFirstLine);
    document.addEventListener('selectionchange', setInfo);
}

function setInfo(){
    const selection = window.getSelection();
    setBaseInfo(selection);
    setAnchorInfo(selection);
    setExtentInfo(selection);
    setFocusInfo(selection);
    setSelectionInfo(selection);
}

function setBaseInfo(selection){
    if(!isIEBrowser()){
        document.querySelector('#base-text').innerText = selection.baseNode.textContent;
        document.querySelector('#base-offset').innerText = selection.baseOffset;
    }
}

function setAnchorInfo(selection){
    document.querySelector('#anchor-text').innerText = selection.anchorNode.textContent;
    document.querySelector('#anchor-offset').innerText = selection.anchorOffset;
}

function setExtentInfo(selection){
    if(!isIEBrowser()){
        document.querySelector('#extent-text').innerText = selection.extentNode.textContent;
        document.querySelector('#extent-offset').innerText = selection.extentOffset;
    }
}

function setFocusInfo(selection){
    document.querySelector('#focus-text').innerText = selection.focusNode.textContent;
    document.querySelector('#focus-offset').innerText = selection.focusOffset;
}

function setSelectionInfo(selection){
    document.querySelector('#selection-text').innerText = selection.toString();
    document.querySelector('#selection-offset').innerText = selection.anchorOffset + ' ~ ' + selection.focusOffset;
}

function addDIVEmptyFirstLine(){
    const editor = document.querySelector('div[contenteditable=true]');
    if(editor.innerHTML === '' || document.querySelector('div[contenteditable=true]').childNodes[0].tagName === 'BR'){
        if(isIEBrowser()){
            editor.innerHTML = '<p></p>';
        }else{
            editor.innerHTML = '<div></div>';
        }
    }
}

function isIEBrowser(){
    return ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (navigator.userAgent.toLowerCase().indexOf("msie") != -1));
}

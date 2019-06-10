window.onload = function(){
    addDIVEmptyFirstLine();
    const editor = document.querySelector('div[contenteditable=true]');
    editor.addEventListener('input', setInfo);
    editor.addEventListener('keydown', addDIVEmptyFirstLine);
    editor.addEventListener('keyup', addDIVEmptyFirstLine);
    document.addEventListener('selectionchange', setInfo);
}

function setInfo(){
    const range = window.getSelection().getRangeAt(0);
    setStartInfo(range);
    setEndInfo(range);
}

function setStartInfo(range){
    document.querySelector('#start-text').innerText = range.startContainer.textContent;
    document.querySelector('#start-offset').innerText = range.startOffset;
    document.querySelector('#start-line-count').innerText = getLineCount(document.querySelector('div[contenteditable=true]'), range.startContainer);
}

function setEndInfo(range){
    document.querySelector('#end-text').innerText = range.endContainer.textContent;
    document.querySelector('#end-offset').innerText = range.endOffset;
    document.querySelector('#end-line-count').innerText = getLineCount(document.querySelector('div[contenteditable=true]'), range.endContainer);
}

function addDIVEmptyFirstLine(){
    const editor = document.querySelector('div[contenteditable=true]');
    if(editor.innerText === '' || editor.childNodes[0].tagName === 'BR'){
        if(!isIEBrowser()){
            editor.innerHTML = '<div></div>';
        }
    }
}

function getLineNode(editor, node){
    while(editor !== node && editor !== node.parentNode){
        node = node.parentNode;
    }
    return node;
}

function getLineCount(editor, node){
    return Array.prototype.slice.call(editor.childNodes).indexOf(getLineNode(editor, node));
}

function isIEBrowser(){
    return ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (navigator.userAgent.toLowerCase().indexOf("msie") != -1));
}

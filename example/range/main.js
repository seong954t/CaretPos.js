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
    setBaseInfo(range);
    setStartInfo(range);
    setEndInfo(range);
}

function setBaseInfo(range){
    const commonAncestorContainer = range.commonAncestorContainer;
    if(commonAncestorContainer.nodeType === Node.ELEMENT_NODE){
        document.querySelector('#common-text').innerText = commonAncestorContainer.innerText;
    } else if(commonAncestorContainer.nodeType === Node.TEXT_NODE){
        document.querySelector('#common-text').innerText = commonAncestorContainer.textContent;
    }
    
    document.querySelector('#common-offset').innerText = range.startOffset + ' ~ ' + range.endOffset;
}

function setStartInfo(range){
    document.querySelector('#start-text').innerText = range.startContainer.textContent;
    document.querySelector('#start-offset').innerText = range.startOffset;
}

function setEndInfo(range){
    document.querySelector('#end-text').innerText = range.endContainer.textContent;
    document.querySelector('#end-offset').innerText = range.endOffset;
}

function addDIVEmptyFirstLine(){
    const editor = document.querySelector('div[contenteditable=true]');
    if(editor.innerText === '' || editor.childNodes[0].tagName === 'BR'){
        if(!isIEBrowser()){
            editor.innerHTML = '<div></div>';
        }
    }
}

function isIEBrowser(){
    return ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (navigator.userAgent.toLowerCase().indexOf("msie") != -1));
}

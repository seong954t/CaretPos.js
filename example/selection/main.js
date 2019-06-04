window.onload = function(){
    const editor = document.querySelector('div[contenteditable=true]');
    editor.addEventListener('input', setInfo);
    document.addEventListener('selectionchange', setInfo);
}

function setInfo(){
    const selection = window.getSelection();
    setBaseInfo(selection);
    setExtentInfo(selection);
    setSelectionInfo(selection);
}

function setBaseInfo(selection){
    document.querySelector('#base-text').innerText = selection.anchorNode.textContent;
    document.querySelector('#base-offset').innerText = selection.anchorOffset;
}

function setExtentInfo(selection){
    document.querySelector('#extent-text').innerText = selection.focusNode.textContent;
    document.querySelector('#extent-offset').innerText = selection.focusOffset;
}

function setSelectionInfo(selection){
    document.querySelector('#selection-text').innerText = selection.toString();
    document.querySelector('#selection-offset').innerText = selection.anchorOffset + ' ~ ' + selection.focusOffset;
}

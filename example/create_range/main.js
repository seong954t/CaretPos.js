let startContainer;
let endContainer;

window.onload = function(){
    addDIVEmptyFirstLine();
    setContentMirror();
    const editor = document.querySelector('div[contenteditable=true]');
    const contentMirror = document.querySelector('#content-mirror');
    const moveCaretButton = document.querySelector('#mv-caret-btn');
    editor.addEventListener('input', setContentMirror);
    contentMirror.addEventListener('click', setContainer)
    contentMirror.addEventListener('contextmenu', setContainer);
    moveCaretButton.addEventListener('click', moveCaret)
}

function setContentMirror(){
    const editor = document.querySelector('div[contenteditable=true]');
    const contentMirror = document.querySelector('#content-mirror');
    contentMirror.innerHTML = editor.innerHTML;
    wrapTextNode(contentMirror);
    removeErrorMessage();
}

function wrapTextNode(element){
    const textNodeList = getTextNodeList(element);
    textNodeList.forEach(function(textNode){
        if(textNode.textContent !== ''){
            const parentNode = textNode.parentNode;
            const textWrapper = createTextNodeWrapper();
            parentNode.replaceChild(textWrapper, textNode);
            textWrapper.appendChild(textNode);
        }
    })
}
function createTextNodeWrapper(){
    const textNodeWrapper = document.createElement('span');
    textNodeWrapper.className = 'text-node-wrapper';
    return textNodeWrapper
}

function getTextNodeList(element){
    let textNodeList = [];
    Array.prototype.slice.call(element.childNodes).forEach(function(childNode){
        if(childNode.nodeType === Node.TEXT_NODE){
            if(!childNode.textContent.match('\n')){
                textNodeList.push(childNode);
            }
        } else{
            const vv = getTextNodeList(childNode);
            textNodeList = textNodeList.concat(vv);
        }
    });
    return textNodeList;
}

function setContainer(event){
    const target = event.target;
    if(target.className === 'text-node-wrapper'){
        if(event.type === 'click'){
            setStartContainer(target);
        }else if(event.type === 'contextmenu'){
            event.preventDefault();
            setEndContainer(target);
        }
    }
    removeErrorMessage();
}
function setStartContainer(element){
    startContainer = element;
    document.querySelector('#start-container-text').innerText = startContainer.innerText;
}

function setEndContainer(element){
    endContainer = element;
    document.querySelector('#end-container-text').innerText = endContainer.innerText;
}

function moveCaret(){
    const textNodeList = getTextNodeList(document.querySelector('div[contenteditable=true]'));
    const textNodeWrapperList = Array.prototype.slice.call(document.querySelectorAll('.text-node-wrapper'));
    if(startContainer === undefined){
        setErrorMessage('please set start container');
        return;
    } else if(endContainer === undefined){
        setErrorMessage('please set end container');
        return;
    }
    const startContainerIndex = textNodeWrapperList.indexOf(startContainer);
    const endContainerIndex = textNodeWrapperList.indexOf(endContainer);
    if(endContainerIndex < startContainerIndex){
        setErrorMessage('start container should be setted before end container');
    }
    setRange(textNodeList[startContainerIndex],
            document.querySelector('#start-offset').value, 
            textNodeList[endContainerIndex],
            document.querySelector('#end-offset').value)
    
}

function setRange(startContainer, startOffset, endContainer, endOffset){
    const selection = document.getSelection();
    const newRange = document.createRange();
    if(startOffset < 0){
        setErrorMessage('you can set start offset with only positive number');
        return;
    } else if(endOffset < 0){
        setErrorMessage('you can set end offset with only positive number');
        return;
    } else if(startContainer.textContent.length < startOffset){
        setErrorMessage('start offset is lonnger than start container length');
        return;
    } else if(endContainer.textContent.length < endOffset){
        setErrorMessage('end offset is lonnger than end container length');
        return;
    }
    newRange.setStart(startContainer, startOffset);
    newRange.setEnd(endContainer, endOffset);
    selection.removeAllRanges();
    selection.addRange(newRange);
}

function setErrorMessage(message){
    const errorElement = document.querySelector('#err-msg');
    errorElement.innerText = message;
}

function removeErrorMessage(){
    const errorElement = document.querySelector('#err-msg');
    errorElement.innerText = '';
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

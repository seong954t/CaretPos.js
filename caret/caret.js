/**
 * Hangul.js
 * https://github.com/seong954t/CaretPos.js
 *
 * Copyright 2019, Seungtae Kim
 * under the MIT license.
 */
(function() {
    /**
     * caret position setting functions
     * you can get/set caret information with text index
    */
    let positionEditor;
    const INNER_LINE_NODE_NAMES = ['LI', 'TH', 'TD'];

    function caretInitialize(element){
        positionEditor = element;
    }

    function getStartAndEndCaretPositions(){
        const selection = window.getSelection();
        const anchorNode = selection.anchorNode;
        const anchorOffset = selection.anchorOffset;
        const focusNode = selection.focusNode;
        const focusOffset = selection.focusOffset;

        return [getCaretPosition(anchorNode, anchorOffset), getCaretPosition(focusNode, focusOffset)];
    }

    function getTextNodeList(element){
        let textNodeList = [];
        element.childNodes.forEach(function(childNode){
            if(childNode.nodeType === Node.TEXT_NODE){
                if(!childNode.textContent.includes('\n')){
                    textNodeList.push(childNode);
                }
            } else if(childNode.tagName === 'BR'){
                if(childNode.parentNode.innerText === '\n'){
                    textNodeList.push(childNode.parentNode);
                }else{
                    textNodeList.push(childNode);
                }
            } else{
                textNodeList = textNodeList.concat(getTextNodeList(childNode));
            }
        })
        return textNodeList;
    }

    function getCaretPosition(node, offset){
        let position = 0;
        
        if(node.tagName === 'TD' || node.tagName === 'LI'){
            node = node.childNodes[offset];
            offset = 0;
        }
        if(node === positionEditor){
            offset = getTableNodeOffset(offset);
        }

        getTextNodeList(positionEditor).every(function(textNode){
            if(textNode !== node){
                position += textNode.textContent.length;
                if(textNode.tagName === 'BR'){
                    position += 1;
                }
                return true;
            }else{
                return false;
            }
        })
        
        return position + offset + getCurrentLineIndex(node);
    }

    function getTableNodeOffset(offset){
        const tableList = Array.prototype.slice.call(positionEditor.querySelectorAll('TABLE'));
        if(positionEditor.childNodes[offset].tagName === 'TABLE'){
            return tableList.indexOf(positionEditor.childNodes[offset])*2;
        } else if(positionEditor.childNodes[offset-1].tagName === 'TABLE'){
            return tableList.indexOf(positionEditor.childNodes[offset-1])*2 + 1;
        }
        return offset;
    }

    function getCurrentLineIndex(node){
        const currentLindeNode = getCurrentLineNode(node);
        const lineNodeList = getLineNodeList();
        if(node === positionEditor){
            return lineNodeList.length;
        }
        return lineNodeList.indexOf(currentLindeNode[1] === undefined ? currentLindeNode[0] : currentLindeNode[1]);
    }

    function getCurrentLineNode(node){
        let currentLineNode = node;
        let currentInnerLineNode;
        while(currentLineNode !== positionEditor && currentLineNode.parentNode !== positionEditor){
            if(currentInnerLineNode === undefined && INNER_LINE_NODE_NAMES.includes(currentLineNode.tagName)){
                currentInnerLineNode = currentLineNode;
            }
            currentLineNode = currentLineNode.parentNode;
        }
        return [currentLineNode, currentInnerLineNode];
    }

    function getLineNodeList(){
        const lineNodeList = Array.prototype.slice.call(positionEditor.childNodes).filter(childNode => !(childNode.nodeType === Node.TEXT_NODE && childNode.textContent.includes('\n')));
        let newLineNodeList = [];

        lineNodeList.forEach(function(lineNode){
            const innerLineNode = lineNode.querySelectorAll(['LI', 'TH', 'TD:not(LI)']);
            if(innerLineNode.length === 0){
                newLineNodeList.push(lineNode);
            }else{
                newLineNodeList = newLineNodeList.concat(Array.prototype.slice.call(innerLineNode));
            }
        })

        return newLineNodeList;
    }

    function setStartAndEndCaretPositions(start, end){

    }

    const caretPosition = {
        initialize: caretInitialize,
        getCaretPositions: getStartAndEndCaretPositions,
        setCaretPositions: setStartAndEndCaretPositions,
        getTextNodeList: getTextNodeList
    }

    /**
     * caret visualization setting functions
     *  you can draw customize caret with text index
    */ 
    let visualizationEditor;

    function visualizationInitialize(element){
        visualizationEditor = element;
    }

    function createVisualizationCaret(key, name, color){

    }

    function removeVisualizationCaret(key){

    }

    function drawVisualizationCaret(key, start, end){

    }

    const visualization = {
        initialize: visualizationInitialize,
        createCaret: createVisualizationCaret,
        removeCaret: removeVisualizationCaret,
        drawCaret: drawVisualizationCaret
    }

    const caret = {
        initialize: visualizationInitialize,
        position: caretPosition,
        visualization: visualization
    };

    function isActiveElement(element){
        return document.activeElement === element;
    }
    
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return caret;
        });
    } else if (typeof module !== 'undefined') {
        module.exports = caret;
    } else {
        window.caret = caret;
    }
})();

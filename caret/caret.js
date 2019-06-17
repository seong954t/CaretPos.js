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

    function caretInitialize(element){
        positionEditor = element;
    }

    function getStartAndEndCaretPositions(){

    }

    function setStartAndEndCaretPositions(start, end){

    }

    const caretPosition = {
        initialize: caretInitialize,
        getCaretPositions: getStartAndEndCaretPositions,
        setCaretPositions: setStartAndEndCaretPositions
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

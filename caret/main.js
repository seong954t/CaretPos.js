window.onload = function(){
    const editor = document.querySelector('div[contenteditable=true]');
    window.caret.position.initialize(editor);
    window.caret.visualization.initialize(editor);
}
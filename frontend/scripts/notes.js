const openNotes = (nota)=>{
    // const home = document.querySelector('#home');
    const closeNoteBtn = document.createElement('img');
    closeNoteBtn.setAttribute('src', '../img/cross.svg');
    closeNoteBtn.className = 'close__notes';
    const note = document.createElement('div');
    note.className = 'notes';
    note.innerHTML = `<p>${nota}</p>`
  
    
    document.body.appendChild(note);
    note.appendChild(closeNoteBtn);
    // home.appendChild(note)

    closeNoteBtn.addEventListener('click', (e)=>closeNote(e));
}

const closeNote = (e)=>{
    console.log(e.target)
    console.log(e.target.parentElement)
    e.target.parentElement.remove();
}

const closeAllNotes = () =>{
    const notes = document.querySelectorAll('.notes');
    notes.forEach(note => note.remove());
}

const Note = {openNotes, closeAllNotes}

export default Note;
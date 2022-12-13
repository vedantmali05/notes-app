/**
 * TODO -
 * BackGround is Remaining
 */

// ///////////////////////// MENU OPEN AND CLOSE
let menu_btn = document.getElementById("menu_btn");
let menu = document.getElementById("menu")

menu_btn.addEventListener("click", function () {
    menu_btn.classList.toggle("open");
    menu.classList.toggle("open")
});

// //////////////////////////// ELEMENTS

// Single
let add_btn = document.getElementById("add_btn");
let cancel_note_btn = document.getElementById("cancel_note_btn");
let about_btn = document.getElementById("about_btn");
let preview_sec = document.getElementById("preview_sec");

let note_ctr = document.getElementById("note_ctr");

let all_notes_btn = document.getElementById("all_notes_btn");
let fav_notes_btn = document.getElementById("fav_notes_btn");
let archived_notes_btn = document.getElementById("archived_notes_btn");
let trash_notes_btn = document.getElementById("trash_notes_btn");

let preview = document.getElementById("preview");
let close_prev_btn = document.getElementById("close_prev_btn");
let prev_title = document.getElementById("prev_title");
let prev_trash_btn = document.getElementById("prev_trash_btn");
let prev_share_btn = document.getElementById("prev_share_btn");
let prev_archive_btn = document.getElementById("prev_archive_btn");
let prev_important_btn = document.getElementById("prev_important_btn");
let prev_copy_btn = document.getElementById("prev_copy_btn");
let prev_content = document.getElementById("prev_content");

// Multiple
// notes
let noteArr = document.getElementsByClassName("note");
let favNoteArr = document.getElementsByClassName("fav");
let archivedNoteArr = document.getElementsByClassName("archive");
let trashNoteArr = document.getElementsByClassName("trash");

// buttons on notes
let trashBtnArr = document.getElementsByClassName("trash-btn");
let archiveBtnArr = document.getElementsByClassName("archive-btn");
let impBtnArr = document.getElementsByClassName("important-btn");
let shareBtnArr = document.getElementsByClassName("share-btn");

// /////////////////////// Supporting Variables
let currNote = {
    noteNum: 0,
    noteElem: "",
    title: "",
    isTrash: false,
    isArchive: false,
    isFav: false,
    content: ""
}


// //////////////////////////// FUNCTIONS
// function to change the visibilities of diffrent panes
function panelChanger(classAdd) {
    preview_sec.classList.remove("new");
    preview_sec.classList.remove("empty");
    preview_sec.classList.remove("viewed");
    preview_sec.classList.remove("about");

    preview_sec.classList.add(classAdd);
}

// function to hide currently viewing note
function notePrevHider() {
    for (let j = 0; j < noteArr.length; j++) {
        noteArr[j].classList.remove("viewed");
    }

    prev_trash_btn.classList.remove("trash");
    prev_archive_btn.classList.remove("archive");
    prev_important_btn.classList.remove("fav");
}

// change color of the menu items
function menuColorShifter(elem) {
    all_notes_btn.style.backgroundColor = "#ffffff"
    fav_notes_btn.style.backgroundColor = "#ffffff"
    archived_notes_btn.style.backgroundColor = "#ffffff";
    trash_notes_btn.style.backgroundColor = "#ffffff";
    about_btn.style.backgroundColor = "#ffffff";

    elem.style.backgroundColor = "#feefc3";
}

// function to refresh the notes visibility
function noteRefresh() {
    for (let i = 0; i < noteArr.length; i++) {

        if (noteArr[i].classList.contains("trash") == true || noteArr[i].classList.contains("archive") == true) {
            noteArr[i].style.display = "none";
        } else {
            noteArr[i].style.display = "block";
        }
    }
}

// Function to hide all notes
function allNotesHider() {
    for (let i = 0; i < noteArr.length; i++) {
        noteArr[i].style.display = "none";
    }
}

// Set the contraints like fav, archive, trash
function setConstraints(buttonArr, classTgl) {
    for (let i = 0; i < noteArr.length; i++) {

        buttonArr[i].addEventListener("click", function (e) {
            e.preventDefault();

            noteArr[i].classList.toggle(classTgl);
            if (buttonArr[i].classList.contains("trash-btn") == true) {
                prev_trash_btn
            }
            // noteRefresh();
        })

    }

}

// View the note in preview pane
function viewNote() {
    let noteNumber = 0;
    for (let i = 0; i < noteArr.length; i++) {

        let notes = noteArr[i].getElementsByClassName("title-box")[0];

        notes.addEventListener("click", function () {

            // Current Note Details
            currNote.noteNum = i;
            currNote.noteElem = noteArr[i];
            currNote.title = currNote.noteElem.getElementsByClassName("title")[0].innerHTML;
            currNote.content = currNote.noteElem.getAttribute("data-content");
            currNote.isTrash = (currNote.noteElem.classList.contains("trash"));
            currNote.isArchive = (currNote.noteElem.classList.contains("archive"));
            currNote.isFav = (currNote.noteElem.classList.contains("fav"));

            notePrevHider();
            currNote.noteElem.classList.add("viewed");
            add_btn.classList.remove("new");
            panelChanger("viewed");

            prev_title.innerHTML = currNote.title;
            prev_content.innerHTML = currNote.content;

            if (currNote.isTrash == true) {
                prev_trash_btn.classList.add("trash");
            }
            if (currNote.isArchive == true) {
                prev_archive_btn.classList.add("archive");
            }
            if (currNote.isFav == true) {
                prev_important_btn.classList.add("fav");
            }

            // Current Note Controls
            prev_trash_btn.addEventListener("click", function (e) {
                e.preventDefault();
                currNote.noteElem.classList.toggle("trash");
                this.classList.toggle("trash");
            })

            prev_archive_btn.addEventListener("click", function (e) {
                e.preventDefault();
                currNote.noteElem.classList.toggle("archive");
                this.classList.toggle("archive");
            })

            prev_important_btn.addEventListener("click", function (e) {
                e.preventDefault();

                currNote.noteElem.classList.toggle("fav");
                this.classList.toggle("fav");
            })

            console.log(noteNumber);
            // FIXME: Clear noteNumber
        })
    }
}



// Buttons

// + ADD NOTE | new note button event
add_btn.addEventListener("click", function (e) {
    e.preventDefault();
    add_btn.classList.add("new");
    panelChanger("new");
    notePrevHider();
});

// CANCEL | cancel new note button event
cancel_note_btn.addEventListener("click", function (e) {
    e.preventDefault();
    add_btn.classList.remove("new");
    panelChanger("empty")
});

// About | about panel viewer button event
about_btn.addEventListener("click", function (e) {
    e.preventDefault();
    add_btn.classList.remove("new");
    panelChanger("about");
    menuColorShifter(about_btn);
});

// ❌ | close current note preview button 
close_prev_btn.addEventListener("click", function (e) {
    e.preventDefault();
    panelChanger("empty")
})

// ///////////////////////// NOTE FILTERING

// call noteRefresh(); once at first
noteRefresh();

// 📒 All Notes | click event
all_notes_btn.addEventListener("click", function (e) {
    e.preventDefault();
    menuColorShifter(all_notes_btn)
    noteRefresh();
})

// ⭐ Important | click event
fav_notes_btn.addEventListener("click", function (e) {
    e.preventDefault();
    menuColorShifter(fav_notes_btn);
    allNotesHider();

    for (let i = 0; i < favNoteArr.length; i++) {
        favNoteArr[i].style.display = "block";
    }
});

// 📥 Archive | click event
archived_notes_btn.addEventListener("click", function (e) {
    e.preventDefault();
    menuColorShifter(archived_notes_btn);
    allNotesHider();

    for (let i = 0; i < archivedNoteArr.length; i++) {
        archivedNoteArr[i].style.display = "block";
    }
});

// 🗑️ Trash | click event
trash_notes_btn.addEventListener("click", function (e) {
    e.preventDefault();
    menuColorShifter(trash_notes_btn);
    allNotesHider();

    for (let i = 0; i < trashNoteArr.length; i++) {
        trashNoteArr[i].style.display = "block";
    }
});

// About | button event is defined above

// ///////////////////////// NOTE FILTER CONTRAINTS
setConstraints(trashBtnArr, "trash");
setConstraints(archiveBtnArr, "archive");
setConstraints(impBtnArr, "fav");

// ///////////////////////// Viewing the note
viewNote();
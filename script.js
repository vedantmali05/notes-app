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
let save_note_btn = document.getElementById("save_note_btn");
let add_title_txt = document.getElementById("add_title_txt");
let add_content_txt = document.getElementById("add_content_txt");
let bg_note_btn = document.getElementById("bg_note_btn");

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
// let favNoteArr = document.getElementsByClassName("fav");
// let archivedNoteArr = document.getElementsByClassName("archive");
// let trashNoteArr = document.getElementsByClassName("trash");

// buttons on notes
let trashBtnArr = document.getElementsByClassName("trash-btn");
let archiveBtnArr = document.getElementsByClassName("archive-btn");
let impBtnArr = document.getElementsByClassName("important-btn");
let shareBtnArr = document.getElementsByClassName("share-btn");
let titleBoxArr = document.getElementsByClassName("title-box");


// /////////////////////// Supporting Variables
let currNote = {
    num: 0,
    elem: "",
    title: "",
    isTrash: "",
    isArchive: "",
    isFav: "",
    content: ""
}

// Share
let share_main = document.getElementById("share_main");
let shared_note = document.getElementById("shared_note");
let close_share_btn = document.getElementById("close_share_btn");



// //////////////////////////// FUNCTIONS
// function to change the visibilities of diffrent panes
function panelChanger(classAdd) {
    preview_sec.classList.remove("new");
    preview_sec.classList.remove("empty");
    preview_sec.classList.remove("viewed");
    preview_sec.classList.remove("about");

    preview_sec.classList.add(classAdd);
}

function varReset() {
    noteArr = [];

    trashBtnArr = [];
    archiveBtnArr = [];
    impBtnArr = [];
    shareBtnArr = [];
    titleBoxArr = [];

    noteArr = document.getElementsByClassName("note");

    trashBtnArr = document.getElementsByClassName("trash-btn");
    archiveBtnArr = document.getElementsByClassName("archive-btn");
    impBtnArr = document.getElementsByClassName("important-btn");
    shareBtnArr = document.getElementsByClassName("share-btn");
    titleBoxArr = document.getElementsByClassName("title-box");
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

// Function to filter notes
function filterNotes(classname) {
    for (let i = 0; i < noteArr.length; i++) {
        if (noteArr[i].classList.contains(classname)) {
            noteArr[i].style.display = "block";
        } else {
            noteArr[i].style.display = "none";
        }
    }
}

// Function to hide all notes
function allNotesHider() {
    for (let i = 0; i < noteArr.length; i++) {
        noteArr[i].style.display = "none";
    }
}

// Function to set trash, archive, fav constraints
// function setContraints(buttonArray, classname) {
//     console.log("trash button clicked");
//     for (let i = 0; i < buttonArray.length; i++) {
//         console.log("Num: " + i);
//         buttonArray[i].addEventListener("click", function () {

//             if (currNote.num == i) {
//                 switch (classname) {
//                     case "trashed":
//                         prev_trash_btn.classList.toggle("true");
//                         break;
//                     case "archived":
//                         prev_archive_btn.classList.toggle("true");
//                         break;
//                     case "favd":
//                         prev_important_btn.classList.toggle("true");
//                         break;
//                 }
//             }
//         });
//     }
// }

function setTrash() {
    for (let i = 0; i < trashBtnArr.length; i++) {
        trashBtnArr[i].addEventListener("click", function (e) {
            console.log(trashBtnArr[i]);
            trashBtnArr[i].classList.toggle("trashed");
            trashBtnArr[i].parentElement.parentElement.classList.toggle("trashed");
            if (currNote.num == i) {
                prev_trash_btn.classList.toggle("true");
            }
        });
    }
}


// Function to add and remove class based on condition
function classToggler(condition, elem, classname) {
    if (condition == true) {
        elem.classList.add(classname);
    } else {
        elem.classList.remove(classname);
    }
}

// Buttons

// + ADD NOTE | new note button event
add_btn.addEventListener("click", function (e) {
    e.preventDefault();
    add_btn.classList.add("new");
    panelChanger("new");
});

let cancelClickCounter = 0;

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

    currNote.elem.querySelector(".title").innerHTML = prev_title.innerHTML;
    currNote.elem.setAttribute("data-content", prev_content.innerHTML);

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

    filterNotes("favd");
});

// 📥 Archive | click event
archived_notes_btn.addEventListener("click", function (e) {
    e.preventDefault();
    menuColorShifter(archived_notes_btn);
    allNotesHider();

    filterNotes("archived");
});

// 🗑️ Trash | click event
trash_notes_btn.addEventListener("click", function (e) {
    e.preventDefault();
    menuColorShifter(trash_notes_btn);
    allNotesHider();

    filterNotes("trashed");
});

// About | button event is defined above

// /////////////////////////////// NEW NOTE

// CANCEL | cancel new note button event
cancel_note_btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (cancelClickCounter == 0) {
        cancel_note_btn.innerHTML = "Are you sure?";
        cancelClickCounter = 1;
    } else if (cancelClickCounter == 1) {
        add_title_txt.value = "";
        add_content_txt.value = "";
        add_btn.classList.remove("new");
        panelChanger("empty");
        cancel_note_btn.innerHTML = "Cancel";
        cancelClickCounter = 0;
    }
});

let newNoteCount = 0;

save_note_btn.addEventListener("click", function (e) {

    e.preventDefault();

    let newNote = document.createElement("div");
    newNote.className = "note";
    newNote.innerHTML = `
                    <div class="title-box">
                        <span class="title"></span>
                        <button class="status">Edit</button>
                    </div>
                    <div class="control-box">
                        <button class="icon-btn trash-btn" title="Move to trash">
                            <span class="icon"><i class="bi bi-trash"></i></span>
                        </button>
                        <button class="icon-btn share-btn" title="Share with friends">
                            <span class="icon"><i class="bi bi-share"></i></span>
                        </button>
                        <button class="icon-btn archive-btn" title="Archive Note">
                            <span class="icon"><i class="bi bi-archive"></i></span>
                        </button>
                        <button class="icon-btn important-btn" title="Mark as Important">
                            <span class="icon"><i class="bi bi-star"></i></span>
                        </button>
                    </div>`

    newNote.setAttribute("data-content", add_content_txt.value);
    newNote.querySelector(".title").innerHTML = add_title_txt.value;

    note_ctr.insertBefore(newNote, noteArr[0]);
    varReset();
    newNoteCount++;

    setTrash();
    notePreviewer();

});

// setContraints(trashBtnArr, "trashed");
// setContraints(archiveBtnArr, "archived");
// setContraints(impBtnArr, "favd");

for (let i = 0; i < shareBtnArr.length; i++) {
    shareBtnArr[i].addEventListener("click", function () {
        shared_note.innerHTML = ``;
        let selectedNote = noteArr[i].cloneNode();
        let selectedNoteContent = noteArr[i].innerHTML;
        selectedNote.innerHTML = selectedNoteContent;
        shared_note.append(selectedNote);
        shared_note.firstChild.className = `note-on-share`;
        share_main.classList.add("open");
    });
}

close_share_btn.addEventListener("click", function () {
    share_main.classList.remove("open");
    shared_note.innerHTML = ``;
})


let emailInput = document.getElementById("receiver");
let invalidbox = document.getElementById("invalidbox");
let send_btn = document.getElementById("send_btn");

function emailValid() {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let email = emailInput.value;

    if (email.match(regexEmail) || email == "") {
        invalidbox.innerHTML = "Send via Email";
        send_btn.disabled = false;
    } else {
        invalidbox.innerHTML = "Enter a valid email address";
        send_btn.disabled = true;
    }
}

send_btn.addEventListener("click", function () {

    if (emailInput.value != "") {
        this.innerHTML = `<span class="icon"><i class="bi bi-clock"></i></span> Sending...`;
        setTimeout(() => {
            this.innerHTML = `<span class="icon"><i class="bi bi-envelope-check"></i></span> Emailed`;
        }, 2000);
    } else {
        invalidbox.innerHTML = "Please specify an email!";
    }
})


// Viewing the Note

// TODO: Access the heading
function notePreviewer() {
    console.log("Showing Note");
    for (let i = 0; i < titleBoxArr.length; i++) {
        titleBoxArr[i].addEventListener("click", function () {

            add_btn.classList.remove("new");

            if (currNote.elem != "") {
                currNote.elem.querySelector(".title").innerHTML = prev_title.innerHTML;
                currNote.elem.setAttribute("data-content", prev_content.innerHTML);
            }


            // get current note details
            currNote.num = i;
            currNote.elem = noteArr[i];
            currNote.title = noteArr[i].querySelector(".title").innerHTML;
            currNote.content = currNote.elem.getAttribute("data-content");

            prev_title.innerHTML = currNote.title;
            classToggler(currNote.elem.classList.contains("trashed"), prev_trash_btn, "true");
            classToggler(currNote.elem.classList.contains("archived"), prev_archive_btn, "true");
            classToggler(currNote.elem.classList.contains("favd"), prev_important_btn, "true");
            prev_content.innerHTML = currNote.content;

            panelChanger("viewed");
        })

    }
}


prev_trash_btn.addEventListener("click", function (e) {
    e.preventDefault();
    noteArr[currNote.num].classList.toggle("trashed");
    this.classList.toggle("true");
});

prev_archive_btn.addEventListener("click", function (e) {
    e.preventDefault();
    noteArr[currNote.num].classList.toggle("archived");
    this.classList.toggle("true");
});

prev_important_btn.addEventListener("click", function (e) {
    e.preventDefault();
    noteArr[currNote.num].classList.toggle("favd");
    this.classList.toggle("true");
});

prev_share_btn.addEventListener("click", function (e) {
    e.preventDefault();
    shared_note.append(currNote.elem);
    shared_note.firstElementChild.className = "note-on-share";
    share_main.classList.add("open");
});

prev_copy_btn.addEventListener("click", function (e) {
    e.preventDefault();
    let copied = currNote.title + "\r\n\r\n" + currNote.content;
    navigator.clipboard.writeText(copied);

    prev_copy_btn.classList.add("copied");
    prev_copy_btn.innerHTML = `<span class="icon"><i class="bi bi-clipboard-check"></i></span>`;
    setTimeout(() => {
        prev_copy_btn.classList.remove("copied");
        prev_copy_btn.innerHTML = `<span class="icon"><i class="bi bi-clipboard"></i></span>`;
    }, 5000);

});

prev_content.addEventListener("input", function (e) {
    e.preventDefault();
    currNote.content = prev_content.innerHTML;
    currNote.elem.setAttribute("data-content", prev_content.innerHTML);
});

prev_title.addEventListener("input", function (e) {
    e.preventDefault();
    currNote.title = prev_title.innerHTML;
    currNote.elem.querySelector(".title").innerHTML = prev_title.innerHTML;
});

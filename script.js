// מערך שמכיל את כל הפתקים
let notes = [];

// משתנה שמתקדם כדי לתת לכל פתק ID ייחודי
let nextId = 1;

// נבחר את האלמנטים מה-DOM (הדף)
const newNoteBtn = document.getElementById("newNoteBtn");
const editor = document.getElementById("editor");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesContainer = document.getElementById("notes");

// משתנה כדי לדעת אם אנחנו בעריכה של פתק קיים
let editingId = null;

newNoteBtn.addEventListener("click", () => {
    editor.style.display = "grid"; // מציג את אזור העריכה
    titleInput.value = "";          // מנקה את שדה הכותרת
    contentInput.value = "";        // מנקה את שדה התוכן
    saveBtn.textContent = "Save";   // לוודא שהכפתור כתוב "Save"
    editingId = null;               // אנחנו לא בעריכה
});

saveBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "") {
        alert("Please enter a title!");
        return;
    }

    if (content === "") {
        alert("Please enter a note!");
        return;
    }

    if (editingId) {
        // אנחנו בעריכה של פתק קיים
        const note = notes.find(n => n.id === editingId);
        note.title = title;
        note.content = content;
        editingId = null;
        saveBtn.textContent = "Save";
    } else {
        // יצירת פתק חדש
        const note = {
            id: nextId++,
            title: title,
            content: content
        };
        notes.push(note);
    }

    titleInput.value = "";
    contentInput.value = "";
    editor.style.display = "none";

    renderNotes(); // מציג את כל הפתקים
});

cancelBtn.addEventListener("click", () => {
    titleInput.value = "";
    contentInput.value = "";
    editor.style.display = "none";
    editingId = null;
    saveBtn.textContent = "Save";
});
function renderNotes() {
    notesContainer.innerHTML = ""; // מנקה הכל

    notes.forEach(note => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";
        noteDiv.dataset.id = note.id;

        // כותרת הפתק
        const titleDiv = document.createElement("div");
        titleDiv.className = "note-title";
        titleDiv.textContent = note.title;

        // תוכן הפתק מוסתר בהתחלה
        const contentDiv = document.createElement("div");
        contentDiv.className = "note-content";
        contentDiv.textContent = note.content;
        contentDiv.style.display = "none"; // מסתיר בהתחלה

        // כפתורי Edit / Delete
        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "note-buttons";
        buttonsDiv.style.display = "none"; // מסתירים בהתחלה

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            editor.style.display = "grid";
            titleInput.value = note.title;
            contentInput.value = note.content;
            saveBtn.textContent = "Save";
            editingId = note.id;
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            notes = notes.filter(n => n.id !== note.id);
            renderNotes();
        });

        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);

        // לחיצה על הפתק – מראה את התוכן והכפתורים
        noteDiv.addEventListener("click", () => {
            const isVisible = contentDiv.style.display === "block";
            contentDiv.style.display = isVisible ? "none" : "block";
            buttonsDiv.style.display = isVisible ? "none" : "flex";
        });

        // הוספה ל-DIV של הפתק
        noteDiv.appendChild(titleDiv);
        noteDiv.appendChild(contentDiv);
        noteDiv.appendChild(buttonsDiv);

        // מוסיפים לרשימת הפתקים
        notesContainer.appendChild(noteDiv);
    });
}
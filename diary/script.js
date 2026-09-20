const pinInput = document.getElementById("pin");
const unlockBtn = document.getElementById("unlock-btn");
const errorMessage = document.getElementById("error-message");

const welcomeCard = document.querySelector(".welcome-card");
const diaryDashboard = document.getElementById("diary-dashboard");

const lockBtn = document.getElementById("lock-btn");
const todayDate = document.getElementById("today-date");

// ==============================
// 🔐 CUSTOM PIN
// ==============================

let savedPin =
    localStorage.getItem("bloomVaultPin");


 // ==============================
// 🔐 CUSTOM PIN
// ==============================

let savedPin =
localStorage.getItem("bloomVaultPin");


// ==============================
// UNLOCK DIARY
// ==============================

unlockBtn.addEventListener("click", () => {

const enteredPin = pinInput.value;

if (enteredPin === savedPin) {

    errorMessage.textContent = "✨ Welcome back!";
    errorMessage.style.color = "#8c6fa3";

    setTimeout(() => {

        welcomeCard.classList.add("hide");
        diaryDashboard.classList.add("active");

    }, 500);

} else {

    errorMessage.textContent =
        "Hmm... that isn't your secret PIN 🌷";

    pinInput.value = "";

}

});

// ==============================
// TODAY'S DATE
// ==============================

const today = new Date();

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

todayDate.textContent =
    today.toLocaleDateString("en-US", options);


// ==============================
// MOOD SELECTOR
// ==============================

const moods = document.querySelectorAll(".mood");

moods.forEach((mood) => {

    mood.addEventListener("click", () => {

        moods.forEach((item) => {
            item.classList.remove("selected");
        });

        mood.classList.add("selected");

    });

});


// ==============================
// LOCK DIARY
// ==============================

lockBtn.addEventListener("click", () => {

    diaryDashboard.classList.remove("active");

    welcomeCard.classList.remove("hide");

    pinInput.value = "";

    errorMessage.textContent = "";

});


// ==============================
// NEW ENTRY MODAL
// ==============================

const newEntryBtn =
    document.getElementById("new-entry-btn");

const entryModal =
    document.getElementById("entry-modal");

const closeEntry =
    document.getElementById("close-entry");

const cancelEntry =
    document.getElementById("cancel-entry");


newEntryBtn.addEventListener("click", () => {

    entryModal.classList.add("active");

});


closeEntry.addEventListener("click", () => {

    entryModal.classList.remove("active");

});


cancelEntry.addEventListener("click", () => {

    entryModal.classList.remove("active");

});


// ==============================
// SAVE DIARY ENTRY
// ==============================

const entryTitle =
    document.getElementById("entry-title");

const entryText =
    document.getElementById("entry-text");

const saveEntry =
    document.getElementById("save-entry");

const entryMoods =
    document.querySelectorAll(".entry-mood");

const entriesContainer =
    document.getElementById("entries-container");

let selectedEntryMood = "😊";


// Entry mood selection

entryMoods.forEach((mood) => {

    mood.addEventListener("click", () => {

        entryMoods.forEach((item) => {
            item.classList.remove("selected");
        });

        mood.classList.add("selected");

        selectedEntryMood =
            mood.dataset.mood;

    });

});


// Save entry

saveEntry.addEventListener("click", () => {

    const title = entryTitle.value.trim();
    const text = entryText.value.trim();

    if (title === "" || text === "") {

        alert(
            "Please write something in your diary first 🌷"
        );

        return;

    }


    const newEntry = {

        id: Date.now(),

        title: title,

        text: text,

        mood: selectedEntryMood,

        date: new Date().toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        )

    };


    let entries =
        JSON.parse(
            localStorage.getItem("diaryEntries")
        ) || [];


    entries.unshift(newEntry);


    localStorage.setItem(
        "diaryEntries",
        JSON.stringify(entries)
    );


    displayEntry(newEntry);

    updateMoodHistory();
    entryTitle.value = "";

    entryText.value = "";


    entryMoods.forEach((mood) => {

        mood.classList.remove("selected");

    });


    selectedEntryMood = "😊";


    entryModal.classList.remove("active");

showToast("Memory saved to your diary! 💌");
createSaveSparkles();

});

// ==============================
// DISPLAY MEMORY
// ==============================

function displayEntry(entry) {

    const emptyState =
        document.querySelector(".empty-state");


    if (emptyState) {

        emptyState.remove();

    }


    const entryCard =
        document.createElement("div");


    entryCard.classList.add("memory-card");


    // Give the card its ID

    entryCard.dataset.id = entry.id;


    entryCard.innerHTML = `

        <div class="memory-top">

            <div class="memory-heading">

                <span class="memory-mood">
                    ${entry.mood}
                </span>

                <h4>
                    ${entry.title}
                </h4>

            </div>

            <div class="memory-actions">

            <span class="memory-date">
                ${entry.date}
            </span>
        
            <button
                class="favorite-memory"
                title="Favorite memory"
            >
                ♡
            </button>
        
            <button
                class="delete-memory"
                title="Delete memory"
            >
                🗑️
            </button>
        
        </div>
    `;


    // ==============================
    // OPEN FULL MEMORY
    // ==============================

    entryCard.addEventListener("click", (event) => {

        if (
            event.target.closest(".delete-memory")
        ) {

            return;

        }

        openMemory(entry);

    });


    // ==============================
    // DELETE MEMORY
    // ==============================

    const deleteButton =
        entryCard.querySelector(".delete-memory");


    deleteButton.addEventListener("click", (event) => {

        event.stopPropagation();

        deleteMemory(entry.id);

    });

    // ==============================
// FAVORITE MEMORY
// ==============================

const favoriteButton =
entryCard.querySelector(".favorite-memory");


let favorites =
JSON.parse(
    localStorage.getItem("favoriteMemories")
) || [];


// Check if already favorited

if (favorites.includes(entry.id)) {

favoriteButton.classList.add("favorited");

favoriteButton.textContent = "♥";

}


// Favorite button

favoriteButton.addEventListener("click", (event) => {

event.stopPropagation();


let favorites =
    JSON.parse(
        localStorage.getItem("favoriteMemories")
    ) || [];


if (favorites.includes(entry.id)) {

    // Remove favorite

    favorites = favorites.filter(
        (id) => id !== entry.id
    );

    favoriteButton.classList.remove(
        "favorited"
    );

    favoriteButton.textContent = "♡";


} else {

    // Add favorite

    favorites.push(entry.id);

    favoriteButton.classList.add(
        "favorited"
    );

    favoriteButton.textContent = "♥";


    if (typeof showToast === "function") {

        showToast(
            "Added to your favorite memories 💗"
        );

    }

}


localStorage.setItem(
    "favoriteMemories",
    JSON.stringify(favorites)
);

});

    entriesContainer.prepend(entryCard);

}


// ==============================
// LOAD SAVED MEMORIES
// ==============================

function loadEntries() {

    const savedEntries =
        JSON.parse(
            localStorage.getItem("diaryEntries")
        ) || [];


    savedEntries.forEach((entry) => {

        displayEntry(entry);

    });

}


loadEntries();


// ==============================
// DELETE MEMORY
// ==============================

function deleteMemory(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this little memory? 🌷"
    );


    if (!confirmDelete) {

        return;

    }


    let entries =
        JSON.parse(
            localStorage.getItem("diaryEntries")
        ) || [];


    entries = entries.filter((entry) => {

        return entry.id !== id;

    });


    localStorage.setItem(
        "diaryEntries",
        JSON.stringify(entries)
    );


    const card = document.querySelector(
        `.memory-card[data-id="${id}"]`
    );


    if (card) {

        card.remove();

    }


    if (entries.length === 0) {

        entriesContainer.innerHTML = `

            <div class="empty-state">

                <span>🌸</span>

                <p>
                    Your little memories will appear here...
                </p>

            </div>

        `;

    }

}



// ==============================
// FULL MEMORY VIEW
// ==============================

const memoryModal =
    document.getElementById("memory-modal");

const closeMemory =
    document.getElementById("close-memory");

const backMemory =
    document.getElementById("back-memory");

const fullMemoryDate =
    document.getElementById("full-memory-date");

const fullMemoryTitle =
    document.getElementById("full-memory-title");

const fullMemoryMood =
    document.getElementById("full-memory-mood");

const fullMemoryText =
    document.getElementById("full-memory-text");


// ==============================
// OPEN FULL MEMORY
// ==============================

function openMemory(entry) {

    fullMemoryDate.textContent =
        entry.date;

    fullMemoryTitle.textContent =
        entry.title;

    fullMemoryMood.textContent =
        entry.mood;

    fullMemoryText.textContent =
        entry.text;

    memoryModal.classList.add("active");

}


// ==============================
// CLOSE FULL MEMORY
// ==============================

function closeMemoryModal() {

    memoryModal.classList.remove("active");

}


closeMemory.addEventListener(
    "click",
    closeMemoryModal
);


backMemory.addEventListener(
    "click",
    closeMemoryModal
);

// ==============================
// MAGICAL FLOATING PARTICLES
// ==============================

const dayParticles = [
    "🌸",
    "🌷",
    "✿",
    "♡",
    "✧"
];

const nightParticles = [
    "✦",
    "✧",
    "⭐",
    "✨",
    "☾"
];


function createParticle() {

    const particle =
        document.createElement("div");

    particle.classList.add("floating-petal");


    const isNight =
        document.body.classList.contains("night-mode");


    const particles =
        isNight
            ? nightParticles
            : dayParticles;


    particle.textContent =
        particles[
            Math.floor(
                Math.random() * particles.length
            )
        ];


    particle.style.left =
        Math.random() * 100 + "vw";


    const size =
        Math.random() * 10 + 12;

    particle.style.fontSize =
        size + "px";


    const duration =
        Math.random() * 6 + 7;

    particle.style.animationDuration =
        duration + "s";


    document.body.appendChild(particle);


    setTimeout(() => {

        particle.remove();

    }, duration * 1000);

}


// Create particles

setInterval(createParticle, 1200);


// Create a new petal every 1.5 seconds


// ==============================
// TOAST MESSAGE
// ==============================

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toast-message");


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// ==============================
// SAVE SPARKLE BURST
// ==============================

function createSaveSparkles() {

    const symbols = [
        "✦",
        "✧",
        "♡",
        "✨",
        "🌸"
    ];

    for (let i = 0; i < 12; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.classList.add("save-sparkle");

        sparkle.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];


        const x =
            (Math.random() - 0.5) * 220;

        const y =
            (Math.random() - 0.5) * 180;


        sparkle.style.setProperty(
            "--x",
            `${x}px`
        );

        sparkle.style.setProperty(
            "--y",
            `${y}px`
        );


        sparkle.style.left =
            `${window.innerWidth / 2}px`;

        sparkle.style.top =
            `${window.innerHeight / 2}px`;


        document.body.appendChild(sparkle);


        setTimeout(() => {

            sparkle.remove();

        }, 900);

    }

}

// ==============================
// DAY / NIGHT THEME
// ==============================

const themeToggle =
    document.getElementById("theme-toggle");


function updateThemeButton() {

    if (document.body.classList.contains("night-mode")) {

        themeToggle.textContent = "☀️";

        themeToggle.title = "Switch to day mode";

    } else {

        themeToggle.textContent = "🌙";

        themeToggle.title = "Switch to night mode";

    }

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("night-mode");


    const isNight =
        document.body.classList.contains("night-mode");


    localStorage.setItem(
        "diaryTheme",
        isNight ? "night" : "day"
    );


    updateThemeButton();

});

// Load saved theme

const savedTheme =
    localStorage.getItem("diaryTheme");


if (savedTheme === "night") {

    document.body.classList.add("night-mode");

}


updateThemeButton();

// ==============================
// DAILY QUOTE
// ==============================

const dailyQuotes = [

    "You don't have to have everything figured out today. 🌷",

    "Small steps still count. ✨",

    "Today is a good day to be gentle with yourself. 🌸",

    "Your little moments matter too. 💌",

    "It's okay to take things one day at a time. ☁️",

    "There is something beautiful about simply being here. 🌷",

    "You are allowed to have slow days. 🦋",

    "Make today a little softer than yesterday. 🎀",

    "Keep going, little dreamer. ✨",

    "Even ordinary days can become lovely memories. 📖"


];


const dailyQuote =
    document.getElementById("daily-quote");


const todayKey =
    new Date().toDateString();


// Pick a consistent quote for the day

let quoteIndex = 0;

for (let i = 0; i < todayKey.length; i++) {

    quoteIndex += todayKey.charCodeAt(i);

}

quoteIndex =
    quoteIndex % dailyQuotes.length;


dailyQuote.textContent =
    dailyQuotes[quoteIndex];

  // ==============================
// COZY BACKGROUND SOUNDS
// ==============================

const soundToggle =
document.getElementById("sound-toggle");

let cozyAudio = null;
let soundPlaying = false;


// ==============================
// START COZY SOUND
// ==============================

function startCozySound() {

if (soundPlaying) {
    return;
}

cozyAudio = new Audio("audio/cozy-rain.mp3");

cozyAudio.loop = true;
cozyAudio.volume = 0.12;

cozyAudio.play()
    .then(() => {

        soundPlaying = true;

        soundToggle.textContent = "🎧";
        soundToggle.title = "Turn cozy sounds off";
        soundToggle.classList.add("active");

    })
    .catch((error) => {

        console.error(
            "Could not play cozy sound:",
            error
        );

        cozyAudio = null;
    });
}


// ==============================
// STOP COZY SOUND
// ==============================

function stopCozySound() {

if (!soundPlaying || !cozyAudio) {
    return;
}

cozyAudio.pause();
cozyAudio.currentTime = 0;

cozyAudio = null;

soundPlaying = false;

soundToggle.textContent = "🔇";
soundToggle.title = "Turn cozy sounds on";
soundToggle.classList.remove("active");
}


// ==============================
// TOGGLE SOUND
// ==============================

soundToggle.addEventListener("click", () => {

if (soundPlaying) {

    stopCozySound();

} else {

    startCozySound();

}

});


// ==============================
// MOOD GARDEN
// ==============================

function updateMoodHistory() {

    const moodHistory =
        document.getElementById("mood-history");

    if (!moodHistory) {
        return;
    }

    const entries =
        JSON.parse(
            localStorage.getItem("diaryEntries")
        ) || [];


    // No memories yet

    if (entries.length === 0) {

        moodHistory.innerHTML = `
            <div class="no-mood-history">
                🌱 Write a few memories first...
            </div>
        `;

        return;
    }


    const moods = {
        "🥰": 0,
        "😊": 0,
        "😌": 0,
        "🥺": 0,
        "😴": 0
    };


    // Count moods

    entries.forEach((entry) => {

        if (moods[entry.mood] !== undefined) {

            moods[entry.mood]++;

        }

    });


    const highest =
        Math.max(
            ...Object.values(moods),
            1
        );


    moodHistory.innerHTML = "";


    Object.entries(moods).forEach(
        ([mood, count]) => {

            const percentage =
                (count / highest) * 100;


            const row =
                document.createElement("div");

            row.className = "mood-stat";


            row.innerHTML = `

                <span class="mood-stat-emoji">
                    ${mood}
                </span>

                <div class="mood-bar">

                    <div
                        class="mood-bar-fill"
                        style="width: ${percentage}%"
                    ></div>

                </div>

                <span class="mood-count">
                    ${count}
                </span>

            `;


            moodHistory.appendChild(row);

        }
    );

}


// Show mood history when diary loads

updateMoodHistory();

// ==============================
// CUSTOM DIARY THEMES
// ==============================

const themePickerBtn =
    document.getElementById("theme-picker-btn");

const themePanel =
    document.getElementById("theme-panel");

const closeTheme =
    document.getElementById("close-theme");

const themeOptions =
    document.querySelectorAll(".theme-option");


// Open theme panel

themePickerBtn.addEventListener("click", () => {

    themePanel.classList.toggle("active");

});


// Close theme panel

closeTheme.addEventListener("click", () => {

    themePanel.classList.remove("active");

});


// Theme selection

themeOptions.forEach((option) => {

    option.addEventListener("click", () => {

        const selectedTheme =
            option.dataset.theme;


        // Remove old custom themes

        document.body.classList.remove(
            "theme-blossom",
            "theme-midnight",
            "theme-matcha",
            "theme-teddy",
            "theme-berry"
        );


        // Add selected theme

        document.body.classList.add(
            `theme-${selectedTheme}`
        );


        // Save theme

        localStorage.setItem(
            "diaryCustomTheme",
            selectedTheme
        );


        // Highlight selected option

        themeOptions.forEach((item) => {

            item.classList.remove(
                "selected"
            );

        });


        option.classList.add("selected");

    });

});


// Load saved custom theme

const savedCustomTheme =
    localStorage.getItem(
        "diaryCustomTheme"
    );


if (savedCustomTheme) {

    document.body.classList.add(
        `theme-${savedCustomTheme}`
    );


    themeOptions.forEach((option) => {

        if (
            option.dataset.theme ===
            savedCustomTheme
        ) {

            option.classList.add(
                "selected"
            );

        }

    });

}

// ==============================
// ✨ LOADING SCREEN
// ==============================

const loadingScreen =
    document.getElementById("loading-screen");


// Wait for the page to finish loading

window.addEventListener("load", () => {

    setTimeout(() => {

        loadingScreen.classList.add("hide");

    }, 1800);

});

// ==============================
// 📅 MEMORY CALENDAR
// ==============================

const calendarDays =
    document.getElementById("calendar-days");

const calendarMonth =
    document.getElementById("calendar-month");

const previousMonth =
    document.getElementById("prev-month");

const nextMonth =
    document.getElementById("next-month");


let calendarDate = new Date();


// ==============================
// GET SAVED MEMORIES
// ==============================

function getCalendarEntries() {

    return JSON.parse(
        localStorage.getItem("diaryEntries")
    ) || [];

}


// ==============================
// CREATE DATE KEY
// ==============================

function getDateKey(date) {

    return date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}


// ==============================
// RENDER CALENDAR
// ==============================

function renderCalendar() {

    if (!calendarDays || !calendarMonth) {
        return;
    }


    const year =
        calendarDate.getFullYear();

    const month =
        calendarDate.getMonth();


    calendarMonth.textContent =
        calendarDate.toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );


    calendarDays.innerHTML = "";


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const entries =
        getCalendarEntries();


    // ==============================
    // EMPTY DAYS
    // ==============================

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.classList.add(
            "calendar-day",
            "empty"
        );

        calendarDays.appendChild(
            empty
        );

    }


    // ==============================
    // CREATE DAYS
    // ==============================

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dayButton =
            document.createElement("button");


        dayButton.classList.add(
            "calendar-day"
        );


        dayButton.textContent =
            day;


        const currentDate =
            new Date(
                year,
                month,
                day
            );


        const dateKey =
            getDateKey(currentDate);


        // Check for memories

        const dayEntries =
            entries.filter(
                (entry) =>
                    entry.date === dateKey
            );


        const hasMemory =
            dayEntries.length > 0;


        if (hasMemory) {

            dayButton.classList.add(
                "has-memory"
            );

        }


        // ==============================
        // HIGHLIGHT TODAY
        // ==============================

        const today =
            new Date();


        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            dayButton.classList.add(
                "today"
            );

        }


        // ==============================
        // CLICK DAY
        // ==============================

        dayButton.addEventListener(
            "click",
            () => {

                if (!hasMemory) {
                    return;
                }


                if (dayEntries.length === 1) {

                    openMemory(
                        dayEntries[0]
                    );

                } else {

                    openDayMemories(
                        dateKey,
                        dayEntries
                    );

                }

            }
        );


        // IMPORTANT:
        // Add the day to the calendar

        calendarDays.appendChild(
            dayButton
        );

    }

}


// ==============================
// PREVIOUS MONTH
// ==============================

if (previousMonth) {

    previousMonth.addEventListener(
        "click",
        () => {

            calendarDate.setMonth(
                calendarDate.getMonth() - 1
            );

            renderCalendar();

        }
    );

}


// ==============================
// NEXT MONTH
// ==============================

if (nextMonth) {

    nextMonth.addEventListener(
        "click",
        () => {

            calendarDate.setMonth(
                calendarDate.getMonth() + 1
            );

            renderCalendar();

        }
    );

}


// ==============================
// INITIAL CALENDAR
// ==============================

renderCalendar();


// ==============================
// 💌 MULTIPLE DAY MEMORIES
// ==============================

function openDayMemories(
    dateKey,
    dayEntries
) {

    const memoryList =
        dayEntries
            .map((entry) => {

                return `
                    <button
                        class="day-memory-item"
                        data-memory-id="${entry.id}"
                    >

                        <span>
                            ${entry.mood}
                        </span>

                        <strong>
                            ${entry.title}
                        </strong>

                    </button>
                `;

            })
            .join("");


    const modal =
        document.createElement("div");


    modal.className =
        "day-memories-modal";


    modal.innerHTML = `

        <div class="day-memories-box">

            <button
                class="close-day-memories"
            >
                ×
            </button>


            <div class="day-memory-heading">

                <span>🌷</span>

                <p>
                    Little memories
                </p>

                <h3>
                    ${dateKey}
                </h3>

            </div>


            <div class="day-memory-list">

                ${memoryList}

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    // Close popup

    const closeButton =
        modal.querySelector(
            ".close-day-memories"
        );


    closeButton.addEventListener(
        "click",
        () => {

            modal.remove();

        }
    );


    // Open selected memory

    const memoryButtons =
        modal.querySelectorAll(
            ".day-memory-item"
        );


    memoryButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.memoryId
                        );


                    const selectedMemory =
                        dayEntries.find(
                            (entry) =>
                                entry.id === id
                        );


                    modal.remove();


                    if (selectedMemory) {

                        openMemory(
                            selectedMemory
                        );

                    }

                }
            );

        }
    );

}

// ==============================
// 💌 MEMORY CAPSULE MODAL
// ==============================

const openCapsuleBtn =
    document.getElementById("open-capsule-btn");

const capsuleModal =
    document.getElementById("capsule-modal");

const closeCapsuleBtn =
    document.getElementById("close-capsule");


// OPEN CAPSULE

openCapsuleBtn.addEventListener(
    "click",
    () => {

        capsuleModal.classList.add("active");

    }
);


// CLOSE CAPSULE

closeCapsuleBtn.addEventListener(
    "click",
    () => {

        capsuleModal.classList.remove("active");

    }
);

// ==============================
// 💌 SAVE MEMORY CAPSULE
// ==============================

const capsuleTitle =
    document.getElementById("capsule-title");

const capsuleMessage =
    document.getElementById("capsule-message");

const capsuleDate =
    document.getElementById("capsule-date");

const saveCapsule =
    document.getElementById("save-capsule");


saveCapsule.addEventListener(
    "click",
    () => {

        const title =
            capsuleTitle.value.trim();

        const message =
            capsuleMessage.value.trim();

        const unlockDate =
            capsuleDate.value;


        // Check fields

        if (
            title === "" ||
            message === "" ||
            unlockDate === ""
        ) {

            alert(
                "Please fill in everything before sealing your capsule 💌"
            );

            return;

        }


        // Prevent past dates

        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );


        const selectedDate =
            new Date(
                unlockDate + "T00:00:00"
            );


        if (selectedDate < today) {

            alert(
                "Choose a future date for your capsule 🌷"
            );

            return;

        }


        // Create capsule

        const capsule = {

            id: Date.now(),

            title: title,

            message: message,

            unlockDate: unlockDate,

            createdAt:
                new Date().toISOString()

        };


        // Get existing capsules

        let capsules =
            JSON.parse(
                localStorage.getItem(
                    "memoryCapsules"
                )
            ) || [];


        capsules.push(capsule);


        // Save

        localStorage.setItem(
            "memoryCapsules",
            JSON.stringify(capsules)
        );


        // Clear fields

        capsuleTitle.value = "";

        capsuleMessage.value = "";

        capsuleDate.value = "";


        // Close modal

        capsuleModal.classList.remove(
            "active"
        );


        // Cute confirmation

        if (
            typeof showToast === "function"
        ) {

            showToast(
                "Your memory capsule is sealed! 🔐💌"
            );

        } else {

            alert(
                "Your memory capsule is sealed! 🔐💌"
            );

        }

    }
);

// ==============================
// 🔐 DISPLAY SEALED CAPSULES
// ==============================

const capsulesContainer =
    document.getElementById("capsules-container");


// ==============================
// 🔓 MEMORY CAPSULE UNLOCK SYSTEM
// ==============================

function loadCapsules() {

    if (!capsulesContainer) {
        return;
    }

    const capsules =
        JSON.parse(
            localStorage.getItem("memoryCapsules")
        ) || [];

    if (capsules.length === 0) {

        capsulesContainer.innerHTML = `
            <div class="empty-capsules">
                <span>💌</span>
                <p>
                    Your sealed messages will appear here...
                </p>
            </div>
        `;

        return;
    }

    capsulesContainer.innerHTML = "";

    capsules.forEach((capsule) => {

        const capsuleCard =
            document.createElement("div");

        capsuleCard.classList.add(
            "sealed-capsule"
        );

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const unlockDate =
            new Date(
                capsule.unlockDate +
                "T00:00:00"
            );

        const isUnlocked =
            today >= unlockDate;

        const formattedDate =
            unlockDate.toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );


        // ==============================
        // 🔓 UNLOCKED CAPSULE
        // ==============================

        if (isUnlocked) {

            capsuleCard.classList.add(
                "capsule-unlocked"
            );

            capsuleCard.innerHTML = `

                <div class="sealed-capsule-icon">
                    💌
                </div>

                <div class="sealed-capsule-info">

                    <h4>
                        ${capsule.title}
                    </h4>

                    <p>
                        ✨ Your capsule is ready to open!
                    </p>

                </div>

                <span class="sealed-capsule-status">
                    OPEN
                </span>

            `;


            capsuleCard.addEventListener(
                "click",
                () => {

                    openCapsuleMessage(
                        capsule
                    );

                }
            );


        // ==============================
        // 🔐 LOCKED CAPSULE
        // ==============================

        } else {

            capsuleCard.innerHTML = `

                <div class="sealed-capsule-icon">
                    🔐
                </div>

                <div class="sealed-capsule-info">

                    <h4>
                        ${capsule.title}
                    </h4>

                    <p>
                        Sealed until
                        <strong>
                            ${formattedDate}
                        </strong>
                    </p>

                </div>

                <span class="sealed-capsule-status">
                    LOCKED
                </span>

            `;

        }


        capsulesContainer.appendChild(
            capsuleCard
        );

    });

}


// ==============================
// 💌 OPEN CAPSULE MESSAGE
// ==============================

function openCapsuleMessage(capsule) {

    const modal =
        document.createElement("div");

    modal.className =
        "capsule-message-modal";

    modal.innerHTML = `

        <div class="capsule-message-box">

            <button
                class="close-capsule-message"
            >
                ×
            </button>

            <div class="capsule-message-icon">
                💌
            </div>

            <p class="capsule-message-label">
                A message from your past self ✨
            </p>

            <h3>
                ${capsule.title}
            </h3>

            <div class="capsule-message-content">
                ${capsule.message}
            </div>

            <p class="capsule-message-date">
                Sealed with love 🌷
            </p>

        </div>

    `;


    document.body.appendChild(modal);


    // Close button

    const closeButton =
        modal.querySelector(
            ".close-capsule-message"
        );


    closeButton.addEventListener(
        "click",
        () => {

            modal.remove();

        }
    );


    // Close when clicking outside

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                modal.remove();

            }

        }
    );

}


// Load capsules

loadCapsules();

// ==============================
// 🔐 PIN SETUP
// ==============================

const pinSetup =
    document.getElementById("pin-setup");

const newPin =
    document.getElementById("new-pin");

const confirmPin =
    document.getElementById("confirm-pin");

const createPinBtn =
    document.getElementById("create-pin-btn");

const pinSetupError =
    document.getElementById("pin-setup-error");


// Create PIN

createPinBtn.addEventListener(
    "click",
    () => {

        const pin =
            newPin.value.trim();

        const confirmedPin =
            confirmPin.value.trim();


        // Check PIN length

        if (pin.length < 4) {

            pinSetupError.textContent =
                "Your PIN must be at least 4 digits 🌷";

            return;

        }


        // Numbers only

        if (!/^\d+$/.test(pin)) {

            pinSetupError.textContent =
                "Please use numbers only 🔐";

            return;

        }


        // Check matching PINs

        if (pin !== confirmedPin) {

            pinSetupError.textContent =
                "The PINs don't match. Try again 💗";

            return;

        }


        // Save PIN

        localStorage.setItem(
            "bloomVaultPin",
            pin
        );


        savedPin = pin;


        // Clear inputs

        newPin.value = "";
        confirmPin.value = "";


        pinSetupError.textContent =
            "";


        // Hide setup

        pinSetup.classList.add(
            "hide"
        );


        // Show welcome screen

        if (welcomeCard) {

            welcomeCard.classList.remove(
                "hide"
            );

        }

    }
);
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdwW1ZXKkPnOUKKGlDFt_NsMl1ygPW1-O2fs76WD-wsopqyKL56XrDqwAd5Rh6LcsnS9Pie5O_Vp8H/pub?gid=0&single=true&output=csv";
let hg = [];

const day = document.querySelector(".calendar-dates");

const currdate = document
    .querySelector(".calendar-current-date");

const prenexIcons = document
    .querySelectorAll(".calendar-navigation span");

// Array of month names
const months = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec"
];

// Function to generate the calendar
const manipulate = (highlights) => {
    hg = highlights;
    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay() - 1;

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay() - 1;

    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    // Variable to store the generated calendar HTML
    let lit = "";

    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        let isType =
            highlights.includes(`${month === 0 ? year - 1 : year}-${String(((month + 11) % 12) + 1).padStart(2, "0")}-${String(monthlastdate - i + 1).padStart(2, "0")}`)
                ? "booked inactive" : "inactive";

        lit +=
            `<li class="${isType}">${monthlastdate - i + 1}</li>`;
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
        // Check if the current date is today
        let isToday = "";
        if (i === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear())
            isToday = "active"
        else if (highlights.includes(`${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`))
            isToday = "booked"

        lit += `<li class="${isToday}">${i}</li>`;
    }

    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
        let isType =
            highlights.includes(`${month === 11 ? year + 1 : year}-${String(((month + 1) % 12) + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`)
                ? "booked inactive" : "inactive";

        lit += `<li class="${isType}">${i - dayend + 1}</li>`
    }

    // Update the text of the current date element
    // with the formatted current month and year
    currdate.innerText = `${months[month]} ${year}`;

    // update the HTML of the dates element
    // with the generated calendar
    day.innerHTML = lit;
}

// Attach a click event listener to each icon
prenexIcons.forEach(icon => {

    // When an icon is clicked
    icon.addEventListener("click", () => {

        // Check if the icon is "calendar-prev"
        // or "calendar-next"
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;

        // Check if the month is out of range
        if (month < 0 || month > 11) {

            // Set the date to the first day of the
            // month with the new year
            date = new Date(year, month, new Date().getDate());

            // Set the year to the new year
            year = date.getFullYear();

            // Set the month to the new month
            month = date.getMonth();
        } else {

            // Set the date to the current date
            date = new Date();
        }

        // Call the manipulate function to
        // update the calendar display
        manipulate(hg);
    });
});

fetch(sheetUrl)
    .then(response => response.text())
    .then(csvData => {
        const rows = csvData.split("\n").map(row => row.split(","));
        const highlights = rows.reduce((acc, [date, mark]) => {
            if (mark.trim() === "X") acc.push(date.trim());
            return acc;
        }, []);

        manipulate(highlights);
    })
    .catch(error => console.error("Error fetching the data:", error));
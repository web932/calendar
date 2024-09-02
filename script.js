const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const today = new Date();
const currentYear = 2024;
let currentMonth = today.getMonth();
const startDay = today.getDate();

const clickSound = document.getElementById('click-sound');

function createCalendar(month) {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    const monthDiv = document.createElement('div');
    monthDiv.className = 'month';
    monthDiv.innerHTML = `<h3>${months[month]} ${currentYear}</h3>`;

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].forEach(day => {
        const th = document.createElement('th');
        th.innerText = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    const startDayOfWeek = new Date(currentYear, month, 1).getDay();
    const days = daysInMonth[month];
    let row = document.createElement('tr');
    for (let j = 0; j < startDayOfWeek; j++) {
        row.appendChild(document.createElement('td'));
    }
    for (let day = 1; day <= days; day++) {
        const cell = document.createElement('td');
        cell.innerText = day;
        if (month === currentMonth && day === startDay) {
            cell.className = 'today';
        }
        cell.addEventListener('click', () => {
            clickSound.play();
        });
        row.appendChild(cell);
        if ((startDayOfWeek + day) % 7 === 0) {
            table.appendChild(row);
            row = document.createElement('tr');
        }
    }
    table.appendChild(row);
    monthDiv.appendChild(table);
    calendar.appendChild(monthDiv);

    updateNavigationButtons();
}

function updateNavigationButtons() {
    document.getElementById('prev-month').disabled = currentMonth === 0;
    document.getElementById('next-month').disabled = currentMonth === 11;
}

function showMonth(month) {
    if (month >= 0 && month <= 11) {
        currentMonth = month;
        createCalendar(month);
    }
}

document.getElementById('prev-month').addEventListener('click', () => {
    if (currentMonth > 0) {
        showMonth(currentMonth - 1);
    }
});

document.getElementById('next-month').addEventListener('click', () => {
    if (currentMonth < 11) {
        showMonth(currentMonth + 1);
    }
});

// Initialize with the current month
createCalendar(currentMonth);

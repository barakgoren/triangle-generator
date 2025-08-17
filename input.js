
document.addEventListener('DOMContentLoaded', function () {
    setupFormSubmission();
});

function setupFormSubmission() {
    const form = document.getElementById('triangle-form');
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault();
    const triangleData = getTrianglePointsFromForm();
    navigateToDisplayPage(triangleData);
}

function getTrianglePointsFromForm() {
    return {
        ax: document.getElementById('ax').value || 0,
        ay: document.getElementById('ay').value || 0,
        bx: document.getElementById('bx').value || 100,
        by: document.getElementById('by').value || 0,
        cx: document.getElementById('cx').value || 50,
        cy: document.getElementById('cy').value || 100
    };
}

function navigateToDisplayPage(data) {
    const url = `display.html?ax=${data.ax}&ay=${data.ay}&bx=${data.bx}&by=${data.by}&cx=${data.cx}&cy=${data.cy}`;
    window.location.href = url;
}

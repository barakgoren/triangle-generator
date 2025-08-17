let trianglePoints = {};
let triangleAngles = {};
let canvas, ctx;

document.addEventListener('DOMContentLoaded', function () {
    initializeDisplayPage();
});

function initializeDisplayPage() {
    setupCanvas();
    getTriangleDataFromURL();
    calculateAllAngles();
    drawTriangleOnCanvas();
}

function setupCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
}

// Parse URL parameters to get triangle coordinates
function getTriangleDataFromURL() {
    const urlParams = new URLSearchParams(window.location.search);

    // Have default values from submission so no need to cover empty cases here
    trianglePoints = {
        A: {
            x: parseFloat(urlParams.get('ax')),
            y: parseFloat(urlParams.get('ay'))
        },
        B: {
            x: parseFloat(urlParams.get('bx')),
            y: parseFloat(urlParams.get('by'))
        },
        C: {
            x: parseFloat(urlParams.get('cx')),
            y: parseFloat(urlParams.get('cy'))
        }
    };
}

// Use law of cosines to calculate all triangle angles
function calculateAllAngles() {
    const sideA = getDistance(trianglePoints.B, trianglePoints.C);
    const sideB = getDistance(trianglePoints.A, trianglePoints.C);
    const sideC = getDistance(trianglePoints.A, trianglePoints.B);

    const cosA = (sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC);
    triangleAngles.A = Math.acos(cosA) * (180 / Math.PI);

    const cosB = (sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC);
    triangleAngles.B = Math.acos(cosB) * (180 / Math.PI);

    const cosC = (sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB);
    triangleAngles.C = Math.acos(cosC) * (180 / Math.PI);
}

function getDistance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function drawTriangleOnCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const canvasPoints = convertPointsToCanvas();

    drawTriangleShape(canvasPoints);
    drawCornerPoints(canvasPoints);
    writeAngleValuesOnCanvas(canvasPoints);
}

// Making sure the triangle fits within the canvas
function convertPointsToCanvas() {
    const minX = Math.min(trianglePoints.A.x, trianglePoints.B.x, trianglePoints.C.x);
    const maxX = Math.max(trianglePoints.A.x, trianglePoints.B.x, trianglePoints.C.x);
    const minY = Math.min(trianglePoints.A.y, trianglePoints.B.y, trianglePoints.C.y);
    const maxY = Math.max(trianglePoints.A.y, trianglePoints.B.y, trianglePoints.C.y);

    const width = maxX - minX;
    const height = maxY - minY;

    const padding = 100;
    const availableSpace = 800 - (2 * padding);
    let scale = Math.min(availableSpace / width, availableSpace / height);

    if (scale > 3) scale = 3;
    if (width === 0 || height === 0) scale = 1;

    return {
        A: {
            x: padding + (trianglePoints.A.x - minX) * scale,
            y: padding + (trianglePoints.A.y - minY) * scale
        },
        B: {
            x: padding + (trianglePoints.B.x - minX) * scale,
            y: padding + (trianglePoints.B.y - minY) * scale
        },
        C: {
            x: padding + (trianglePoints.C.x - minX) * scale,
            y: padding + (trianglePoints.C.y - minY) * scale
        }
    };
}

function drawTriangleShape(points) {
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';

    ctx.beginPath();
    ctx.moveTo(points.A.x, points.A.y);
    ctx.lineTo(points.B.x, points.B.y);
    ctx.lineTo(points.C.x, points.C.y);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
}

function drawCornerPoints(points) {
    drawSinglePoint(points.A, 'A', '#e74c3c');
    drawSinglePoint(points.B, 'B', '#27ae60');
    drawSinglePoint(points.C, 'C', '#f39c12');
}

function drawSinglePoint(point, label, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(label, point.x, point.y - 15);
}

// Show angles inside the triangle, positioned towards each vertex
function writeAngleValuesOnCanvas(points) {
    const centerX = (points.A.x + points.B.x + points.C.x) / 3;
    const centerY = (points.A.y + points.B.y + points.C.y) / 3;

    const offsetA_X = (points.A.x - centerX) * 0.7;
    const offsetA_Y = (points.A.y - centerY) * 0.7;
    ctx.fillText(`A: ${triangleAngles.A.toFixed(1)}`, centerX + offsetA_X, centerY + offsetA_Y);

    const offsetB_X = (points.B.x - centerX) * 0.7;
    const offsetB_Y = (points.B.y - centerY) * 0.7;
    ctx.fillText(`B: ${triangleAngles.B.toFixed(1)}`, centerX + offsetB_X, centerY + offsetB_Y);

    const offsetC_X = (points.C.x - centerX) * 0.7;
    const offsetC_Y = (points.C.y - centerY) * 0.7;
    ctx.fillText(`C: ${triangleAngles.C.toFixed(1)}`, centerX + offsetC_X, centerY + offsetC_Y);
}

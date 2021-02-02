const pillars = [];
const wrapper = document.getElementById('wrapper');

function drawCopy(b) {
    const div = document.getElementById('div');
    b.sort((a, b) => a.value - b.value);
    b.forEach(pillar => {
        console.log('child added');
        div.appendChild(pillar);
    });
}

function draw() {
    document.body.appendChild(wrapper);
    pillars.forEach(pillar => wrapper.appendChild(pillar));
}

function sleep(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(i, j) {
    pillars[pillars.length - 1].style.backgroundColor = 'gray'; 
    pillars[j].style.backgroundColor = 'gray';
    let temp = pillars[i];
    pillars[i] = pillars[j];
    pillars[j] = temp;
    pillars[j].style.backgroundColor = 'green';
    draw();
}

async function sort() {
    for (let i = 0; i < pillars.length; i++) {
        let minIdx = i;
        pillars[i].style.backgroundColor = 'aqua';
        for (let j = i + 1; j < pillars.length; j++) {
            pillars[j].style.backgroundColor = 'yellow';
            if (j - 1 !== i && minIdx !== j - 1)
                pillars[j - 1].style.backgroundColor = 'gray';

            if (pillars[minIdx].value > pillars[j].value) {
                if (minIdx !== i) pillars[minIdx].style.backgroundColor = 'gray';
                minIdx = j;
                pillars[minIdx].style.backgroundColor = 'greenyellow';
            }
            await sleep();
        }
        await swap(minIdx, i);
    }
}

function createPillar(value, wrapper) {
    const pillar = document.createElement("div");
    pillar.style.height = `${2 * value}`;
    pillar.style.width = "30px";
    pillar.style.backgroundColor = "gray";
    pillar.style.border = "1px solid black";
    pillar.style.marginLeft = "2px";
    pillar.value = value;
    if (wrapper) wrapper.appendChild(pillar);
    return pillar;
}

function randInt(min = 8, max = 70) {
    return min + Math.floor((max - min) * Math.random());
}

async function build() {
    const b = [];
    for (let i = 0; i < 20; i++) {
        const rand = randInt();
        pillars.push(createPillar(rand, wrapper));
        b.push(createPillar(rand));
    }
    drawCopy(b);
}

document.getElementById('build').onclick = build;
document.getElementById('sort').onclick = sort;
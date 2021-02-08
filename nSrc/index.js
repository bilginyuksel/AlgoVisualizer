const pillars = [];
const wrapper = document.getElementById('wrapper');

class SelectionSort extends AlgoRunner {

    constructor(divId) {
        super();
        this.container = document.getElementById(divId);
    }

    // Preparation step of the algorithm
    prepare() {
        
    }

    addColorStep(index, color) {
        const step = new Step('colorize', 
            {
                'index': index,
                'color': color
            });
        this.steps.push(step);
    }

    addSwapStep(firstIdx, secondIdx) {
        const step = new Step('swap', 
            {
                'firstIndex': firstIdx,
                'secondIndex': secondIdx
            });
        this.steps.push(step);
    }

    async buildSteps(p) {
        this.pillars = p.slice();

        for(let i=0; i<p.length; i++) {
            let minIdx = i;
            this.addColorStep(i, 'aqua');
            for(let j=i+1; j<p.length; j++) {
                this.addColorStep(j, 'yellow');

                if(j-1 !== i && minIdx !== j - 1)
                    this.addColorStep(j-1, 'gray');

                if(p[minIdx].value > p[j].value) {
                    if(minIdx !== i) this.addColorStep(minIdx, 'gray');
                    minIdx = j;
                    this.addColorStep(minIdx, 'greenyellow');
                }
                this.steps.push(new Step('sleep'));
            }
            this.addSwapStep(minIdx, i);
            // and also swap exactly
            const temp = p[minIdx];
            p[minIdx] = p[i];
            p[i] = temp;
        } 

        console.log(JSON.stringify(this.steps));
    }

    async executeStep(type, params) {
        if(type == 'colorize') {
            this.setBackgroundColor(params['index'], params['color']); 
        } else if(type == 'swap') {
            this.swap(params['firstIndex'], params['secondIndex']);
        } else {
            if(this.canSleep)
                await utils.sleep();
        }
        this.currentStep++;
    }

    swap(i, j) {
        this.setBackgroundColor(this.pillars.length - 1, 'gray');
        this.setBackgroundColor( j, 'gray');
        const temp = this.pillars[i];
        this.pillars[i] = this.pillars[j];
        this.pillars[j] = temp;
        this.setBackgroundColor(j, 'green');
        // Draw again to show replacement to user.
        
        this.render();
    }

    setBackgroundColor(index, color) {
        this.pillars[index].style.backgroundColor = color;
    }

    render() {
        document.body.appendChild(this.container);
        this.pillars.forEach(pillar => this.container.appendChild(pillar));
    }
}

// const selectionSort = new SelectionSort('wrapper');
// selectionSort.buildSteps(getRandomPillars())
// selectionSort.play();

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
            await utils.sleep();
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
    pillar.innerHTML = `${value}`;
    pillar.style.marginLeft = "2px";
    pillar.value = value;
    if (wrapper) wrapper.appendChild(pillar);
    return pillar;
}

function getRandomPillars() {
    const p = [];
    for(let i=0; i<20; i++) {
        const rand = utils.randInt();
        p.push(createPillar(rand));
    }
    return p;
}

async function build() {
    const b = [];
    for (let i = 0; i < 20; i++) {
        const rand = utils.randInt();
        pillars.push(createPillar(rand, wrapper));
        b.push(createPillar(rand));
    }
    drawCopy(b);
}

document.getElementById('build').onclick = build;
document.getElementById('sort').onclick = sort;

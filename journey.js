const road = document.getElementById('road');
const journey = document.getElementsByClassName('journey')[0];
const tutorial = document.getElementsByClassName('tutorial')[0];

let canscroll = false

let dist = 2
const boards = [-0, -3, -7, -11]
document.body.style = `--dist: ${dist};`

function showtuto() {
    console.log(true);
    tutorial.offsetHeight;
    tutorial.style.display = 'block'
    setTimeout(() => {

        document.addEventListener('click', () => {
            tutorial.style.display = 'none'

        }, { once: true })
    }, 10);
}


function prevRoad() {
    if (canscroll && dist < 2) {

        road.style = '--rd-dist: 100%;'
        dist += 0.5
        updatecp(1)

        dist += 0.5

        road.classList.remove('go-road')
        road.offsetHeight
        road.classList.add('go-road')
        updatecp()
        canscroll = false;
        setTimeout(() => { canscroll = true }, 900)
    }
}


function nextRoad() {
    if (canscroll && dist > -14) {

        road.style = '--rd-dist: -0%;'
        dist -= 0.5
        updatecp()

        dist -= 0.5

        road.classList.remove('go-road')
        road.offsetHeight
        road.classList.add('go-road')
        updatecp(1)
        canscroll = false;
        setTimeout(() => { canscroll = true }, 900)
    }
}

function updatecp(offset = 0) {
    console.log('update');


    if (boards.includes(dist + offset)) {
        journey.style = `--road-side: 0; `


        requestAnimationFrame(() => {
            journey.style.perspective = window.innerWidth < 768 ? '300px' : '400px'
        })
        setTimeout(e => {
            console.log('up');

            journey.style.perspective = window.innerWidth < 768 ? '400px' : '500px'

        }, 500)
    }
    let points = [...document.getElementsByClassName('cp'), ...document.getElementsByClassName('overhead-sign')]

    for (const ele of points) {

        let pos = window.getComputedStyle(ele).getPropertyValue('--pos').trim();
        key = dist - - pos

        if (key < 4) {
            ele.style.opacity = 1

        } else if (key > 3) {
            ele.style.opacity = 0

        }
        if (key == 0) {
            ele.classList.add('cp-read')
            console.log(window.getComputedStyle(ele).getPropertyValue('--side') || 0);

            journey.style = `--road-side:${window.getComputedStyle(ele).getPropertyValue('--side') || 0}; `


        } else if (key == 1) {
            ele.classList.remove('cp-read')


        } else if (key == -1) {

            ele.classList.remove('cp-read')

        }


    }
    document.body.style = `--dist: ${dist};`

}

function disableUserScroll() {
    document.body.style.overflow = 'hidden'; // Disable scrollbars
    document.addEventListener('touchmove', preventDefault, { passive: false });
    document.addEventListener('wheel', preventDefault, { passive: false });
}

function preventDefault(e) {
    e.preventDefault();
}

window.addEventListener('load', () => {

    window.scrollTo(0, document.body.scrollHeight);
    disableUserScroll()
    nextRoad()

    updatecp()

    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        document.addEventListener('wheel', e => {
            if (canscroll) {

                if (e.deltaY === 100) {
                    nextRoad()
                } else if (e.deltaY === -100) {
                    prevRoad()
                }
                // console.log(dist);
                canscroll = false;
                setTimeout(() => { canscroll = true }, 900)

            }
        })

        document.addEventListener('keydown', e => {
            console.log(e);

            if (canscroll) {

                if (e.code === 'ArrowUp') {
                    nextRoad()
                } else if (e.code === 'ArrowDown') {
                    prevRoad()
                }
                // console.log(dist);
                canscroll = false;
                setTimeout(() => { canscroll = true }, 900)

            }
        })

        setTimeout(() => { journey.style.overflow = 'hidden'; canscroll = true }, 1000)


    }, 100)


})

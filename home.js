const type = document.querySelector('.hero .content > p') || document.createElement('div')

const elements = ['.about>h1', '.bio>p', '.about>.skills>h1', '.skills>div>h2', '.ico>div', '.serv>h1']
const skills = document.querySelectorAll('.skill')
console.log(type);

const words = ["Web Developer.", "Frontend Designer.", "Student."]
typeintro()

async function typeintro() {
    const getRandomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    while (true) {
        for (const word of words) {

            for (const letter of word) {
                await wait(getRandomDelay(50, 100));
                type.textContent += letter;
            }

            await wait(500);


            type.classList.add('typed');
            await wait(2000);
            type.classList.remove('typed');


            for (let i = 0; i < word.length; i++) {
                await wait(getRandomDelay(50, 100));
                type.textContent = type.textContent.slice(0, -1);
            }

            await wait(500);
        }
    }
}


function wait(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, sec);
    })
}


const observer = new IntersectionObserver(applyAnimation, { threshold: 0.8 })

function applyAnimation(entries, observer) {
    entries.forEach(async function (entry) {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill')) {
                await wait(1000)
                entry.target.classList.add('aniskill')
            } else {

                console.log("Element is in view:", entry.target, entry.target.dataset.animation);
                entry.target.style.animation = `${entry.target.dataset.animation} 1s ease forwards`
            }
            observer.unobserve(entry.target);
        }
    });

}


elements.forEach(e => {

    document.querySelectorAll(e).forEach(ele => {

        observer.observe(ele)
    })

})

skills.forEach(e => {


    observer.observe(e)
})


document.querySelectorAll('.project').forEach(project => {


    let t1 = project.getElementsByClassName('top')[0].offsetHeight

    const more = project.getElementsByClassName('more')[0]
    more.style.height = '100%'
    let t2 = more.offsetHeight
    more.style.height = ''
    project.style = `--fill-mar: ${t1 - t2};`
})




const wrap = document.getElementById('wrap');
const topImg = document.getElementById('top');
const dot = document.getElementById('dot');

let size = 200;

let HACKER_STATE = {
    on() {
        document.documentElement.setAttribute('data-theme', 'hacker')
    },

    off() {
        document.documentElement.setAttribute('data-theme', 'normal')
    }
}

/* build a clip-path string based on current shape, mouse x/y */
/* build a clip-path string based on current shape, mouse x/y */
function getClip(x, y, r) {
    return `circle(${r}px at ${x}px ${y}px)`;
}

let currentR = 0;
let targetR = 0;
let mx = 0;
let my = 0;

function lerp(a, b, t) { return a + (b - a) * t; }

function loop() {
    currentR = lerp(currentR, targetR, 0.15);  // 0.15 = speed, lower = slower
    topImg.style.clipPath = `circle(${currentR.toFixed(2)}px at ${mx} ${my})`;
    requestAnimationFrame(loop);
}

loop();

function clip(x, y, r, unit = 'px') {
    mx = x + unit
    my = y + unit
    targetR = r
}



wrap.addEventListener('mousemove', e => {

    const rc = wrap.getBoundingClientRect();
    const x = e.clientX - rc.left;
    const y = e.clientY - rc.top;

    topImg.style.transition = 'none';

    clip(x, y, size)

    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    wrap.classList.add('on');
    HACKER_STATE.on()
});

wrap.addEventListener('mouseleave', e => {
    const rc = wrap.getBoundingClientRect();
    const x = e.clientX - rc.left;
    const y = e.clientY - rc.top;

    clip(x, y, 0)


    wrap.classList.remove('on');
    HACKER_STATE.off()
});




const wait = ms => new Promise(r => setTimeout(r, ms));

async function autoReveal() {

    HACKER_STATE.on()

    clip(70, 18, 1000, '%')
    await wait(3000)
    clip(70, 18, 0, '%')

    HACKER_STATE.off()

    await wait(8000)

    HACKER_STATE.on()

    clip(18, 70, 1000, '%')
    await wait(3000)
    clip(18, 70, 0, '%')

    HACKER_STATE.off()

}

setInterval(autoReveal, 8000)

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?';

async function glitchText(ele) {
    ele.style.opacity = 0
    const target = ele.textContent
    const maxIter = 8
    ele.style.minWidth = (target.length + "ch");

    await wait(1000)
    ele.style.opacity = 1

    let index = 0
    let text = ''
    let letter = ''

    for (let j = 0; j < target.length; j++) {


        for (let i = 0; i < maxIter; i++) {
            letter = chars[Math.floor(Math.random() * chars.length)]
            console.log(text);
            render()
            text = text.slice(0, -1)
            await wait(10)
        }
        letter = target[index]
        render()
        index++
    }

    function render() { text = text + letter; ele.textContent = text }

}






document.querySelectorAll('.glitch').forEach(gl => {
    glitchText(gl)
})


const fadeup = document.querySelectorAll('.hero-heading h1, .hero-heading p, .avatar')

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    fadeup.forEach((el, i) => {
        const delay = i * 50; // 50px scroll delay per element
        const progress = Math.min(Math.max((scrollY - delay) / 300, 0), 1);

        el.style.opacity = 1 - progress;
        el.style.transform = `translateY(${-progress * 120}px)`;
        el.style.filter = `blur(${progress * 10}px)`;
    });
});


async function terminaltext(ele) {

    let target = '> ' + ele.textContent.trim()
    if (target.includes('|')) {
        const parts = target.split('|')
        const padded = parts[0].trim().padEnd(65, '\u00A0') + '|' + parts[1]
        target = padded
        console.log(parts, padded);

        // target.split('|')[0].padEnd(20).join('')
    }

    ele.textContent = ''
    ele.style.opacity = 1
    ele.classList.add('typing')

    let mintime = 1, maxtime = 50

    let index = 0
    let letter = ''

    for (let i = 0; i < target.length; i++) {
        letter = target[i]
        ele.textContent += letter
        await wait(Math.floor(Math.random() * (maxtime - mintime + 1)) + mintime)
        index++
    }

    await wait(ele.getAttribute('data-delay') * 1000)

    ele.classList.remove('typing')

    return
}

async function runTerminal() {
    for (const ele of document.querySelectorAll('.term-main>p')) {
        if (ele.getAttribute('data-delay') < 0) {
            terminaltext(ele)
            await wait(ele.getAttribute('data-delay') * -100)
            continue
        }
        await terminaltext(ele)
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runTerminal()
            observer.unobserve(entry.target); // remove if you want repeat triggers
        }
    });
}, {
    threshold: 0.2 // triggers when 20% of element is visible
});

observer.observe(document.querySelector('.terminal'))

document.querySelectorAll('.skill-prog').forEach(ele => {
    const prog = ele.getAttribute('data-prog')
    // debugger
    progressBar(ele, prog)
})

function progressBar(ele, percent) {
    const width = 20
    const filled = Math.round((percent / 100) * width)
    const empty = width - filled
    ele.textContent = '[' + '#'.repeat(filled) + '.'.repeat(empty) + ']'
}


// CONTACT


(function () {
    emailjs.init({
        publicKey: "_Y4uc1pofjA9f3pEW",
    });
})();
const form = document.querySelector('.cont-form>form')
const formbtn = document.querySelector('.cont-form .submit')
const mailsent = document.getElementsByClassName('mail-sent')[0]


form.addEventListener("submit", e => {
    e.preventDefault();


    for (const inp of e.target) {


        if (!inp.validity.valid && inp.type != 'submit') {

            const err = inp.parentElement.nextElementSibling
            err.textContent = getErr(inp.validity)
            err.classList.add('cont-err')

            setTimeout(() => {
                err.classList.remove('cont-err')

            }, 3000);
            return

        }



    }


    console.log('sent');
    sendEmail()
});

let formValues = {}

function sendEmail() {
    const inputs = form.querySelectorAll('input, textarea');


    for (var i = 0; i < inputs.length; i++) {
        formValues[inputs[i].name] = inputs[i].value;
    }

    console.log(formValues);

    formbtn.textContent = 'Sending...'
    formbtn.style.pointerEvents = 'none'


    emailjs.send("service_irnsb7c", "template_g11v1f5", formValues).then(e => {

        formbtn.textContent = 'Send'

        mailsent.classList.add('open')
        mailsent.querySelector('dotlottie-player').seek(0)
        mailsent.querySelector('dotlottie-player').play()
        mailsent.querySelector('button').addEventListener("click", () => {
            mailsent.classList.remove('open')

        }, { once: true })

        console.log(formValues);
    })


}


function getErr(e) {

    if (e.valueMissing) return 'This is required'
    else if (e.typeMismatch) return 'Enter correct email'
    else if (e.typeMismatch) return 'wrong emal val'
    else if (e.tooShort) return 'Too short'
    else return 'Error'






}
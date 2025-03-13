
(function () {
    emailjs.init({
        publicKey: "_Y4uc1pofjA9f3pEW",
    });
})();
const form = document.querySelector('.cont-msg>form')
const formbtn = document.querySelector('.cont-msg>form button')
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

    console.log(formbtn);

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
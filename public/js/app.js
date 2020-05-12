
console.log('testing')

const weatherform = document.querySelector('form')

const search = document.querySelector('input')

const msg1 = document.querySelector('#one')
const msg2 = document.querySelector('#two')




weatherform.addEventListener('submit', (e) => {

    e.preventDefault()
    const location = search.value
    msg1.textContent = "Loading...."
    msg2.textContent = ".."
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if (data.error) {

                console.log(data.error)
                msg1.textContent = data.error
                
            } else {

               
                msg1.textContent = data.forecast
                msg2.textContent = data.location
            }
        })


    })
})




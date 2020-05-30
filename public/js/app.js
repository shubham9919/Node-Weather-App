console.log('Client side js file loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent  = 'Loading...'
    messageTwo.textContent = ''

    console.log(location)
    fetch('/weather?address='+ location).then((response)=>{   //.then here will execute backkend
    response.json(response).then((data)=>{
        console.log('data is',JSON.stringify(data))    
        if(data.error){
            messageOne.textContent =  JSON.stringify(data.error)
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        
    })
})
})
const socket = io();

socket.on('greeting',(data)=>{
    console.log(data);
})

document.querySelector('.form').addEventListener('submit',(e)=>{
    e.preventDefault()

    if(e.target[3].attributes[1].value === 'send'){
        console.dir(e.target[2].value)
        socket.emit('surveySubmit',{
            name:e.target[0].value,
            favoriteLanguage:e.target[1].value,
            comment:e.target[2].value,
            rand:Math.floor(Math.random() * 1000) + 1
        })
    }
})

socket.on('submittedForm',(data)=>{
    document.querySelector('.submittedArea').innerHTML = `<p>${data.name}</p><p>${data.favoriteLanguage}</p><p>${data.comment}</p><p>${data.rand}</p>`
})
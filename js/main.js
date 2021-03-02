document.addEventListener('DOMContentLoaded', function(){
    
    let tagsArea = document.querySelector('.form__tags-area')
    let textInput = document.querySelector('.form__text-input')
    let addButton = document.querySelector('.form__button')
    let checkbox = document.querySelector('.form__checkbox') 
    let tagsList = document.querySelectorAll('.tag')
    let readonlyModeOn = false

    //Adding tags after reloading page from locals storage

    tagsArea.innerHTML = getTagsList(tagsArea) || ''

    addButton.addEventListener('click', function(e){

        e.preventDefault()

        if(!readonlyModeOn){
            addTag(textInput.value, tagsArea)
            textInput.value = ''
            setTagsList(tagsList)
        }     
    })

    tagsArea.addEventListener('click', function(e){

        if(e.target.className == 'tag__button' && !readonlyModeOn){
            removeTag(e)
            setTagsList(tagsList)
        }
    })

    checkbox.addEventListener('click', function(e){

        readonlyModeOn = setReadonlyMode(this)
        
    })

})

function setReadonlyMode(checkbox){
    return checkbox.checked || false
}

function removeTag(e){
    e.target.parentNode.remove()
}


function addTag(tagValue, tagsArea){
    if(tagValue){
    tagsArea.insertAdjacentHTML('beforeend',
        `<div class="tag">${tagValue}
            <div class="tag__button">x</div>
        </div>`)
    }
}

function setTagsList(){
    let tagsList = document.querySelectorAll('.tag')
    let array = []
    for(tag of tagsList){
        array.push(tag.outerHTML)
    }
    localStorage.setItem('tagsList', array)
}

function getTagsList(tagsArea){
   
    let tagsList = localStorage.getItem('tagsList')

    return tagsList?.split(',').join('')
    
}
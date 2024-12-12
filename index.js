// IMPORTS
import { catsData } from "./data.js";

// INITIALIZATION
const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModal = document.getElementById('meme-modal')
const memeModalInner = document.getElementById('meme-modal-inner')


//EVENTLISTENERS
emotionRadios.addEventListener('change', highlightCheckedOption)
document.addEventListener('click', closeMemeModal)
getImageBtn.addEventListener('click', renderCatsEmotion)



// FUNCTION TO HIGHLIGHT CHECKED OPTION
function highlightCheckedOption(e){
    // REMOVE THE HIGHLIGHT CLASS FROM ALL THE RADIO ELEMENTS
    const radios = document.getElementsByClassName('radio')
    // LOOPING THROUGH THE RADIO HTML COLLECTION TO REMOVE THE HGIHLIGHT CLASS FROM ALL RADIO ELEMENT
    for ( let radio of radios) {
        radio.classList.remove('highlight')
    }

    // ADDING THE HGIHLIGHT CLASS BACK TO THE TARGETED RADIO
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}



// FUNCTION TO CLOSE MEME MODAL
function closeMemeModal(e) {
    if (!memeModal.contains(e.target) && e.target != getImageBtn) {
        memeModal.style.display = "none";
    } 
}



// FUNCTION TO RENDER CATS EMOTION
function renderCatsEmotion(){
    const singleCatsObj= getSingleCatsObj()
    // CHECKING IF SINGLECATSOBJ DOES NOT RETRUN AN OBJECT 
    if (!singleCatsObj) {
        return;
    }
    memeModal.style.display = 'flex'
    memeModalInner.innerHTML = `<img  class="cat-img" src="./images/${singleCatsObj.image}" alt="${singleCatsObj.alt}">`
}


// FUNCTION TO RETURN A SINGLE EMOTION OBJECT OR MULTIPLE EMOTION OBJECT DEPENDING ON THE TYPE OF RADIO SELECTED
function getSingleCatsObj(){
    const singleCatsObjArr = getMatchingArr()
    // CHECKING IF CATS ARRAY HAS SINGLE OBJECT OR MULTIPLE. IF MULTIPLE IT SHOULD RETURN RANDOM EMOTION IMAGES
    if(singleCatsObjArr.length === 1){
        return singleCatsObjArr[0]
    } else {
        const randomCatsObj = singleCatsObjArr[Math.floor(Math.random()*singleCatsObjArr.length)]
       return randomCatsObj
    }
}


// FUNCTION TO GET MATCHIN CATS ARRAY
function getMatchingArr(){
    // CHECK IF THE USER HAS SELECTED A RADIO
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotionRadio = document.querySelector('input[type="radio"]:checked').id
        // CHECK IF THE USER HAS SELECTED THE GIF ONLY OPTION
        const isGif = gifsOnlyOption.checked
        


        // FILTER THE CATS DATA ARRAY TO RETURN ARRAY THAT MATCHES THE SELECTED EMOTION RADIO
        const matchingCatsArr = catsData.filter(function(cats){
            return cats.emotionTags.includes(selectedEmotionRadio) && cats.isGif === isGif
        })
        return matchingCatsArr
    } else {
        // RETURN AN EMPTY ARRAY IF NO RADIO INPUT HAS BEEN CHECKED
        return []
        
    }
    
}



// FUNCTION TO GET EMOTION ARRAY
function getEmotionArr(cats){
    let emotionsArr = []
    // LOOPING THROUGH CATS DATA ARRAY
    for ( let cat of cats){
        // LOOPING THROUGH EMOTION TAG ARRAY TO PUSH EMOTIONS TO THE EMOTION ARRAY
        for ( let emotion of cat.emotionTags){
            // CHECK IF EMOTION ARRAY HAS DUPLICATES
            if(!emotionsArr.includes(emotion)){
                emotionsArr.push(emotion)
            }
        }
    }
    return emotionsArr
}



// FUNCTION TO RENDER EMOTIONS IN THE EMTOION RADIOS DIV
function renderEmotion(cats){
    const emotions = getEmotionArr(cats)
    let radioItems = ''
    // LOOPING THROUGH EMOTIONS ARRAY ADN APPENDING IT TO RADIO ITEMS
    for ( let emotion of emotions){
        radioItems += ` 
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" name="emotions" id="${emotion}">
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotion(catsData)


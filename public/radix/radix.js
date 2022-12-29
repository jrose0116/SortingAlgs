const form = document.getElementById("sort-form")
const values = document.getElementById("values");

const next = document.getElementById('next-btn')
const prev = document.getElementById('prev-btn')
const pages = document.getElementById('pages')

var arrays = []
var arraysi = 0
var curri = [-1]
var currj = [-1]

form.addEventListener('submit', function() {
    var valuesString = values.value
    var arr = valuesString.split(',').map(x => Number(x))
    
    arrays = []
    arraysi = 0
    curri = [-1]
    currj = [-1]

    radixsort(arr)
    displayContainer(arrays[arraysi])

    if(arraysi < arrays.length - 1){
        next.classList.remove("d-none")
    }
    else{
        next.classList.add("d-none")
    }
    if(arraysi > 0){
        prev.classList.remove("d-none")
    }
    else{
        prev.classList.add("d-none")
    }
    
    pages.innerHTML = "Digit: " + (arraysi + 1) + "/" + arrays.length + " (" + Math.pow(10,arraysi) + "s Place)"
    putAnswer(arrays[arrays.length - 1].flat(1))
})

next.addEventListener('click', function() {
    arraysi++;
    prev.classList.remove("d-none")
    if(arraysi < arrays.length - 1){
        next.classList.remove("d-none")
    }
    else{
        next.classList.add("d-none")
    }
    displayContainer(arrays[arraysi])
    pages.innerHTML = "Digit: " + (arraysi + 1) + "/" + arrays.length + " (" + Math.pow(10,arraysi) + "s Place)"
})

prev.addEventListener('click', function() {
    arraysi--;
    next.classList.remove("d-none")
    if(arraysi > 0){
        prev.classList.remove("d-none")
    }
    else{
        prev.classList.add("d-none")
    }
    displayContainer(arrays[arraysi])
    pages.innerHTML = arraysi + 1 + "/" + arrays.length
})

function displayContainer(array){
    for (let j = 0; j < 10; j++){
        content = document.getElementById('res' + j);
        content.innerHTML = "";
        for (let i = 0; i < array[j].length; i++) {
            const col = document.createElement('div')
            col.classList.add('col', 'bg-primary','text-white','text-center', 'rounded','py-1','mx-1', 'display-8', 'mb-1')
            col.innerHTML = array[j][i]
            content.append(col)
        }
    }
}

function radixsort(array){
    let digits = 0
    array.forEach( num => {
        if(num != 0){
            digits = Math.max(digits, Math.floor(Math.log10(Math.abs(num))) + 1)
        }
    })

    for (let i = 0; i < digits; i++){
        let currBucket = [[],[],[],[],[],[],[],[],[],[]]

        for(let j = 0; j < array.length; j++){
            currBucket[Math.floor(Math.abs(array[j])/Math.pow(10, i)) % 10].push(array[j])
        }
        arrays.push(currBucket)
        array = [...currBucket].flat(1)
    }

}

function putAnswer(array){
    const col = document.createElement('div')
    col.classList.add('bg-primary', 'text-white', 'rounded', 'py-1','mx-1', 'display-5', 'mb-3', 'text-center', 'col')
    col.innerHTML = "Sorted Array: " + array.join(", ")
    answer = document.getElementById('answer')
    answer.innerHTML = ""
    answer.append(col)
}
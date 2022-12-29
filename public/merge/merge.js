const form = document.getElementById("sort-form")
const values = document.getElementById("values");

var content = document.getElementById('sorting-container')
var content2 = document.getElementById('sorting-container2')
const next = document.getElementById('next-btn')
const prev = document.getElementById('prev-btn')
const pages = document.getElementById('pages')

var arr = []
var arrays = []
var arrays2 = []
var arrays3 = []
var arrays4 = []
var arraysi = 0
var curri = [-1]
var currj = [-1]

form.addEventListener('submit', function() {
    var valuesString = values.value
    arr = valuesString.split(',').map(x => Number(x))
    
    arrays = []
    arrays2 = []
    arrays3 = []
    arrays4 = []
    arraysi = 0
    
    mergesort(arr, 0, arr.length-1)
    displayContainer(arrays[arraysi], arrays2[arraysi], arrays3[arraysi], arrays4[arraysi])

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
    
    pages.innerHTML = arraysi + 1 + "/" + arrays.length
    putAnswer(arrays[arrays.length-1])
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
    displayContainer(arrays[arraysi], arrays2[arraysi], arrays3[arraysi], arrays4[arraysi])
    pages.innerHTML = arraysi + 1 + "/" + arrays.length
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
    displayContainer(arrays[arraysi], arrays2[arraysi], arrays3[arraysi], arrays4[arraysi])
    pages.innerHTML = arraysi + 1 + "/" + arrays.length
})

function displayContainer(array, array2, array3, splitting){
    if(arr.length < 14){
        display = 'display-5'
    }
    else{
        display = 'display-8'
    }
    content.innerHTML = ""
    content2.innerHTML = ""
    if(splitting == 0){
        content = document.getElementById('sorting-container')
        content2 = document.getElementById('sorting-container2')
        document.getElementById('label').innerHTML = "Split"
    }
    else{
        content = document.getElementById('sorting-container2')
        content2 = document.getElementById('sorting-container')
        document.getElementById('label').innerHTML = "Merge"
    }
    for (let i = 0; i < array.length; i++) {
        const col = document.createElement('div')
        col.classList.add('col', 'bg-primary','text-white','text-center', 'rounded','py-1','mx-1', display)
        col.innerHTML = array[i]
        if(arraysi+1 == arrays.length){
            col.classList.remove('bg-primary')
            col.classList.add('bg-success')
        }
        content.append(col)
    }
    for (let i = 0; i < array2.length; i++) {
        const col = document.createElement('div')
        col.classList.add('col', 'bg-primary','text-white','text-center', 'rounded','py-1','mx-1', display)
        col.innerHTML = array2[i]
        content2.append(col)
    }
    const col = document.createElement('div')
    col.classList.add('col')
    col.innerHTML = ""
    content2.append(col)
    for (let i = 0; i < array3.length; i++) {
        const col = document.createElement('div')
        col.classList.add('col', 'bg-primary','text-white','text-center', 'rounded','py-1','mx-1', display)
        col.innerHTML = array3[i]
        content2.append(col)
    }
}

function mergesort(array, lo, hi){
    if(lo >= hi){
        return;
    }
    const mid = lo + parseInt((hi-lo)/2)
    arrays.push([...array.slice(lo, hi+1)])
    arrays2.push([...array.slice(lo, mid+1)])
    arrays3.push([...array.slice(mid+1, hi+1)])
    arrays4.push(0)
    mergesort(array, lo, mid)
    mergesort(array, mid+1, hi)
    arrays2.push([...array.slice(lo, mid+1)])
    arrays3.push([...array.slice(mid+1, hi+1)])
    merge(array, lo, mid, hi)
    arrays.push([...array.slice(lo, hi+1)])
    arrays4.push(1)
}

function merge(array, lo, mid, hi) {
    i1 = lo, i2 = mid+1, i = lo; // i1 is index for array | i2 is index for array2 | i is for index in inserting merge
    array2 = [...array]
    while(i1 <= mid && i2 <= hi){
        if(array[i1] <= array[i2]){
            array2[i++] = array[i1++]
        }
        else{
            array2[i++] = array[i2++]
        }
    }
    while(i1 <= mid){
        array2[i++] = array[i1++]
    }
    while(i2 <= hi){
        array2[i++] = array[i2++]
    }
    for(let i = lo; i <= hi; i++){
        array[i] = array2[i]
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
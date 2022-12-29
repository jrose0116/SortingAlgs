const form = document.getElementById("sort-form")
const values = document.getElementById("values");

const content = document.getElementById('sorting-container')
const next = document.getElementById('next-btn')
const prev = document.getElementById('prev-btn')
const pages = document.getElementById('pages')

var arrays = []
var arraysi = 0
var curri = [-1]
var currj = [-1]
var temp = 0;

form.addEventListener('submit', function() {
    var valuesString = values.value
    var arr = valuesString.split(',').map(x => Number(x))
    
    arrays = []
    arraysi = 0
    curri = []
    currj = []

    arrays.push([...arr])
    quicksort(arr, 0, arr.length-1)
    curri.push(-1)
    currj.push(-1)
    displayContainer(arrays[arraysi], curri[arraysi], currj[arraysi], currj[arraysi+1], curri[arraysi+1])

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
    displayContainer(arrays[arraysi], curri[arraysi], currj[arraysi], currj[arraysi+1], curri[arraysi+1])
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
    displayContainer(arrays[arraysi], curri[arraysi], currj[arraysi], currj[arraysi+1], curri[arraysi+1])
    pages.innerHTML = arraysi + 1 + "/" + arrays.length
})

function displayContainer(array, curri, currj, currjnext, currinext){
    content.innerHTML = ""
    for (let i = 0; i < array.length; i++) {
        const col = document.createElement('div')
        col.classList.add('col', 'bg-primary','text-white','text-center', 'rounded','py-1','mx-1', 'display-5', 'mb-3')
        if(i == curri){
            col.classList.add('bg-danger')
            col.classList.remove('bg-primary')
        }
        else if(curri == -1 && currj == -1){
            col.classList.add('bg-success')
            col.classList.remove('bg-primary')
        }
        else if(i < currj || i > curri){
            col.classList.add('bg-secondary')
            col.classList.remove('bg-primary')
        }
        col.innerHTML = array[i]
        content.append(col)
    }
}

function quicksort(array, lo, hi){
    if(lo < hi){


        let p = array[hi]
        let i = lo-1
        for(let j = lo; j < hi; j++){
            if(array[j] < p){
                i++;
                temp = array[i]
                array[i] = array[j]
                array[j] = temp
            }
        }
        array[hi] = array[i+1]
        array[i+1] = p

        arrays.push([...array])
        curri.push(hi)
        currj.push(lo)
        quicksort(array, lo, i)
        quicksort(array, i+2, hi)
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
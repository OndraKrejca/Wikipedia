const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch='

const form = document.querySelector(".form")
const formInput = document.querySelector(".form-input")
const result = document.querySelector(".results")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const value = formInput.value

    if (!value) {
        result.innerHTML = `<div class="error">Input is empty</div>`
        return
    }
    
    fetchELement(value)
})

const fetchELement = async function (value) {

    try {
        const resp = await fetch (`${url}${value}`)
        const data = await resp.json()
        const element  = data.query.search

        if (element.length < 1) {
            `<div class="error">Not search items</div>`
            return
        }

        writeElement(element)

    } catch (error) {
        throw new Error ("Nothing!!")
    }
}


const writeElement =  function (el) {
    
   const jirka = el.map (oneItem => {

        const {pageid, snippet, title} = oneItem

        return `
        <a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
        <h4>${title}</h4>
        <p>
        ${snippet}
        </p>
        </a>
        `
    }).join("")

    result.innerHTML = `<div class="articles">${jirka}</div>`

}




const rootDiv = document.getElementById("root")
const contentDiv = document.createElement("div")
contentDiv.classList.add("content")
const allEpisodes = getAllEpisodes()
const selectShowsEle = document.getElementById("sS")
const selectEle = document.getElementById("sE")
const searchInpu = document.getElementById("search")
const spanSearchSpanElements = document.querySelectorAll(".showandHide")
const loading = document.getElementById("loading")


const optionEleHeading = document.createElement("option")
optionEleHeading.innerText = "Select Show"
selectShowsEle.append(optionEleHeading)

const getShows = getAllShows()

loading.style.display = "none"
getShows.forEach((show) => {

  const optionEle = document.createElement("option")
  optionEle.innerText = (`${show.name}`)
  optionEle.setAttribute("value", `${show.id}`)
  selectShowsEle.append(optionEle)
  optionEle.setAttribute("id", "showsList")


  // front menu content


  const frontPageContent = document.getElementById("frontPageContent")
  sE.style.display = "none"
  searchInpu.style.display = "none"


  const div = document.createElement("div")
  div.classList.add("show_card")
  const rightDiv = document.createElement("div")
  rightDiv.classList.add("right")
  const h1 = document.createElement("h1")
  h1.innerText = show.name
  h1.classList.add("menuHeading")
  h1.setAttribute("dataId", show.id)
  h1.style.cursor = "pointer"
  const div2 = document.createElement("div")
  const img = document.createElement("img")
  try {
    img.setAttribute("src", `${show.image.medium}`)
  } catch (err) {
    console.log(err)
  }
  const p = document.createElement("p")
  p.innerText = show.summary
  div2.append(img, p)
  rightDiv.append(h1, div2)

  const leftDiv = document.createElement("div")
  leftDiv.classList.add("left")
  const h41 = document.createElement("h4")
  h41.innerHTML = `Rating: <span>${show.rating.average}</span>`
  const h42 = document.createElement("h4")
  h42.innerHTML = `Genres: <span>${show.genres}</span>`
  const h43 = document.createElement("h4")
  h43.innerHTML = `Status: <span>${show.status}</span>`
  const h44 = document.createElement("h4")
  h44.innerHTML = `Run-Time: <span>${show.runtime}</span>`
  leftDiv.append(h41, h42, h43, h44)
  div.append(rightDiv, leftDiv)
  frontPageContent.append(div)

})

// add event listener for dropdown to select shows

const showListEles = document.querySelectorAll("#showsList")

selectShowsEle.addEventListener("change", getData)
let data



async function getData(e) {
  optionEleHeading.setAttribute("disabled", "disabled")
  selectShowsEle.setAttribute("dataId", e.target.value)
  console.log(e.target.value)
  frontPageContent.innerHTML = ""
  sE.style.display = ""
  searchInpu.style.display = ""
  spanSearchSpanElements.forEach(element => element.style.display = "none")



  // fetch data from api


  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${e.target.value}/episodes`)
    data = await response.json()
  } catch (err) {
    console.log(err)
  }

  contentDiv.innerHTML = ""

  // insert data from api using dom
  data.forEach(episode => {
    const divEle = document.createElement("div")
    const flotDiv = document.createElement("div")
    flotDiv.classList.add("floatDiv")
    divEle.classList.add("card")
    divEle.setAttribute("dataId", episode.id)
    const h3 = document.createElement("h3")
    h3.innerHTML = `${episode.name} - <span class="sE">S0${episode.season}E0${episode.number}</span>`
    h3.classList.add("card-heading")
    h3.setAttribute("id", "heading")
    const secondDivEle = document.createElement("div")
    secondDivEle.classList.add("img")
    const imgTag = document.createElement("img")
    try {
      imgTag.setAttribute("src", episode.image.medium)
    } catch (err) {
      console.log(err)
      imgTag.setAttribute("alt", "sorry content is not avalible")
    }

    secondDivEle.append(imgTag)
    const p = document.createElement("p")
    p.classList.add('discription')
    p.innerText = `${episode.summary}`
    flotDiv.append(h3, secondDivEle, p)
    divEle.append(flotDiv)
    contentDiv.append(divEle)
    rootDiv.append(contentDiv)

  })

  // search functionality

  const cards = document.querySelectorAll(".card")
  const resultEle = document.getElementById("result")

  searchInpu.addEventListener("input", filterFun)

  function filterFun() {
    const fliterText = searchInpu.value

    for (let i = 0; i < cards.length; i++) {
      const cardTextContent = cards[i].textContent

      if (cardTextContent.includes(fliterText)) {
        cards[i].style.display = ""
        cards[i].setAttribute("id", "cards")

      } else {
        cards[i].style.display = "none"
        cards[i].removeAttribute("id")
      }
      const cardsShowingEles = document.querySelectorAll("#cards")
      resultEle.innerText = `Displaying ${cardsShowingEles.length}/${cards.length} episodes`
    }
  }

  // selection functionality


  document.getElementById("restart").addEventListener("click", () => {
    location.reload()
    spanSearchSpanElements.forEach(element => element.style.display = "")

  })

  selectEle.innerHTML = ""
  data.forEach(episode => {
    const optionEle = document.createElement("option")
    optionEle.innerText = ("value", `S0${episode.season}E0${episode.number} - ${episode.name}`)
    optionEle.setAttribute("value", `${episode.id}`)
    selectEle.append(optionEle)

  })

  function selectEpisode(e) {

    for (let i = 0; i < cards.length; i++) {
      const dataId = cards[i].getAttribute("dataId")
      if (e.target.value === dataId) {
        cards[i].style.display = ""
      } else {
        cards[i].style.display = "none"
      }
    }
  }

  selectEle.addEventListener("change", selectEpisode)


  // fetch episods from api

  cards.forEach(card => {
    card.addEventListener("click", fetchApi)
    async function fetchApi() {
      window.open(`https://www.tvmaze.com/episodes/${card.getAttribute("dataId")}`)
    }
  })
}


// search funtionality for front input

const frontSearch = document.getElementById("frontsearch")
const show_card = document.querySelectorAll(".show_card")
const foundShows = document.querySelector(".foundShows")
const showandHide = document.querySelectorAll(".showandHide")



frontSearch.addEventListener("keyup", filterFun)

function filterFun(e) {



  const fliterTextSearch = frontSearch.value

  show_card.forEach(card => {
    const cardTextContent = card.textContent
    if (cardTextContent.includes(fliterTextSearch)) {
      loading.style.display = ""
      card.style.display = ""
      card.setAttribute("id", "cards")
    } else {
      card.style.display = "none"
      card.removeAttribute("id")
      loading.style.display = "none"

    }

    const cardsShowingEles = document.querySelectorAll("#cards")
    foundShows.innerText = `found ${cardsShowingEles.length} shows`
  })


  loading.style.display = "none"
}

// fetch episods from api for front page

const menuHeading = document.querySelectorAll(".menuHeading")
menuHeading.forEach(heading => heading.addEventListener("click", getDataMenu))

async function getDataMenu(e) {
  contentDiv.innerHTML = ""
  show_card.forEach(card => card.style.display = "none")
  showandHide.forEach(element => element.style.display = "none")
  selectEle.style.display = ""
  searchInpu.style.display = ""
  selectEle.innerHTML = ""

  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${e.target.getAttribute("dataId")}/episodes`)
    const data = await response.json()

    // show cards for front page menu


    data.forEach(episode => {
      // contentDiv.innerHTML=""
      const divEle = document.createElement("div")
      const flotDiv = document.createElement("div")
      flotDiv.classList.add("floatDiv")
      divEle.classList.add("card")
      divEle.setAttribute("dataId", episode.id)
      const h3 = document.createElement("h3")
      h3.innerHTML = `${episode.name} - <span class="sE">S0${episode.season}E0${episode.number}</span>`
      h3.classList.add("card-heading")
      h3.setAttribute("id", "heading")
      const secondDivEle = document.createElement("div")
      secondDivEle.classList.add("img")
      const imgTag = document.createElement("img")
      try {
        imgTag.setAttribute("src", episode.image.medium)
      } catch (err) {
        console.log(err)
        imgTag.setAttribute("alt", "sorry content is not avalible")
      }
      secondDivEle.append(imgTag)
      const p = document.createElement("p")
      p.classList.add('discription')
      p.innerText = `${episode.summary}`
      flotDiv.append(h3, secondDivEle, p)
      divEle.append(flotDiv)
      contentDiv.append(divEle)
      rootDiv.append(contentDiv)

      // selection functionality

      const optionEle = document.createElement("option")
      optionEle.innerText = ("value", `S0${episode.season}E0${episode.number} - ${episode.name}`)
      optionEle.setAttribute("value", `${episode.id}`)
      selectEle.append(optionEle)

      function selectEpisode(e) {
        const cards = document.querySelectorAll(".card")

        for (let i = 0; i < cards.length; i++) {
          const dataId = cards[i].getAttribute("dataId")
          if (e.target.value === dataId) {
            cards[i].style.display = ""
          } else {
            cards[i].style.display = "none"
          }
        }
      }

      selectEle.addEventListener("change", selectEpisode)

      // search functionality

      const cards = document.querySelectorAll(".card")
      const resultEle = document.getElementById("result")
      searchInpu.addEventListener("input", filterFun)

      function filterFun() {
        const fliterText = searchInpu.value

        for (let i = 0; i < cards.length; i++) {
          const cardTextContent = cards[i].textContent

          if (cardTextContent.includes(fliterText)) {
            cards[i].style.display = ""
            cards[i].setAttribute("id", "cards")

          } else {
            cards[i].style.display = "none"
            cards[i].removeAttribute("id")
          }
          const cardsShowingEles = document.querySelectorAll("#cards")
          resultEle.innerText = `Displaying ${cardsShowingEles.length}/${cards.length} episodes`
        }
      }

    })

    // fetch episodes

    const cards = document.querySelectorAll(".card")
    cards.forEach(card => card.addEventListener("click", () => {
      window.open(`https://www.tvmaze.com/episodes/${card.getAttribute("dataId")}`)

    }
    ))



  } catch (err) {
    console.log(err)
  }

}





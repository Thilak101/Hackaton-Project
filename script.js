//You can edit ALL of the code here
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

// window.onload = setup;


// display


const rootDiv = document.getElementById("root")
const contentDiv = document.createElement("div")
contentDiv.classList.add("content")
const allEpisodes = getAllEpisodes()

// allEpisodes.forEach(episode => {
//   const divEle = document.createElement("div")
//   const flotDiv = document.createElement("div")
//   flotDiv.classList.add("floatDiv")
//   divEle.classList.add("card")
//   divEle.setAttribute("dataId", episode.id)
//   const h3 = document.createElement("h3")
//   h3.innerHTML = `${episode.name} - <span class="sE">S0${episode.season}E0${episode.number}</span>`
//   h3.classList.add("card-heading")
//   h3.setAttribute("id", "heading")
//   const secondDivEle = document.createElement("div")
//   secondDivEle.classList.add("img")
//   const imgTag = document.createElement("img")
//   imgTag.setAttribute("src", `${episode.image.medium}`)
//   secondDivEle.append(imgTag)
//   const p = document.createElement("p")
//   p.classList.add('discription')
//   p.innerText = `${episode.summary}`
//   flotDiv.append(h3, secondDivEle, p)
//   divEle.append(flotDiv)
//   contentDiv.append(divEle)
//   rootDiv.append(contentDiv)
// contentDiv.innerHTML = ""
// })


// const searchInpu = document.getElementById("search")
// const cards = document.querySelectorAll(".card")
// const resultEle = document.getElementById("result")

// searchInpu.addEventListener("input", filterFun)

// function filterFun() {
//   const fliterText = searchInpu.value

//   for (let i = 0; i < cards.length; i++) {
//     const cardTextContent = cards[i].textContent

//     if (cardTextContent.includes(fliterText)) {
//       cards[i].style.display = ""
//       cards[i].setAttribute("id", "cards")
//       const cardsShowingEles = document.querySelectorAll("#cards")
//       resultEle.innerText = `Displaying ${cardsShowingEles.length}/${cards.length} episodes`
//     } else {
//       cards[i].style.display = "none"
//       cards[i].removeAttribute("id")
//     }
//   }
// }

// selection functionality

// const selectEle = document.getElementById("sE")
// const optionEle = document.querySelectorAll("option")

// document.getElementById("restart").addEventListener("click", () => {
//   location.reload()
// })


// allEpisodes.forEach(episode => {
//   const optionEle = document.createElement("option")
//   optionEle.innerText = ("value", `S0${episode.season}E0${episode.number} - ${episode.name}`)
//   optionEle.setAttribute("value", `${episode.id}`)
//   selectEle.append(optionEle)

// })

// function selectEpisode(e) {

//   for (let i = 0; i < cards.length; i++) {
//     const dataId = cards[i].getAttribute("dataId")
//     if (e.target.value === dataId) {
//       cards[i].style.display = ""
//     } else {
//       cards[i].style.display = "none"
//     }
//   }
// }



// selectEle.addEventListener("change", selectEpisode)


// data from api

// const searchInpu = document.getElementById("search")
// const cards = document.querySelectorAll(".card")
// const resultEle = document.getElementById("result")
// for (let i = 0; i < cards.length; i++) {
//   cards[i].setAttribute("count", i)
// }

// async function fetchApi() {
//   try {
//     const response = await fetch('https://api.tvmaze.com/shows/82/episodes')
//     const data = await response.json()

// cards.forEach(card => {
// card.addEventListener("click", () => {
// window.open(`https://www.tvmaze.com/episodes/${card.getAttribute("dataId")}`)
// window.open(data[card.getAttribute("count")].url)

//       })
//     })

//   }
//   catch (err) {
//     console.log(err)
//   }


// }

// fetchApi()



// load different shows

const selectShowsEle = document.getElementById("sS")
const optionEleHeading = document.createElement("option")
optionEleHeading.innerText = "Select Show"
selectShowsEle.append(optionEleHeading)

const getShows = getAllShows()

getShows.forEach((show) => {

  const optionEle = document.createElement("option")
  optionEle.innerText = (`${show.name}`)
  optionEle.setAttribute("value", `${show.id}`)
  selectShowsEle.append(optionEle)
  optionEle.setAttribute("id", "showsList")

})

// add event listener for dropdown to select shows

const showListEles = document.querySelectorAll("#showsList")

selectShowsEle.addEventListener("change", getData)
let data



async function getData(e) {
  optionEleHeading.setAttribute("disabled", "disabled")
  selectShowsEle.setAttribute("dataId", e.target.value)

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

  const searchInpu = document.getElementById("search")
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

  const selectEle = document.getElementById("sE")
  const optionEle = document.querySelectorAll("option")

  document.getElementById("restart").addEventListener("click", () => {
    location.reload()
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
    card.addEventListener("click", fetchEpi)

    async function fetchEpi() {
      window.open(`https://www.tvmaze.com/episodes/${card.getAttribute("dataId")}`)
    }
  })
}



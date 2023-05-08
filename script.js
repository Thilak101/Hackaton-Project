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

allEpisodes.forEach(episode => {
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
  imgTag.setAttribute("src", `${episode.image.medium}`)
  secondDivEle.append(imgTag)
  const p = document.createElement("p")
  p.classList.add('discription')
  p.innerText = `${episode.summary}`
  flotDiv.append(h3, secondDivEle, p)
  divEle.append(flotDiv)
  contentDiv.append(divEle)
  rootDiv.append(contentDiv)
  // contentDiv.innerHTML = ""
})


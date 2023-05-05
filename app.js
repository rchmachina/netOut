const form = document.getElementById("search-forum")
const container = document.getElementById('containerz')
const row = document.getElementById('row')


form.addEventListener("submit", async (e) => {
    e.preventDefault()
    var keyword = await form.elements.query.value
    document.querySelectorAll('card').forEach((everyCard) => {everyCard.remove()})
    if(document.getElementById('notFound')){document.getElementById('notFound').remove()}
   // document.
    console.log(keyword)
    const config={
        params: {
            q: keyword,
            }
        }
    const res = await axios.get("https://api.tvmaze.com/search/shows", config)
    console.log(res.data)
    if(res.data.length === 0){
         
        console.log("berhasil")
        var notFoundMessage = document.createElement("h4")
        notFoundMessage.id= "notFound"
        notFoundMessage.innerHTML ="error, not found"
        notFoundMessage.classList.add("h-100", "d-flex" , "align-items-center", "justify-content-center")
        row.append(notFoundMessage)
    }else{
        console.log(res.data[0])
        getImage(res.data)
        form.elements.query.value = ''
        }
    }
)


const getImage = (movie)=>{

    for (let result of movie){
        var card = document.createElement("card")
        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
        var img = document.createElement("img")
        var sumary = result.show.summary
        var button = document.createElement("a")
        button.classList.add("btn", "btn-primary")
        button.href = result.show.url
        button.innerHTML = "nonton SKUY!"
        var cardText = document.createElement("p")
        cardText.classList.add("card-text")
        const cardTittle = document.createElement("h2")
        cardTittle.classList.add("card-title");
        card.classList.add("card");
        card.style.width = "16rem";
        card.style.margin = "10px";

        if (result.show.image){
            img.classList.add("card-img");
            img.src = result.show.image.medium
        }
        cardTittle.innerHTML= result.show.name

        if (result.show.summary){
        
            const sliceSumary = sumary.slice(0, 100)
            cardText.innerHTML = `${sliceSumary}....<a href="${result.show.url}"><b>see more</b></a>`
            
        }   

       
        card.append(img)
        cardBody.appendChild(cardTittle)
        cardBody.appendChild(cardText)
        
        card.append(cardBody)
        card.appendChild(button)
        card.appendChild(document.createElement("br"))

        row.append(card)
    }
}


{/* <div class="card-body">
<h4 class="card-title">John Doe</h4>
<p class="card-text">Some example text.</p>
<a href="#" class="btn btn-primary">See Profile</a>
</div> */}



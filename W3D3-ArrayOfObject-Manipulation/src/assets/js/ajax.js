
// const testimonialData = [
//     {
//         image:"https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b34d29c-0458-4047-a924-c8c75109d1b4/width=960,quality=90/00768-111161737.jpeg",
//         review:"lorem ipsum",
//         name:"Dono",
//         rate: 5,
//     },
//     {
//         image:"https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b34d29c-0458-4047-a924-c8c75109d1b4/width=960,quality=90/00768-111161737.jpeg",
//         review:"lorem ipsum",
//         name:"kasino",
//         rate: 5,
//     },
//     {
//         image:"https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b34d29c-0458-4047-a924-c8c75109d1b4/width=960,quality=90/00768-111161737.jpeg",
//         review:"lorem ipsum",
//         name:"indro",
//         rate: 5,
//     },
//     {
//         image:"https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b34d29c-0458-4047-a924-c8c75109d1b4/width=960,quality=90/00768-111161737.jpeg",
//         review:"lorem ipsum",
//         name:"Dono",
//         rate: 2,
//     },
//     {
//         image:"https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b34d29c-0458-4047-a924-c8c75109d1b4/width=960,quality=90/00768-111161737.jpeg",
//         review:"lorem ipsum",
//         name:"Dono",
//         rate: 1,
//     },
    
// ]

function html(item) {
    return `
    <div class="testimonial">
        <img src="${item.image}" class="profile-testimonial" />
        <p class="quote">"${item.review}"</p>
        <p class="author">- ${item.name}</p>
        <p class="rate"> ${item.rate}<i class="fa-solid fa-star"></i></p>
    </div>
    `
}

function allTestimonials() {
    let testimonialsHTML = ``

    testimonialData.forEach((item) => {
        testimonialsHTML += html(item)
    })
    document.getElementById("testimonials").innerHTML = testimonialsHTML
}

allTestimonials()

function filterTestimonials(rate) {
    let testimonialsHTML = ``



    const testimonialfilter = testimonialData.filter((item) =>{
        return item.rate === rate
    })

    if (testimonialfilter.length === 0){
        testimonialsHTML = `<h3> Data tidak ada</h3>`
    } else {
        testimonialfilter.forEach((item) =>{
            testimonialsHTML += html(item)
        })
    }
    document.getElementById("testimonials").innerHTML = testimonialsHTML
}
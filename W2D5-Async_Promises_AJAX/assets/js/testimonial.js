// class Testimonial {

//     constructor(image,review,name){
//         this.image = image
//         this.review = review
//         this.name = name
//     }

//     html(){
//         return`
//         <div class="testimonial">
//                 <img src="${this.image}" class="profile-testimonial" />
//                 <p class="quote">"${this.review}"</p>
//                 <p class="author">- ${this.name}</p>
//             </div>
//         `
//     }
// }

// const testimonial1 = new Testimonial("https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b34d29c-0458-4047-a924-c8c75109d1b4/width=960,quality=90/00768-111161737.jpeg","lorem ipsum ","hulk")
// const testimonial2 = new Testimonial("https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b34d29c-0458-4047-a924-c8c75109d1b4/width=960,quality=90/00768-111161737.jpeg","lorem ipsum ","hulk")
// const testimonial3 = new Testimonial("https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b34d29c-0458-4047-a924-c8c75109d1b4/width=960,quality=90/00768-111161737.jpeg","lorem ipsum ","hulk")

// const testimonials = [testimonial1, testimonial2, testimonial3]


// let testimonialsHTML = ``
// for(let i=0;i<testimonials.length; i++){
//     testimonialsHTML += testimonials[i].html()
// }

// document.getElementById("testimonials").innerHTML = testimonialsHTML

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      xhr.open("GET", url, true);
  
      xhr.onerror = () => {
        reject("Network error!");
      };
  
      xhr.onload = () => {
        resolve(JSON.parse(xhr.responseText));
      };
  
      xhr.send();
    });
  }



async function allTestimonials() {
    try {
        const testimonials = await fetchUrl(
          "https://api.npoint.io/5e4f6cc86a578e6633e7"
        );

        const testimonialsHTML = testimonials.map((testimonial) => {
            return `<div class="testimonial">
            <img src="${testimonial.image}" class="profile-testimonial" />
            <p class="quote">"${testimonial.review}"</p>
            <p class="author">- ${testimonial.name}</p>
            <p class="rate"> ${testimonial.rate}<i class="fa-solid fa-star"></i></p>
        </div> `
        });
        document.getElementById("testimonials").innerHTML = testimonialsHTML.join(" ")
} catch(error) {
    alert(error);
}
}

allTestimonials()

async function filterTestimonials(rate) {
    try {
        const testimonials = await fetchUrl(
          "https://api.npoint.io/5e4f6cc86a578e6633e7"
        );

        const testimonialfilter = testimonials.filter((testimonial) =>{
        return testimonial.rate === rate
        });

        const testimonialsHTML = testimonialfilter.map((testimonial) => {
            return `<div class="testimonial">
            <img src="${testimonial.image}" class="profile-testimonial" />
            <p class="quote">"${testimonial.review}"</p>
            <p class="author">- ${testimonial.name}</p>
            <p class="rate"> ${testimonial.rate}<i class="fa-solid fa-star"></i></p>
        </div> `
        });

       
    document.getElementById("testimonials").innerHTML = testimonialsHTML.join(" ")
} catch(error) {
    alert(error)
}
}

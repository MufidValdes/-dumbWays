class Testimonial {

    constructor(image,review,name){
        this.image = image
        this.review = review
        this.name = name
    }

    html(){
        return`
        <div class="testimonial">
                <img src="${this.image}" class="profile-testimonial" />
                <p class="quote">"${this.review}"</p>
                <p class="author">- ${this.name}</p>
            </div>
        `
    }
}

const testimonial1 = new Testimonial("https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b34d29c-0458-4047-a924-c8c75109d1b4/width=960,quality=90/00768-111161737.jpeg","lorem ipsum ","hulk")
const testimonial2 = new Testimonial("https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b34d29c-0458-4047-a924-c8c75109d1b4/width=960,quality=90/00768-111161737.jpeg","lorem ipsum ","hulk")
const testimonial3 = new Testimonial("https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/8b34d29c-0458-4047-a924-c8c75109d1b4/width=960,quality=90/00768-111161737.jpeg","lorem ipsum ","hulk")

const testimonials = [testimonial1, testimonial2, testimonial3]


let testimonialsHTML = ``
for(let i=0;i<testimonials.length; i++){
    testimonialsHTML += testimonials[i].html()
}

document.getElementById("testimonials").innerHTML = testimonialsHTML
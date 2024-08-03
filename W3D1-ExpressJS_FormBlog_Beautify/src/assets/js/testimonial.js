
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

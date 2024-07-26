const testimonials = [
  {
    image :"https://th.bing.com/th/id/OIP.Cfa-rVz98huiYoBoSUf5UQHaIn?rs=1&pid=ImgDetMain",
    content :"Yang Bener Aja!!",
    author :"author",
    rating : 1,

  },
  {
    image :"https://us-tuna-sounds-images.voicemod.net/e083bc03-2cd6-43d6-afb3-f9b16bd3b54b-1696576043194.png",
    content :"Kunti Bogel",
    author :"dedemit",
    rating : 2,

  },
  {
    image :"https://thebiem.com/wp-content/uploads/2019/02/Dice.jpg",
    content :"Dice",
    author :"Yun Hyun Suk",
    rating : 5,

  },
  {
    image :"https://cdn.archonia.com/images/1-104028982-1-2-original1/solo-leveling-vol-02-gn-manga.jpg",
    content :"Solo Leveling",
    author :"JANG Seong-rak",
    rating : 4,

  },

];

function allTestimonial(){
  const testimonialHTML = testimonials.map((testimonial) => {
    return `<div class="testimonial">
    <img
      src="${testimonial.image}"
      class="profile-testimonial"
    />
    <p class="quote">${testimonial.content}</p>
    <p class="author">- ${testimonial.author}</p>
    </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ")
}

function filterTestimonial(rating){
  const filteredTestimonialByRating = testimonials.filter((testimonial) => {
    return testimonial.rating == rating;
  });
  const testimonialHTML = filteredTestimonialByRating.map((testimonial) => {
    return `<div class="testimonial">
    <img
      src="${testimonial.image}"
      class="profile-testimonial"
    />
    <p class="quote">${testimonial.content}</p>
    <p class="author">- ${testimonial.author}</p>
    </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ")
}

allTestimonial();

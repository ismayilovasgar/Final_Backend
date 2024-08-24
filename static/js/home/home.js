var swiper = new Swiper(".clients_swiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  pagination: {
    el: ".swiper-pagination",
    clickable: "fraction",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 32,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },
});

var swiper = new Swiper(".review-swiper-content", {
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".previoustBtn",
    prevEl: ".nextBtn",
  },
});

// Filter Select
//* sorting-select
const select_sorting = document.querySelectorAll(".sorting");
let sorting_list_items = "";
select_sorting.forEach((item) => {
  item.addEventListener("click", (e) => {
    item.querySelector("i").classList.toggle("changeDirection");
    item.classList.toggle("focus");
    item.querySelector("ul.list").classList.toggle("show");
    sorting_list_items = item.querySelectorAll("ul li");
    sorting_list_items.forEach((list_item) => {
      list_item.addEventListener("click", (e) => {
        item.querySelector("input.current").value = list_item.textContent;
      });
    });
    e.preventDefault();
  });
});

// const list_category = document.querySelectorAll("ul.list li");
// list_category.addEventListener("click", (e) => {
//   console.log("+++++");
// });

function filterByCategory(text) {
  let url = `http://127.0.0.1:8000/trainer/${text}`;
  fetch(url)
    .then((response) => {
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      return response.json();
    })
    .then((data) => {
      console.log("Data received:", data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Form
// const catalogInput = document.getElementById("catalog_input");
// const form = document.getElementById("catalog_search");

// catalogInput.addEventListener("focus", function () {
//   form.classList.add("active-border");
// });

// catalogInput.addEventListener("blur", function () {
//   form.classList.remove("active-border");
// });

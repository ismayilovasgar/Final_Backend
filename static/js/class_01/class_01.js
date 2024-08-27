//* nice-select
const select = document.querySelector(".nice-select");
const spanText = document.querySelector(".nice-select input.current");
const arrows = document.querySelectorAll(".nice-select .select_arrow i");
const list = document.querySelector(".nice-select ul.list");
const listItems = document.querySelectorAll(".nice-select ul.list li");

select.addEventListener("click", (e) => {
  list.classList.toggle("show");
  select.classList.toggle("focus");

  arrows.forEach((arrow) => {
    arrow.classList.toggle("changeDirection");
  });

  listItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      spanText.value = item.textContent;
    });
  });
});

//? sorting-select
const select_sorting = document.querySelectorAll(".sorting");
let sorting_list_items = "";
select_sorting.forEach((item) => {
  item.addEventListener("click", (e) => {
    item.querySelector("i").classList.toggle("changeDirection");
    item.classList.toggle("focus");
    item.querySelector(".select_arrow").classList.toggle("focus");
    item.querySelector("ul.list").classList.toggle("show");
    sorting_list_items = item.querySelectorAll("ul li");
    sorting_list_items.forEach((list_item) => {
      list_item.addEventListener("click", (e) => {
        item.querySelector("input.current").value = list_item.textContent;
      });
    });
  });
});

// Form
const catalogInput = document.getElementById("catalog_input");
const form = document.getElementById("catalog_search");

catalogInput.addEventListener("focus", function () {
  form.classList.add("active-border");
});

catalogInput.addEventListener("blur", function () {
  form.classList.remove("active-border");
});

//! Swiper Buttons
var swiper = new Swiper(".testimonials-swiper", {
  slidesPerView: "4",
  spaceBetween: 10,

  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
    clickable: true,
  },
  navigation: {
    // nextEl: ".myswiper-button-next",
    // prevEl: ".myswiper-button-prev",
  },

  breakpoints: {
    375: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
  },
});

//? Fetch Data From Django url
const button = document.querySelector("form button");
button.addEventListener("click", (e) => {});

const fetchPost = async (search_text, wrap) => {
  const response = await fetch(
    `http://127.0.0.1:8000/trainer/lifestyle/${search_text}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify("search_text"),
    }
  ).catch((error) => console.error("Error fetching data:", error));
  const data = await response.json();

  data.forEach((item) => {});
};

//! Function to get CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

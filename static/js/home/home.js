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

//? Filter by category
const list_category = [...document.querySelectorAll("ul.list li")];
list_category.map((item) => {
  item.addEventListener("click", (e) => {
    document
      .querySelectorAll("#popup li")
      .forEach((el) => el.classList.remove("selected"));
    item.classList.toggle("selected");

    fetchFilteredData(`${item.textContent}`);
  });
});

// gpt
const listWrap = document.querySelector(".trainersList  .listWrap");
function fetchFilteredData(text) {
  listWrap.innerHTML = "";

  fetch(`http://127.0.0.1:8000/trainer/${text}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify(text),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("receive data:", data);
      data.map((trainer) => {
        listWrap.innerHTML += `
        <div class="trainerItem">
            <div class="profile">
              <img src="media/${trainer.image}" alt="">
            </div>
            <div class="trainerName">${trainer.first_name} ${trainer.last_name}</div>
            <div class="trainerPosition">
              ${trainer.category}      
            </div>
        </div>
        `;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Function to get CSRF token from cookies
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

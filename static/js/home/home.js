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
    //
    // filterByCategory(`${item.textContent}`);
    //
    fetchFilteredData(`${item.textContent}`);
  });
});

// gpt

function fetchFilteredData(text) {
  const data = { text: text, ke2: "value2" };
  fetch(`http://127.0.0.1:8000/trainer/${text}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("receive data: ", data);
      data.forEach((person) => {


        const img=document.querySelector(".aboutPreview img.some-icon-dark")
        img.src=`media/${person.image}`
        console.log(`url: ${person.image}`);


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
//
// me
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

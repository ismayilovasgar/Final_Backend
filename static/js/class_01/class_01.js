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
    e.preventDefault();
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
const catalogList = document.querySelector(".catalogList");
const catalogSearch = document.querySelector(".catalogSearch");
const linkItems = [...document.querySelectorAll("ul li.cataloglink")];

// click button by trainer name
const button = document.querySelector(".catalogSearch button");
const inputText = document.querySelector(".catalogSearch input");

inputText.addEventListener("input", function (event) {
  let value = inputText.value;

  // Check for multiple consecutive spaces
  const hasConsecutiveSpaces = /\s{2,}/.test(value);
  // Check for any numbers
  const hasNumbers = /[0-9]/.test(value);

  if (hasConsecutiveSpaces || hasNumbers) {
    // Add error styling
    catalogSearch.classList.add("error-input");
  } else {
    // Remove error styling
    catalogSearch.classList.remove("error-input");
  }

  // Optionally, replace invalid input while preserving existing text
  // This will correct the text but not remove it
  value = value.replace(/\s{2,}/g, " ").replace(/[0-9]/g, "");
  inputText.value = value;
});

// window.onload = function () {
//   const mediaQuery = window.matchMedia("(min-width: 768px)");
//   function yourFunction() {
// fetchPost("category_Yoga", catalogList);
// markFirstItem();
//     console.log("+");
//   }

//   function handleWidthChange(e) {
//     if (e.matches) {
// If the screen width is 768px or more, run your function
//       yourFunction();
//     } else {
// Optional: Add logic for when the screen is wider than 768px
//       console.log("Screen width is under than 768px.");
//     }
//   }

// Initial check
//   handleWidthChange(mediaQuery);

// Add a listener to monitor changes in screen size
//   mediaQuery.addListener(handleWidthChange);
// };

linkItems.map((item) => {
  item.addEventListener("click", (e) => {
    // remove all selected tag
    linkItems.forEach((el) => el.classList.remove("selected"));
    // add selected tag to special item
    item.classList.toggle("selected");

    fetchPost(`"category_"${item.textContent}`, catalogList);
  });
});

button.addEventListener("click", (e) => {
  fetchPost("name_" + inputText.value.trim(), catalogList);
});

//? click button by category name
linkItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    fetchPost("category_" + item.textContent, catalogList);
  });
});

function markFirstItem() {
  // Select the first item in the list
  const firstItem = document.querySelector("ul li.cataloglink");

  // Apply a CSS class to mark the first item
  if (firstItem) firstItem.classList.add("selected");
}

const fetchPost = async (search_text, wrap) => {
  wrap.innerHTML = "";
  const response = await fetch(
    `http://127.0.0.1:8000/trainer/trainer_text/${search_text}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify("search_text"),
    }
  )
    .then((res) => res.json())
    .then((resp) => {
      resp.data.map((item) => {
        wrap.innerHTML += `
        <div class="card">
            <div class="cardPreview">
                <img src="${item.move_image_url}" alt="">
                <div class="cardStatus ${item.trainer_category}">${item.trainer_category}</div>
            </div>
      
            <div class="cardHead">
                <div class="cardUser">
                    <div class="cardAvatar">
                        <img src="${item.trainer_image_url}" alt="">
                    </div>
                    <div class="cardDetails">
                        <div class="cardTitle">${item.move_title}</div>
                        <div class="cardTrainer">
                            <span class="firstName">${item.firstname} ${item.lastname} </span>
                        </div>
                    </div>
                </div>
                <div class="cardLevel ${item.move_difficulty}">${item.move_difficulty}</div>
            </div>
      
            <div class="cardParameters">
                <div class="cardParameter">
                    <i class="fa-brands fa-youtube"></i> 
                    <span>7</span>
                </div>
                <div class="cardParameter">
                    <i class="fa-regular fa-user"></i>
                    <span>160</span>
                </div>
            </div>
        </div>
        `;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  inputText.value = "";
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

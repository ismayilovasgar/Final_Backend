// Get the modal
const modal = document.getElementById("myModal");
const trainers = document.querySelectorAll(".trainers .listWrap a");
const closeBtn = document.querySelector(".modal .modalCloseBtn");

trainers.forEach((trainer) => {
  trainer.addEventListener("click", (e) => {
    modal.style.display = "block";
  });
});

closeBtn.addEventListener("click", (e) => {
  modal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// ! Swiper - 1
let swiper_programs = new Swiper(".programs_swiper", {
  grabCursor: true,
  slidesPerView: 3,
  spaceBetween: 24,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    clickable: true,
  },
  navigation: {
    nextEl: ".programs_next_btn",
    prevEl: ".programs_prev_btn",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    700: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

//? Filter Select
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

// ------------------------------------------------------------------------------------------------------
//? For recieve data with fetch request
const listWrap = document.querySelector(".listWrap");
const allListItem = [...document.querySelectorAll("ul.list li")];

window.onload = function () {
  fetchFilteredData("Yoga", listWrap);
  markFirstItem();
};

function markFirstItem() {
  // Select the first item in the list
  const firstItem = document.querySelector("ul.list li");

  // Apply a CSS class to mark the first item
  if (firstItem) firstItem.classList.add("selected");
}

allListItem.map((item) => {
  item.addEventListener("click", (e) => {
    // remove all selected tag
    allListItem.forEach((el) => el.classList.remove("selected"));
    // add selected tag to special item
    item.classList.toggle("selected");
    // posts();
    fetchFilteredData(`${item.textContent}`, listWrap);
  });
});

function fetchFilteredData(text, wrap) {
  wrap.innerHTML = "";

  fetch(`http://127.0.0.1:8000/trainer/class/${text}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify("text"),
  })
    .then((response) => response.json())
    .then((data) => {
      data.trainer_data.map((trainer) => {
        wrap.innerHTML += `
        <a href="#" class="trainerItem">
            <div class="profile">
              <img src="${trainer.trainer_image_url}" alt="">
            </div>
            <div class="trainerName">${trainer.firstname} ${trainer.lastname}</div>
            <div class="trainerPosition"> ${trainer.profession} </div>
        </a>
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

// <a href="#" class="trainerItem">
//             <div class="profile">
//               <img src="media/${trainer.image}" alt="">
//             </div>
//             <div class="trainerName">${trainer.first_name} ${trainer.last_name}</div>
//             <div class="trainerPosition"> ${trainer.profession} </div>
//         </a>

//? For recieve data with fetch request
const listWrap = document.querySelector(".postBox .postList");
const allListItem = [...document.querySelectorAll(".postNav ul li")];

window.onload = function () {
  fetchFilteredData("Lifestyle", listWrap);
  markFirstItem();
};

function markFirstItem() {
  // Select the first item in the list
  const firstItem = document.querySelector(".postNav ul li");

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
    currentItem = 3;
  });
});
let items = [];
let len = 0;
function fetchFilteredData(text, wrap) {
  wrap.innerHTML = "";

  fetch(`http://127.0.0.1:8000/trainer/lifestyle/${text}/`, {
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
        <div class="postItem">
           <div class="postPreview">
              <img src="${trainer.move_image_url}" alt="">
           </div>
           <div class="postStatus ${trainer.trainer_category}">${trainer.trainer_category}</div>
           <div class="postSubtitle">${trainer.move_title}</div>
           <div class="postFoot">
             <div class="postUser">
             <div class="postAvatar">
                <img src="${trainer.trainer_image_url}" alt="">
             </div>
             <div class="postAuthor">${trainer.firstname} ${trainer.lastname}</div>
           </div>
           <div class="postDate">${trainer.started_date}</div>
         </div>
     </div>`;
      });
      items = [...document.querySelectorAll(".postItem")];
      len = items.length;
      if (len > 3) loadMoreBtn.style.display = "block";
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

//?  For load more button
let loadMoreBtn = document.querySelector(".postBtns button");
let currentItem = 3;

loadMoreBtn.addEventListener("click", (e) => {
  for (var i = currentItem; i < currentItem + 3; i++) {
    items[i].style.display = "block";
    if (i == len - 1) break;
  }
  currentItem += 3;
  if (currentItem >= items.length) loadMoreBtn.style.display = "none";
});

//  Load more Js - Django
// const load_btn = document.querySelector(".postNav ul li");
// let visible = 3;

// function posts() {
//   fetch(`http://127.0.0.1:8000/trainer/posts-json/${visible}`)
//     .then((response) => response.json())
//     .then((response) => {
//       // console.log(response.data);
//       maxSize = response.max_size;
//       const data = response.data;
//       // spinnerBox.classList.remove("not-visible");
//       // setTimeout(() => {
//       // spinnerBox.classList.add("not-visible");
//       response.data.map((post) => {
//         console.log(post.id);
//         // postsBox.innerHTML += ``;
//       });
//       // }, 500);

//       if (maxSize) {
//         console.log("done");
//         // loadBox.innerHTML=`<h4>no more</h4>`
//       }
//     });
// }

// posts();

// load_btn.addEventListener("click", (e) => {
//   visible += 3;
//   posts();
// });

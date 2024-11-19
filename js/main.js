// let items_container = document.querySelector(".items");
// let btns = document.querySelectorAll(".menu-section");
// let searchBar = document.getElementById("search");

// let displayMenu = async function () {
//   try {
//     let res = await fetch("/js/menu.json");
//     let data = await res.json();
//     console.log(data);
//     let itemsHTML = "";
//     data.forEach(function (item) {
//       itemsHTML += `<div class="card">
//                 <div class="card-details">
//                     <img src="${item.image}" alt="">
//                     <p class="text-body">${item.description}</p>
//                 </div>
//                 <i class="fa-solid fa-cart-shopping card-button"></i>
//             </div>`;
//     });
//     items_container.innerHTML = itemsHTML;

//     btns.forEach(function (btn) {
//       btn.addEventListener("click", function (e) {
//         let category = e.target.dataset.id;
//         let filterItems = "";
//         data.filter(function (item) {
//           if (category === item.category) {
//             filterItems += `<div class="card">
//                 <div class="card-details">
//                     <img src="${item.image}" alt="">
//                     <p class="text-body">${item.description}</p>
//                 </div>
//                 <i class="fa-solid fa-cart-shopping card-button"></i>
//             </div>`;
//           }
//         });
//         items_container.innerHTML = filterItems;
//       });
//     });

//     searchBar.addEventListener("input", function () {
//       let searchInp = searchBar.value;
//       let searchItem = "";
//       data.filter(function (item) {
//         if (
//           item.title.includes(searchInp) ||
//           item.description.includes(searchInp) ||
//           item.category.includes(searchInp)
//         ) {
//           searchItem += `<div class="card">
//                 <div class="card-details">
//                     <img src="${item.image}" alt="">
//                     <p class="text-body">${item.description}</p>
//                 </div>
//                 <i class="fa-solid fa-cart-shopping card-button"></i>
//             </div>`;
//         }
//       });
//       items_container.innerHTML = searchItem;
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// displayMenu();

// Editing Code
let items_container = document.querySelector(".items");
let btns = document.querySelectorAll(".menu-section");
let searchBar = document.getElementById("search");

let displayMenu = async function () {
  try {
    let res = await fetch("/js/menu.json");
    let data = await res.json();

    // Function to render items based on data
    function renderItems(items) {
      let itemsHTML = items
        .map((item) => {
          return `<div class="card">
          <div class="card-details">
            <img src="${item.image}" alt="">
            <p class="text-body">${item.description}</p>
          </div>
          <i class="fa-solid fa-cart-shopping card-button"></i>
        </div>`;
        })
        .join("");
      items_container.innerHTML = itemsHTML;
    }

    // Function to filter items based on category
    function filterItemsByCategory(category) {
      return data.filter((item) => item.category === category);
    }

    // Display items from a default category initially
    let defaultCategory = "coffee"; // Change this to your desired default category
    let defaultItems = filterItemsByCategory(defaultCategory);
    renderItems(defaultItems);

    // Button click event listeners for filtering
    btns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        let category = e.target.dataset.id;
        let filteredItems = filterItemsByCategory(category);
        renderItems(filteredItems);
      });
    });

    // Search bar input event listener
    searchBar.addEventListener("input", function () {
      let searchInp = searchBar.value.toLowerCase();
      if (searchInp === "") {
        // If search input is empty, render items based on default category
        renderItems(defaultItems);
      } else {
        let filteredItems = data.filter(
          (item) =>
            item.title.toLowerCase().includes(searchInp) ||
            item.description.toLowerCase().includes(searchInp) ||
            item.category.toLowerCase().includes(searchInp)
        );
        renderItems(filteredItems);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

displayMenu();

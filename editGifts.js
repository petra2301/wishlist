"use strict";

//#region filter wishes
const searchField = document.querySelector("input#search");
searchField.addEventListener('keyup', searchForWish);

function searchForWish() {
  let input, filter, h2, wishCard;
  input = document.querySelector('#search');
  filter = input.value.toUpperCase();
  wishCard = document.querySelectorAll('.wish-card');

  for (let i = 0; i < wishCard.length; i++) {
    let h2 = wishCard[i].querySelector("h2.wish-name");
    let txtValue = h2.textContent;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      wishCard[i].style.display = "";
    } else {
      wishCard[i].style.display = "none";
    }
  }
}

const selectList = document.querySelector("select#whichList");
selectList.addEventListener('change', e => {
  const listName = e.target.value;
  filterList(listName);
});

function filterList(listName) {
  let filter, wishCard;
  filter = listName.toUpperCase();
  wishCard = document.querySelectorAll('.wish-card');

  for (let i = 0; i < wishCard.length; i++) {
    let span = wishCard[i].querySelector("span.list-name");
    let txtValue = span.textContent;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      wishCard[i].style.display = "";
    } else {
      wishCard[i].style.display = "none";
    }
  }
}
//#endregion

// #region get all wishes 
get();

function get() {
  fetch("https://wishlist-dcee.restdb.io/rest/wishes", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "	61559ea4dfa7346e2f9691b1",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(wishes => {
      wishes.forEach(getWish);
    });
}

function getWish(wish) {
  const template = document.querySelector("template").content;
  const wishItem = template.cloneNode(true);
  const wishCard = wishItem.querySelector('div.wish-card');
  wishCard.setAttribute('data-wish-id', wish._id);

  const fullListName = wish.whichList;
  const trimmedListName = fullListName.slice(0, 5);
  const listNameBadge = wishItem.querySelector('span.list-name');
  listNameBadge.textContent = trimmedListName;


  const editBtn = wishItem.querySelector('button.edit-btn');
  editBtn.setAttribute('id', `edit-${wish._id}`);
  editBtn.addEventListener('click', () => {
    fetchAndPopulate(wish._id);
  })

  const deleteBtn = wishItem.querySelector('button.delete-btn');
  deleteBtn.setAttribute('id', `delete-${wish._id}`);
  deleteBtn.addEventListener('click', () => {
    deleteWish(wish._id);
  })

  wishItem.querySelector("img").setAttribute("src", `${wish.imgUrl}`);
  wishItem.querySelector("h2.wish-name").textContent = wish.name;
  wishItem.querySelector("p.wish-price").textContent = wish.price + " DKK";
  wishItem.querySelector("p.wish-desc").textContent = wish.desc;

  if (wish.link1 != "") {
    wishItem.querySelector(".button1").classList.remove("d-none");
    wishItem.querySelector(".button1").setAttribute("href", `${wish.link1}`);
  }

  if (wish.link2 != "") {
    wishItem.querySelector(".button2").classList.remove("d-none");
    wishItem.querySelector(".button2").setAttribute("href", `${wish.link2}`);
  }

  if (wish.link3 != "") {
    wishItem.querySelector(".button3").classList.remove("d-none");
    wishItem.querySelector(".button3").setAttribute("href", `${wish.link3}`);
  }

  if (wish.link4 != "") {
    wishItem.querySelector(".button4").classList.remove("d-none");
    wishItem.querySelector(".button4").setAttribute("href", `${wish.link4}`);
  }

  document.querySelector(".wishWrapper").append(wishItem);
}
// #endregion

// #region edit wishes
const editForm = document.querySelector("form#editForm");
const editWishIdField = editForm.querySelector("#wishId");
const editNameField = editForm.querySelector("#name");
const editDescField = editForm.querySelector("#desc");
const editPriceField = editForm.querySelector("#price");
const editImgUrlField = editForm.querySelector("#imgUrl");
const editLink1Field = editForm.querySelector("#link1");
const editLink2Field = editForm.querySelector("#link2");
const editLink3Field = editForm.querySelector("#link3");
const editLink4Field = editForm.querySelector("#link4");
const editWhichListField = editForm.querySelector('#whichList');

editForm.addEventListener('submit', e => {
  e.preventDefault();
  put();
})

function fetchAndPopulate(id) {
  fetch(`https://wishlist-dcee.restdb.io/rest/wishes/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8", 
      "x-apikey": "61559ea4dfa7346e2f9691b1",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(wish => {
      editWishIdField.value = wish._id;
      editNameField.value = wish.name;
      editDescField.value = wish.desc;
      editPriceField.value = wish.price;
      editImgUrlField.value = wish.imgUrl;
      editLink1Field.value = wish.link1;
      editLink2Field.value = wish.link2;
      editLink3Field.value = wish.link3;
      editLink4Field.value = wish.link4;
      editWhichListField.value = wish.whichList;
    });

}

function put() {
  let data = {
    name: editNameField.value,
    desc: editDescField.value,
    price: editPriceField.value,
    imgUrl: editImgUrlField.value,
    link1: editLink1Field.value,
    link2: editLink2Field.value,
    link3: editLink3Field.value,
    link4: editLink4Field.value,
    whichList: editWhichListField.value,
  };

  const wishId = editWishIdField.value;

  fetch(`https://wishlist-dcee.restdb.io/rest/wishes/${wishId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "61559ea4dfa7346e2f9691b1",
        "cache-control": "no-cache"
      },
      body: JSON.stringify(data),
    }
  )
    .then(d => d.json())
    .then(updatedWish => {
      console.log(updatedWish._id);
      const wishDiv = document.querySelector(`div[data-wish-id="${updatedWish._id}"]`);
      wishDiv.querySelector("h2").textContent = updatedWish.name;
      wishDiv.querySelector("p.wish-desc").textContent = updatedWish.desc;
      wishDiv.querySelector("p.wish-price").textContent = updatedWish.price + "DKK";
      wishDiv.querySelector("img.gift-img").setAttribute('src', updatedWish.imgUrl);
      wishDiv.querySelector("a.button1").setAttribute('src', updatedWish.link1);
      wishDiv.querySelector("a.button2").setAttribute('src', updatedWish.link2);
      wishDiv.querySelector("a.button3").setAttribute('src', updatedWish.link3);
      wishDiv.querySelector("a.button4").setAttribute('src', updatedWish.link4);
      wishDiv.querySelector("span.list-name").textContent = updatedWish.whichList;
      
      showEditFeedback();
    });
}
// #endregion

// #region manual modal actions
function showEditFeedback() {
  editForm.reset();

  
  const successAlert = document.querySelector("div.alert-success");
  successAlert.classList.remove('d-none');
  
  setTimeout(() => {
    successAlert.classList.add('d-none');
  }, "10000")
}

//#region delete wish
function deleteWish(id) {
  fetch(`https://wishlist-dcee.restdb.io/rest/wishes/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "61559ea4dfa7346e2f9691b1",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      const deleteWish = document.querySelector(`div[data-wish-id="${id}"]`);
      deleteWish.remove();
    });
}


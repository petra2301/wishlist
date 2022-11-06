"use strict";

const selectList = document.querySelector("#whichList");
const selectWish = document.querySelector("form#selectWish");
const editForm = document.querySelector("form#editForm");

// get all wishes 
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

    const editBtn = wishItem.querySelector('button.edit-btn');
    editBtn.setAttribute('id', `edit-${wish._id}`);
    editBtn.addEventListener('click', () => {
        fetchAndPopulate(wish._id);
        console.log(wish._id);
    })

    const deleteBtn = wishItem.querySelector('button.delete-btn');
    deleteBtn.setAttribute('id', `delete-${wish._id}`);
    deleteBtn.addEventListener('click', () => {
        deleteWish(wish._id);
    })

    wishItem.querySelector("img").setAttribute("src", `${wish.imgUrl}`);
    wishItem.querySelector("h2").textContent = wish.name;
    wishItem.querySelector("p").textContent = wish.price + " DKK";
    wishItem.querySelector("small").textContent = wish.desc;

    if (wish.link1 != "") {
        wishItem.querySelector(".button1").classList.remove("hide");
        wishItem.querySelector(".button1").setAttribute("href", `${wish.link1}`);
    }

    if (wish.link2 != "") {
        wishItem.querySelector(".button2").classList.remove("hide");
        wishItem.querySelector(".button2").setAttribute("href", `${wish.link2}`);
    }

    if (wish.link3 != "") {
        wishItem.querySelector(".button3").classList.remove("hide");
        wishItem.querySelector(".button3").setAttribute("href", `${wish.link3}`);
    }

    if (wish.link4 != "") {
        wishItem.querySelector(".button4").classList.remove("hide");
        wishItem.querySelector(".button4").setAttribute("href", `${wish.link4}`);
    } 

    document.querySelector(".wishWrapper").append(wishItem);
}

// //#region edit form
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
        console.log(wishId);
    
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
    .then( updatedWish => {
        console.log(updatedWish._id);
        const wishDiv = document.querySelector(`div[data-wish-id="${updatedWish._id}"]`);
        wishDiv.querySelector("h2").textContent = updatedWish.name;
          
        editForm.reset();
    });
    }

    //delete wish
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
            document.getElementById(id).remove();
          });
      }


// editForm.addEventListener("submit", e => {
//     e.preventDefault();
//     put();
// })

// function put() {
//     let data = {
//         name: editForm.elements.name.value,
//         realname: editForm.elements.realname.value,
//         age: editForm.elements.age.value,
//         powers: editForm.elements.powers.value
//     };

//     let postData = JSON.stringify(data);

//     const heroId = editForm.elements.id.value;

//     fetch("https://class1909-30f9.restdb.io/rest/superheroes/" + heroId,
//     {
//         method: "put",
//         headers: {
//             "Content-Type": "application/json; charset=utf-8",
//             "x-apikey": "5d88745afd86cb75861e25fc",
//             "cache-control": "no-cache"
//         },
//         body: postData
//     }
// )
// .then(d => d.json())
// .then( updatedHero => {
//     const parentElement = document.querySelector(`article[data-hero-id="${updatedHero._id}"]`);
    
//     parentElement.querySelector("h2").textContent = updatedHero.name;
//     parentElement.querySelector(".realName").textContent = updatedHero.realname;
//     parentElement.querySelector(".superPower").textContent = updatedHero.powers;
//     parentElement.querySelector(".age").textContent = updatedHero.age;
      
//       editForm.reset();
// });
// }
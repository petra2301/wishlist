"use strict";

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
      wishes.forEach(addWish);
    });
}

function addWish(wish) {
    let list = wish.whichList
    if (window.location.href.indexOf(list) > -1) {
    
    const template = document.querySelector("template").content;
    const wishItem = template.cloneNode(true);

    wishItem.querySelector("img").setAttribute("src", `${wish.imgUrl}`);
    wishItem.querySelector("h2.wish-name").textContent = wish.name;
    wishItem.querySelector("p.wish-price").textContent = wish.price + " DKK";
    wishItem.querySelector("p.small").textContent = wish.desc;

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
    
    
  }
  
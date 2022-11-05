"use strict";

const addForm = document.querySelector("form#addForm");

addForm.addEventListener("submit", e => {
  console.log(e);
  e.preventDefault();
  post();
});

function post() {
  const data = {
    name: addForm.elements.name.value,
    desc: addForm.elements.desc.value,
    price: addForm.elements.price.value,
    imgUrl: addForm.elements.imgUrl.value,
    link1: addForm.elements.link1.value,
    link2: addForm.elements.link2.value,
    link3: addForm.elements.link3.value,
    link4: addForm.elements.link4.value,
    whichList: addForm.elements.whichList.value
  };

  const postData = JSON.stringify(data);
  fetch("https://wishlist-dcee.restdb.io/rest/wishes", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "61559ea4dfa7346e2f9691b1",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      addForm.reset();
    });
}

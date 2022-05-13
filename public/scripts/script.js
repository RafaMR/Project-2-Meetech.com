window.addEventListener(
  'load',
  () => {
    console.log('Ironmaker app started successfully!');
  },
  false
);

let loadMoreBtn = document.querySelector('#load');
let currentItem = 3;
if (loadMoreBtn)
  loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.container .row .col-4')];
    for (let i = currentItem; i < currentItem + 3; i++) {
      if (boxes[i]) boxes[i].style.display = 'flex';
    }
    currentItem += 3;
    if (currentItem >= boxes.length) {
      loadMoreBtn.style.display = 'none';
    }
  };

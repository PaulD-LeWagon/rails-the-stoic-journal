const setCardOrdinals = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    j = i + 1;
    card.querySelectorAll('.card-header span')[0].innerText = j;
  });
}

window.addEventListener('load', (e) => {

  setCardOrdinals();

  const containers = [];

  containers.push(document.getElementById('cards'));

  console.log(containers);

  const drake = dragula(containers, {
    moves: function (el, container, handle) {
      console.log(handle.classList.contains('handle'))
      return handle.classList.contains('handle');
    }
  });
  drake.on('drop', (el, target) => {
    setCardOrdinals();
  });
});

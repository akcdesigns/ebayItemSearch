// declare variables
let toggle = document.querySelector('.toggle');
let results = document.getElementById('results')



// event listeners
toggle.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('active');
  document.querySelector('header').classList.toggle('active');
});

$('#searchForm').on('submit', e => {

  e.preventDefault();
  let searchStr = $('#searchStr').val();
  let data = { searchStr };

  $.ajax({
    type: "post",
    url: 'assets/php/ebayApiHandler.php',
    data: data,
    dataType: "json",
    success: response => {
      let res = response.data.findItemsByKeywordsResponse[0].searchResult[0].item;
      clear();
      res.forEach(element => {
        displayResults(element.title, element.galleryURL, element.condition[0].conditionDisplayName, element.viewItemURL, element.sellingStatus[0].convertedCurrentPrice[0].__value__)
      })
    }
  });
})

// functions

const clear = () => {
  $('#searchStr').val('');
  $('#results').text("");
}

const displayResults = (title, imgUrl, description, itemLink, price) => {

  let item = document.createElement('div');
  item.className = 'card';
  let imgDiv = document.createElement('div');
  imgDiv.className = 'img';
  imgDiv.style.backgroundImage = `url(${imgUrl})`;
  let itemType = document.createElement('h2');
  itemType.innerText = description;
  let itemContentDiv = document.createElement('div');
  itemContentDiv.className = 'content';
  let itemContentP = document.createElement('h4');
  itemContentP.innerText = title;
  let currentPrice = document.createElement('p');
  currentPrice.innerText = `Price: ${price} (GBP)`
  let itemIcons = document.createElement('div');
  itemIcons.className = 'icons';
  let itemHref = document.createElement('a');
  itemHref.href = itemLink;
  itemHref.target = '_blank';
  let itemIcon = document.createElement('i');
  itemIcon.className = 'fas fa-globe';

  item.appendChild(imgDiv);
  imgDiv.appendChild(itemType);
  item.appendChild(itemContentDiv);
  itemContentDiv.appendChild(itemContentP);
  itemContentDiv.appendChild(currentPrice);
  itemContentDiv.appendChild(itemIcons);
  itemIcons.appendChild(itemHref);
  itemHref.appendChild(itemIcon);

  results.appendChild(item)
}


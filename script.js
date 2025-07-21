
const data = {
  "Şaqalatlar": [
    { ad: "Dana əti", kod: "101", sekil: "dana.jpg" },
    { ad: "Quzu əti", kod: "102", sekil: "quzu.jpg" }
  ],
  "Toyuq məhsulları": [
    { ad: "Toyuq filesi", kod: "201", sekil: "toyuq.jpg" },
    { ad: "Toyuq budu", kod: "202", sekil: "bud.jpg" }
  ],
  "Kolbasa": [
    { ad: "Suxoy kolbasa", kod: "301", sekil: "suxoy.jpg" },
    { ad: "Doktorskaya kolbasa", kod: "302", sekil: "doktor.jpg" }
  ],
  "Sosiska": [
    { ad: "Qaynadılmış sosiska", kod: "401", sekil: "sosis.jpg" }
  ],
  "Pendir": [
    { ad: "Ağ pendir", kod: "501", sekil: "pendir.jpg" }
  ],
  "Meyvə-tərəvəz": [
    { ad: "Pomidor", kod: "601", sekil: "pomidor.jpg" },
    { ad: "Alma", kod: "602", sekil: "alma.jpg" }
  ]
};

const categoriesDiv = document.getElementById("categories");
const productsSection = document.getElementById("products-section");
const categoryTitle = document.getElementById("category-title");
const productList = document.getElementById("product-list");

Object.keys(data).forEach((category) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerText = category;
  card.onclick = () => showProducts(category);
  categoriesDiv.appendChild(card);
});

let currentCategory = "";
let filteredProducts = [];

function showProducts(category) {
  currentCategory = category;
  categoriesDiv.style.display = "none";
  productsSection.classList.remove("hidden");
  categoryTitle.innerText = category;
  document.getElementById("search").value = "";
  filteredProducts = data[category];
  renderProducts();
}

function renderProducts() {
  productList.innerHTML = "";
  filteredProducts.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    if (item.sekil) {
      const img = document.createElement("img");
      img.src = "images/" + item.sekil;
      card.appendChild(img);
    }
    const name = document.createElement("p");
    name.innerText = item.ad;
    const code = document.createElement("p");
    code.innerHTML = `<strong>Kod:</strong> ${item.kod}`;
    card.appendChild(name);
    card.appendChild(code);
    productList.appendChild(card);
  });
}

function searchProducts() {
  const query = document.getElementById("search").value.toLowerCase();
  filteredProducts = data[currentCategory].filter(item =>
    item.ad.toLowerCase().includes(query)
  );
  renderProducts();
}

function goBack() {
  productsSection.classList.add("hidden");
  categoriesDiv.style.display = "grid";
}


function renderProducts() {
  productList.innerHTML = "";
  if (filteredProducts.length === 0) {
    productList.innerHTML = "<p style='text-align:center;'>Təəssüf ki, heç bir məhsul tapılmadı.</p>";
    return;
  }

  filteredProducts.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    if (item.sekil) {
      const img = document.createElement("img");
      img.src = "images/" + item.sekil;
      card.appendChild(img);
    }

    const name = document.createElement("p");
    name.innerText = item.ad;

    const code = document.createElement("p");
    code.innerHTML = `<strong>Kod:</strong> ${item.kod}`;
    code.style.cursor = "pointer";
    code.style.color = "#4CAF50";
    code.title = "Kliklə kopyala";

    code.onclick = () => {
      navigator.clipboard.writeText(item.kod);
      alert("Kod panoya kopyalandı: " + item.kod);
    };

    card.appendChild(name);
    card.appendChild(code);
    productList.appendChild(card);
  });
}

const axtarishInput = document.getElementById("axtarish");
const mehsulListesi = document.getElementById("mehsulListesi");
const darkBtn = document.getElementById("darkModeBtn");

const LOCAL_DATA_KEY = "mehsullar";

if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark-mode");
}

darkBtn.onclick = () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
};

async function getProducts() {
  let mehsullar = JSON.parse(localStorage.getItem(LOCAL_DATA_KEY) || "[]");
  if (mehsullar.length === 0) {
    try {
      const response = await fetch("products.json");
      if (response.ok) {
        mehsullar = await response.json();
        localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(mehsullar));
      }
    } catch (err) {
      console.error("Məhsullar yüklənmədi:", err);
    }
  }
  return mehsullar;
}

function renderProducts(data) {
  mehsulListesi.innerHTML = "";
  if (data.length === 0) {
    mehsulListesi.innerHTML = "<p>Nəticə tapılmadı.</p>";
    return;
  }
  data.forEach(m => {
    const div = document.createElement("div");
    div.className = "mehsul";
    div.innerHTML = `
      <img src="images/${encodeURIComponent(m.kateqoriya)}/${m.shekil}" alt="${m.ad}" />
      <h4>${m.ad}</h4>
      <p>Kod: ${m.kod}</p>
    `;
    mehsulListesi.appendChild(div);
  });
}

async function loadAndRender() {
  const mehsullar = await getProducts();
  renderProducts(mehsullar);
}

loadAndRender();

axtarishInput.addEventListener("input", async () => {
  const q = axtarishInput.value.toLowerCase();
  const mehsullar = await getProducts();
  const filtered = mehsullar.filter(m => m.ad.toLowerCase().includes(q));
  renderProducts(filtered);
});

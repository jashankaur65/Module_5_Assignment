const form = document.getElementById("search-form");
const input = document.getElementById("commonName");
const results = document.getElementById("results");
const statusEl = document.getElementById("status");

async function fetchTrees(commonName) {
  const url = `https://data.winnipeg.ca/resource/d3jk-hb6j.json?$where=lower(common_name) LIKE lower('%${commonName}%')&$order=diameter_at_breast_height DESC&$limit=100`;
  const encodedURL = encodeURI(url);
  const res = await fetch(encodedURL);
  const data = await res.json();
  return data;
}
function displayData(data) {
  if (data.length === 0) {
    results.innerHTML = "<p>No results found.</p>";
    return;
  }

  let table = "<table><tr><th>Common Name</th><th>Botanical Name</th><th>Diameter</th></tr>";
  data.forEach(item => {
    table += `<tr>
      <td>${item.common_name || ""}</td>
      <td>${item.botanical_name || ""}</td>
      <td>${item.diameter_at_breast_height || ""}</td>
    </tr>`;
  });
  table += "</table>";
  results.innerHTML = table;
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = input.value.trim();
  if (!name) return;
  statusEl.textContent = "Loading...";
  try {
    const data = await fetchTrees(name);
    displayData(data);
    statusEl.textContent = `Found ${data.length} results.`;
  } catch (error) {
    statusEl.textContent = "Error fetching data.";
  }
});

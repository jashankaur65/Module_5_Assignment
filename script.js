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

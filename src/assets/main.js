const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC92-DgDvLQPM_r2oHbDr60w&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById('content');

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    'X-RapidAPI-Key': 'c68edbdba9mshc3cb6eb8038f3b2p1f444ajsna5de19fe1256'
  }
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
        ${videos.items.map(video => `
        <a href="https://www.youtube.com/@exoplanetas/videos">
        <div class="group relative">
            <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
            </h3>
            </div>
        </div>
        </a>
        `).slice(0,4).join('')}
    `;
    content.innerHTML = view;
  } catch (e){
    console.log(e); 
  }
})();

// instalar este paquete en el raiz para desplegar en github como html estatico
// npm install gh-pages --save-dev
// luego en package.json agregamos el script con nombre 'deploy' indicando la carpeta /src:
//   "deploy": "gh-pages -d src"
// ahora luego de actualizar la rama puedo hacer: npm run deploy

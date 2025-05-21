const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=70';

async function haalPokemonsOp() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Fout bij ophalen: ${response.status}`);
    const data = await response.json();

    const detailRequests = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
    allePokemonData = await Promise.all(detailRequests);

    toonPokemons(allePokemonData);
  } catch (error) {
    console.error('Fout:', error);
  }
}

// functie maken voor pokemons te laten tonen
function toonPokemons(pokemons) {
  const lijst = document.getElementById('pokemons');
  lijst.innerHTML = '';

  pokemons.forEach((data) => {
    const types = data.types.map(type => type.type.name).join(', ');
    const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
    const moves = data.moves.slice(0, 5).map(move => move.move.name).join(', ');
    const stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');

    const li = document.createElement('li');
    li.innerHTML = `
      <p><strong>${data.name}</strong></p>
      <img src="${data.sprites.front_default}" alt="${data.name}" />
      <p><strong>Type(s):</strong> ${types}</p>
      <p><strong>Abilities:</strong> ${abilities}</p>
      <p><strong>Moves:</strong> ${moves}</p>
      <p><strong>Stats:</strong> ${stats}</p>
      <button>Voeg toe aan favorieten</button>
    `;

    const knop = li.querySelector('button');
    knop.addEventListener('click', () => {
      voegToeAanFavorieten({
        name: data.name,
        sprite: data.sprites.front_default,
        types,
        abilities,
        moves,
        stats,
      });
    });

    lijst.appendChild(li);
  });
}
//pokemons toevoegen aan de favorieten pagina
function voegToeAanFavorieten(pokemon) {
  const favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];

  if (favorieten.some(fav => fav.name === pokemon.name)) {
    return;
  }

  favorieten.push(pokemon);
  localStorage.setItem('favorieten', JSON.stringify(favorieten));
  toonFavorieten();
}

//pokemons kunnen verwijderen uit de favorieten pagina
function verwijderFavoriet(naam) {
  let favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];
  favorieten = favorieten.filter(p => p.name !== naam);
  localStorage.setItem('favorieten', JSON.stringify(favorieten));
  toonFavorieten();
}

//de favorieten pagina maken waarin de pokemons worden weergegeven + hun details
function toonFavorieten() {
  const lijst = document.getElementById('favorieten');
  lijst.innerHTML = '';

  const favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];

  favorieten.forEach(pokemon => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p><strong>${pokemon.name}</strong></p>
      <img src="${pokemon.sprite}" alt="${pokemon.name}" />
      <p><strong>Type(s):</strong> ${pokemon.types}</p>
      <p><strong>Abilities:</strong> ${pokemon.abilities}</p>
      <p><strong>Moves:</strong> ${pokemon.moves}</p>
      <p><strong>Stats:</strong> ${pokemon.stats}</p>
      <button>Verwijder</button>
    `;

    li.querySelector('button').addEventListener('click', () => {
      verwijderFavoriet(pokemon.name);
    });

    lijst.appendChild(li);
  });
}

//de button acties toon alle pokemons en toon favorieten
document.getElementById('Toon-Pokemons').addEventListener('click', () => {
  location.reload();
});

document.getElementById('Toon-Favorieten').addEventListener('click', () => {
  document.getElementById('Pokemon-lijst').style.display = 'none';
  document.getElementById('Favorieten-lijst').style.display = 'block';
  toonFavorieten();
});

// Start
haalPokemonsOp();
toonFavorieten();

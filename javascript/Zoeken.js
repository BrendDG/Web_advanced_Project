//De zoekfunctie zodat pokemons kunnen gevonden worden op basis van naam, type + sorteren van A-Z
document.getElementById('zoek-button').addEventListener('click', () => {
    const zoekterm = document.getElementById('zoek-input').value.toLowerCase();
    const KiesType = document.getElementById('filter').value;
    const GekozenOptie = document.getElementById('Sorteren').value;
  
  
    let gefilterd = allePokemonData.filter(pokemon => {
      const NaamGevonden = pokemon.name.toLowerCase().includes(zoekterm);
      const TypeGevonden = KiesType
        ? pokemon.types.some(t => t.type.name === KiesType)
        : true;
      return NaamGevonden && TypeGevonden;
    });
  
    if (gefilterd.length === 0) {
      alert('Geen Pokémon gevonden met deze zoekcriteria.');
    }
  
    // Sorteer op naam
    if (GekozenOptie === 'az') {
      gefilterd.sort((a, b) => a.name.localeCompare(b.name));
    } else if (GekozenOptie === 'za') {
      gefilterd.sort((a, b) => b.name.localeCompare(a.name));
    }
  
    toonPokemons(gefilterd);
  });
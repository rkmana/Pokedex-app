import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetails(id, pokemonName) {
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    async function downloadPokemon() {
        setIsLoading(true); // Start loading
        try {
            let response;
            if(pokemonName) {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            } else {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            }
            const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`);
            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name),
                similarPokemons: pokemonOfSameTypes.data.pokemon
            });
        } catch(error) {
            console.log('Something went wrong');
        } finally {
            setIsLoading(false); // End loading
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, []);

    return [pokemon, isLoading];
}

export default usePokemonDetails;

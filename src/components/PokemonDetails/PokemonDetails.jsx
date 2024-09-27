import { useParams } from "react-router-dom";
import './PokemonDetails.css';
import usePokemonDetails from "../../hooks/usePokemonDetails";
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'; 

function PokemonDetails({ pokemonName }) {
    const { id } = useParams();
    const [pokemon, isLoading] = usePokemonDetails(id, pokemonName);

    return (
        <div className="pokemon-details-wrapper">
            {isLoading ? <LoadingSpinner /> : (
                <>
            {pokemon.image && (
                <img className="pokemon-details-image" src={pokemon.image} alt={pokemon.name} />
            )}
            <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
            <div className="pokemon-details-info">
                <div>Height: {pokemon.height}</div>
                <div>Weight: {pokemon.weight}</div>
            </div>
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t} className="type-badge">{t}</div>)}
            </div>

            {pokemon.similarPokemons && pokemon.similarPokemons.length > 0 && (
                <div className="similar-pokemons">
                    <h3>More {pokemon.types[0]} Type Pokémon:</h3>
                    <ul className="similar-pokemon-list">
                        {pokemon.similarPokemons.map((p) => (
                            <li key={p.pokemon.url} className="similar-pokemon-item">
                                {p.pokemon.name}
                            </li>
                        ))}
                    </ul>
                </div>

                
            )}

            </>
        )}

        </div>
    );
}

export default PokemonDetails;

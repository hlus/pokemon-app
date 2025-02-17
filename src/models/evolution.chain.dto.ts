interface EvolutionDetails {
  min_level: number;
  needs_overworld_rain: boolean;
  time_of_day: string;
  trigger: {
    name: string;
    url: string;
  };
  turn_upside_down: boolean;
}

interface EvolvesTo {
  evolution_details: EvolutionDetails[];
  evolves_to: EvolvesTo[];
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
}

export interface EvolutionChainDTO {
  baby_trigger_item: null;
  chain: {
    evolution_details: EvolutionDetails[];
    evolves_to: EvolvesTo[];
    is_baby: boolean;
    species: {
      name: string;
      url: string;
    };
  };
  id: number;
}

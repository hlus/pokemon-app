export interface EffectRow {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

export interface PokemonAbilitiesDTO {
  name: string;
  effect_entries: EffectRow[];
  flavor_text_entries: FlavorTextEntry[];
}

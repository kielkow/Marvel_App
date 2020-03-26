export function updateHeroRequest(data) {
  return {
    type: '@hero/UPDATE_HERO_REQUEST',
    payload: { data },
  };
}

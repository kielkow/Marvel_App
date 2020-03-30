export function addRecentHero(updatedRecents) {
  return {
    type: '@user/ADD_RECENT_HERO',
    payload: { updatedRecents },
  };
}

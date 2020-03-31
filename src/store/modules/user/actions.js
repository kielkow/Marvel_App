export function addRecentHero(updatedRecents) {
  return {
    type: '@user/ADD_RECENT_HERO',
    payload: { updatedRecents },
  };
}

export function changePage(page, slice) {
  return {
    type: '@user/CHANGE_PAGE',
    payload: { page, slice },
  };
}

export function changeRecent(recent) {
  return {
    type: '@user/CHANGE_RECENT',
    payload: { recent },
  };
}

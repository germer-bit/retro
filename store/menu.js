export const state = () => ({
    menu: [
      {
        _id: 1,
        label: 'Inicio',
        icon: 'mdi-home',
        path: '/',
    },
    {
        _id: 2,
        label: 'Tecnología',
        icon: 'mdi-store',
        path: '/dashboard/tech',
      },
      {
        _id: 3,
        label: 'Frutas',
        path: '/dashboard/fruits',
      },
    ],
    selectedMenu: localStorage.getItem('selectedMenu') || '/dashboard',
  });
  
  export const mutations = {
  
    setSelectedMenu(state, path) {
      state.selectedMenu = path;
      localStorage.setItem('selectedMenu', path);
    },
  };
  
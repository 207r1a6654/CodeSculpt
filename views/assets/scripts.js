document.addEventListener('DOMContentLoaded', () => {
  function toggleDarkMode() {
      const body = document.body;
      isDarkMode = !isDarkMode;
    
      if (isDarkMode) {
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
      }
    }
    
    document.getElementById('toggle').addEventListener('change', toggleDarkMode);
  
    async function checkInitialDarkMode() {
      const body = document.body;
      isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
      if (isDarkMode) {
        body.classList.add('dark-mode');
        document.getElementById('toggle').checked = true;
      }
      await fetchAndDisplayProjectNames();
    }
    checkInitialDarkMode();
    function updateNavigation(isLoggedIn, username) {
      const navigationList = document.querySelector('header ul');
      navigationList.innerHTML = '';
      const navigationItems = [
        { label: 'Home', link: '#' },
        { label: 'Explore', link: '#' },
      ];
  
      if (isLoggedIn) {
        navigationItems.push({ label: username, link: '/profile' }); // Show username as a link
        navigationItems.push({ label: 'Logout', link: '/logout' });
      } else {
        navigationItems.push({ label: 'Sign In', link: '/login' });
        navigationItems.push({ label: 'Register', link: '/register' });
      }
  
      navigationItems.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.label;
        listItem.appendChild(link);
        navigationList.appendChild(listItem);
      });
    }
  
  const codeEditorFeature = document.getElementById('codeEditorFeature');
    codeEditorFeature.addEventListener('click', () => {
      window.location.href = '/dashboard';
    });

  const codeEditorFeature1 = document.getElementById('codeEditorFeature1');
    codeEditorFeature1.addEventListener('click', () => {
      window.location.href = '/dashboard';
    });
  
  const viewProjects = document.getElementById('viewProjects');
    viewProjects.addEventListener('click', ()=>{
      window.location.href='/my-works';
    });
  });
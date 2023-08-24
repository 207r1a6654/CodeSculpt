document.addEventListener('DOMContentLoaded', () => {
    const getStartedButton = document.getElementById('getStartedButton');
    const popup = document.getElementById('popup');
    const signInButton = document.getElementById('signInButton');
    const registerButton = document.getElementById('registerButton');
    const guestButton = document.getElementById('guestButton');
    const closePopupButton = document.getElementById('closePopupButton');
  
    function showPopup() {
      popup.style.display = 'block';
    }
  
    function hidePopup() {
      popup.style.display = 'none';
    }
  
    function showLoginForm() {
      hidePopup();
      // Redirect to the login page
      window.location.href = '/login';
    }
  
    function showRegisterForm() {
      hidePopup();
      // Redirect to the register page
      window.location.href = '/register';
    }
  
    function showGuestDashboard() {
      hidePopup();
      // Redirect to the guest_dashboard.ejs page
      window.location.href = '/guest_dashboard';
    }
  
    getStartedButton.addEventListener('click', showPopup);
    signInButton.addEventListener('click', showLoginForm);
    registerButton.addEventListener('click', showRegisterForm);
    guestButton.addEventListener('click', showGuestDashboard);
    closePopupButton.addEventListener('click', hidePopup);
  });
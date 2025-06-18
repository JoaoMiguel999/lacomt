document.addEventListener("DOMContentLoaded", () => {
  // 1. Mostrar/Ocultar informações do mapa (se o botão existir no HTML)
  const toggleButton = document.getElementById("toggle-map-info-btn");
  const mapInfo = document.getElementById("map-info");

  if (toggleButton && mapInfo) {
    toggleButton.addEventListener("click", () => {
      const isHidden = mapInfo.style.display === "none" || !mapInfo.style.display;
      mapInfo.style.display = isHidden ? "block" : "none";
      toggleButton.textContent = isHidden ? "Ocultar informações do mapa" : "Mostrar informações do mapa";
    });
  }

  // 2. Submenu Dropdown (ex.: Serviços, Unidades) - Clique abre/fecha
  const submenuDropdownToggles = document.querySelectorAll(".submenu .dropdown-toggle");

  submenuDropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const dropdownMenu = toggle.nextElementSibling;

      if (!dropdownMenu) return;

      // Fecha outros dropdowns abertos
      document.querySelectorAll(".submenu .dropdown-menu.show").forEach(menu => {
        if (menu !== dropdownMenu) {
          menu.classList.remove("show");
        }
      });

      // Alterna o dropdown clicado
      dropdownMenu.classList.toggle("show");
    });
  });

  // 3. Fecha todos os dropdowns se o usuário clicar fora
  document.addEventListener("click", (e) => {
    const isInsideDropdown = e.target.closest(".submenu .dropdown");
    if (!isInsideDropdown) {
      document.querySelectorAll(".submenu .dropdown-menu.show").forEach(menu => {
        menu.classList.remove("show");
      });
    }
  });

  // 4. Sombra no submenu ao rolar a página
  const submenu = document.querySelector(".submenu");
  window.addEventListener("scroll", () => {
    if (!submenu) return;
    if (window.scrollY > 10) {
      submenu.style.boxShadow = "0 4px 15px rgba(0, 68, 148, 0.3)";
      submenu.style.backgroundColor = "#fff";
    } else {
      submenu.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
      submenu.style.backgroundColor = "#fff";
    }
  });

  // 5. Fecha dropdowns ao redimensionar a tela (bugfix mobile)
  window.addEventListener("resize", () => {
    document.querySelectorAll(".submenu .dropdown-menu.show").forEach(menu => {
      menu.classList.remove("show");
    });
  });
});

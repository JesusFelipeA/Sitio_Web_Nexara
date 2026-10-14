/* =========================================================
   NEXARA — script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ---------- Año dinámico ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  const toggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  const closeMenu = () => {
    if (!navLinks || !toggle) return;
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    if (!navLinks || !toggle) return;
    navLinks.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  };

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });

    // Cerrar al pulsar cualquier enlace del menú
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Cerrar al redimensionar a desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) closeMenu();
    });

    // Cerrar al hacer scroll si está abierto
    window.addEventListener("scroll", () => {
      if (navLinks.classList.contains("open")) closeMenu();
    }, { passive: true });
  }

  /* ---------- Toast de contacto (opcional) ---------- */
  const contact = document.getElementById("contactButton");
  const toast = document.getElementById("toast");

  if (contact && toast) {
    contact.addEventListener("click", (event) => {
      event.preventDefault();
      toast.textContent =
        "¡Gracias por tu interés! Configura aquí el correo oficial de NEXARA para recibir mensajes.";
      toast.classList.add("show");
      window.setTimeout(() => toast.classList.remove("show"), 4200);
    });
  }

  /* ---------- Fade-in de secciones ---------- */
  const sections = document.querySelectorAll(
    ".section, .security-band, .cta, .marquee"
  );

  if ("IntersectionObserver" in window && sections.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    sections.forEach((s) => {
      s.style.opacity = "0";
      s.style.transform = "translateY(14px)";
      s.style.transition =
        "opacity 0.7s cubic-bezier(0.22,0.61,0.36,1), transform 0.7s cubic-bezier(0.22,0.61,0.36,1)";
      io.observe(s);
    });
  }
});
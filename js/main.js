/* =========================================================
   DOWNLOAD SETTINGS. Change these when you release a new version.
   Every Download button and every "Version · Size" label on the
   page reads from this object.
   ========================================================= */
const DOWNLOAD_CONFIG = {
  link: "https://github.com/RalphAraune/Gestureboard/releases/latest/download/GestureBoard_Setup_1.0.0.exe",
  version: "1.0.0",
  size: "137 MB",
};

(function () {
  "use strict";

  /* ---------- Apply download config ---------- */
  const metaText = `Version ${DOWNLOAD_CONFIG.version} · ${DOWNLOAD_CONFIG.size} · Windows 10/11 (64-bit)`;
  document.querySelectorAll(".js-download").forEach((a) => { a.href = DOWNLOAD_CONFIG.link; });
  document.querySelectorAll(".js-download-meta").forEach((el) => { el.textContent = metaText; });
  document.querySelectorAll(".js-download-version").forEach((el) => { el.textContent = DOWNLOAD_CONFIG.version; });

  /* ---------- Phone / tablet detection ---------- */
  function isMobileOrTablet() {
    const ua = navigator.userAgent || "";
    if (/Android|iPhone|iPad|iPod|Mobile|Tablet|Silk|Kindle|BlackBerry|Opera Mini|IEMobile/i.test(ua)) return true;
    // iPadOS 13+ reports itself as a Mac
    if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return true;
    if (navigator.userAgentData && navigator.userAgentData.mobile) return true;
    return false;
  }

  /* ---------- Mobile modal ---------- */
  const modal = document.getElementById("mobile-modal");
  const copyBtn = document.getElementById("copy-link");
  const copyStatus = document.getElementById("copy-status");
  let lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    copyStatus.textContent = "";
    copyBtn.textContent = "Copy link";
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    copyBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".js-download").forEach((a) => {
    a.addEventListener("click", (e) => {
      if (isMobileOrTablet()) {
        e.preventDefault();
        closeMenu();
        openModal();
      }
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") {
      // keep focus inside the dialog
      const items = modal.querySelectorAll("button");
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Copies this page's address, so it can be opened on a Windows PC.
  function pageUrl() {
    return window.location.href.split("#")[0];
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  copyBtn.addEventListener("click", async () => {
    const url = pageUrl();
    let ok = false;
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(url); ok = true; } catch (_) { ok = false; }
    }
    if (!ok) ok = fallbackCopy(url);
    if (ok) {
      copyBtn.textContent = "Copied!";
      copyStatus.textContent = "Link copied. Send it to yourself and open it on your PC.";
    } else {
      copyStatus.textContent = "Couldn't copy automatically. Here's the link: " + url;
    }
  });

  /* ---------- Hamburger menu ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (menu.classList.contains("is-open") && !e.target.closest(".nav")) closeMenu();
  });

  window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });

  /* ---------- Light / dark mode ----------
     Dark is the default (matches the desktop app). The visitor's choice
     is remembered in localStorage; the small script in <head> applies it
     before the page paints. */
  const root = document.documentElement;
  const themeBtn = document.querySelector(".theme-toggle");
  const themeText = themeBtn.querySelector(".theme-toggle__text");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const next = theme === "light" ? "dark" : "light";
    const label = `Switch to ${next} mode`;
    themeBtn.setAttribute("aria-label", label);
    themeBtn.title = label;
    themeText.textContent = next === "light" ? "Light mode" : "Dark mode";
    themeMeta.setAttribute("content", theme === "light" ? "#f4f7fd" : "#070f24");
  }

  applyTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");

  themeBtn.addEventListener("click", () => {
    const theme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(theme);
    try { localStorage.setItem("gb-theme", theme); } catch (_) { /* private mode etc. */ }
  });

  /* ---------- Subtle scroll reveal ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-reveal");
    const targets = document.querySelectorAll(".card, .steps li, .gesture, .reqs > div, .install li, .member, .faq details");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -40px 0px" });
    targets.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }
})();

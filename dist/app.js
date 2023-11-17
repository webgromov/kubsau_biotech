(self["webpackChunkbiotech_frontend"] = self["webpackChunkbiotech_frontend"] || []).push([["app"],{

/***/ "./src/app/app.js":
/*!************************!*\
  !*** ./src/app/app.js ***!
  \************************/
/***/ (() => {

window.addEventListener('load', () => {
  // Other JS

  // loader
  const $loader = document.querySelector('#loader');
  setTimeout(() => {
    $loader.classList.add('loaded');
  }, 1000);
  setTimeout(() => {
    $loader.classList.add('closed');
  }, 2500);

  // cap

  const $cap = document.querySelector('#cap');
  window.addEventListener('scroll', e => {
    const y = window.scrollY;
    if (y > 600) {
      $cap.classList.add('scrolled');
    } else {
      $cap.classList.remove('scrolled');
    }
  });
  const $selectBlocks = document.querySelectorAll('.select__list__block');
  const $cursor = document.querySelector('#cursor');
  let lastMouseX;
  let lastMouseY;
  window.addEventListener('mousemove', e => {
    const mouseX = lastMouseX = e.clientX;
    const mouseY = lastMouseY = e.clientY;

    // if (e.target.classList.contains('select__list__block') || e.target.closest('.select__list__block')) {
    //   $cursor.classList.add('active');
    //   moveCursor(mouseX, mouseY, 1);
    // } else {
    //   moveCursor(mouseX, mouseY, 0);
    // }
    moveCursor(mouseX, mouseY, 1);
  });
  function moveCursor(x, y, scale) {
    requestAnimationFrame(() => {
      $cursor.style.transform = `translate(${x - 40}px, ${y - 40}px) scale(${scale})`;
    });
  }
  window.addEventListener('scroll', e => {
    console.log(e);
    $cursor.style.transform = `translate(${lastMouseX - 40}px, ${lastMouseY - 40}px) scale(0)`;
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_babel_polyfill_lib_index_js"], () => (__webpack_exec__("./node_modules/@babel/polyfill/lib/index.js"), __webpack_exec__("./src/app/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=app.js.map
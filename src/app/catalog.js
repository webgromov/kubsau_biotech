import(/* webpackChunkName: "catalog.style" */ '../style/catalog.scss')


window.addEventListener('load', () => {
  const $sidebarToggler = document.querySelector('#catalog-sidebar-title')
  const $catalogForm = document.querySelector('#catalog-form')

  $sidebarToggler.addEventListener('click', e => {
    $catalogForm.classList.toggle('opened')
  })
})
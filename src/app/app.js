import(/* webpackChunkName: "app.style" */ '../style/app.scss')

window.addEventListener('load', () => {
    // Other JS

    // loader
    const $loader = document.querySelector('#loader')
    setTimeout(() => {
      $loader.classList.add('loaded')
    }, 1000)
    setTimeout(() => {
      $loader.classList.add('closed')
    }, 2500)

    //Search
    const $searchInput = document.querySelector('#searchInput')
    $searchInput.addEventListener('click', e => {
      e.preventDefault()
      alert('Поиск ещё в разработке. Попробуйте воспользоваться им позже : )')
    })

    // cap
    const $cap = document.querySelector('#cap')
    window.addEventListener('wheel', e => {
      const y = window.scrollY
      // $cap.classList.add('scrolled')
      // if(e.deltaY > 0) {
      //   $cap.classList.add('scrolled')
      // } else {
      //   $cap.classList.remove('scrolled')
      // }
    })
    const $selectBlocks = document.querySelectorAll('.select__list__block')
    const $cursor = document.querySelector('#cursor')
    let lastMouseX
    let lastMouseY
    // window.addEventListener('mousemove', (e) => {
    //   const mouseX = lastMouseX = e.clientX;
    //   const mouseY = lastMouseY = e.clientY;
    //   requestAnimationFrame(() => {
    //     let scale = 1
    //     const isLink = e.target.nodeName == "A" || e.target.nodeName == "BUTTON" || e.target.nodeName == "INPUT" || e.target.parentNode.nodeName == "A"
    //     scale = isLink ? 0.7 : 1
    //     $cursor.style.backgroundColor = !isLink ? 'rgba(255,255,255,.3)' : 'transparent'
    //     $cursor.style.borderColor = !isLink ? 'transparent' : 'rgba(0,0,0,.3)'
    //     $cursor.style.opacity = 1
    //     $cursor.style.transform = `translate(${mouseX-30}px, ${mouseY-30}px) scale(${scale})`
    //   });
    // });
    // window.addEventListener('scroll', e => {
    //   $cursor.style.opacity = 0
    // })

    // mobile menu
    const $trigger = document.querySelector('#mobile_menu_trigger')
    const $mobileMenu = document.querySelector('#mobile_menu')
    const $closeBtn = document.querySelector('#close_btn')
    $trigger.addEventListener('click', e => {
      $mobileMenu.classList.toggle('active')
    })
    $closeBtn.addEventListener('click', e => {
      $mobileMenu.classList.toggle('active')
    })
})
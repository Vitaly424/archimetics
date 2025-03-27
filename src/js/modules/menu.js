export const menu = () => {
	const DOMString = {
		btnMenu: '.js-button-burger',
		navHeader: '.js-nav-header',
	}

	const btnMenu = document.querySelector(DOMString.btnMenu)
	const navHeader = document.querySelector(DOMString.navHeader)

	btnMenu.addEventListener('click', event => {
		event.target
			.closest('.js-button-burger')
			.classList.toggle('button-burger--active')

		navHeader.classList.toggle('nav-header--active')
	})
}

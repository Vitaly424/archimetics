import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

export const drawingsSliders = () => {
	const DOMString = {
		sliderWrapper: '.js-card-portfolio-drawings-slider-wrapper',
		rootSwiper: '.js-card-portfolio-drawings-slider',
		pagination: '.js-card-portfolio-drawings-pagination',
		navigationNext: '.js-card-portfolio-drawings-button-next',
		navigationPrev: '.js-card-portfolio-drawings-button-prev',
	}

	const sliders = document.querySelectorAll(DOMString.rootSwiper)

	if (!sliders?.length) return

	sliders.forEach(slider => {
		const pagination = slider
			.closest(DOMString.sliderWrapper)
			.querySelector(DOMString.pagination)

		const navigationNext = slider
			.closest(DOMString.sliderWrapper)
			.querySelector(DOMString.navigationNext)

		const navigationPrev = slider
			.closest(DOMString.sliderWrapper)
			.querySelector(DOMString.navigationPrev)

		new Swiper(slider, {
			modules: [Pagination, Navigation],
			slidesPerView: 3,
			spaceBetween: 20,
			pagination: {
				el: pagination,
				clickable: true,
			},
			navigation: {
				nextEl: navigationNext,
				prevEl: navigationPrev,
			},
			effect: 'slide',
			loop: true,
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				769: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		})
	})
}

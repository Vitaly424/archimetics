import Swiper from 'swiper'
import { EffectFade, Pagination } from 'swiper/modules'

export const reviewsSlider = () => {
	const DOMString = {
		rootSwiper: '.js-main-reviews-slider',
		pagination: '.js-main-reviews-pagination',
	}

	const swiper = new Swiper(DOMString.rootSwiper, {
		modules: [Pagination, EffectFade],
		slidesPerView: 3,
		spaceBetween: 30,
		pagination: {
			el: DOMString.pagination,
			clickable: true,
		},
		autoHeight: 'auto',
		loop: true,
		effect: 'slide',
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			640: {
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
		},
	})
}

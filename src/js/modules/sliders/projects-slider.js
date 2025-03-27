import Swiper from 'swiper'
import { EffectFade, Pagination } from 'swiper/modules'

export const projectsSlider = () => {
	const DOMString = {
		rootSwiper: '.js-main-works-slider',
		pagination: '.js-main-works-pagination',
	}

	new Swiper(DOMString.rootSwiper, {
		modules: [Pagination, EffectFade],
		slidesPerView: 3,
		spaceBetween: 30,
		pagination: {
			el: DOMString.pagination,
		},
		effect: 'slide',
		loop: true,

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
				autoplay: false,
			},
		},
		on: {
			resize: function enableOnlyMobile(swiper) {
				if (window.innerWidth >= 1024) {
					swiper.disable()
				} else {
					swiper.enable()
				}
			},
		},
	})
}

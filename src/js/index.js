import 'accordion-js/dist/accordion.min.css'
import 'swiper/css/bundle'

import { telephoneMask } from './modules/telephone-mask'

import { newsSlider } from './modules/sliders/news-slider'
import { projectsSlider } from './modules/sliders/projects-slider'
import { reviewsSlider } from './modules/sliders/reviews-slider'

import { servicesAccordion } from './modules/accordions/services-accordion'

import { menu } from './modules/menu'

import { widget } from './modules/widget'

import { drawingsAccordion } from './modules/accordions/drawings-accordion'
import { blogFilter } from './modules/blog-filter'
import { drawingsSliders } from './modules/sliders/drawings-sliders'

document.addEventListener('DOMContentLoaded', function() {
	projectsSlider()
	reviewsSlider()
	newsSlider()
	drawingsSliders()
	servicesAccordion()
	drawingsAccordion()
	blogFilter()
	menu()
	widget()
	telephoneMask()
})

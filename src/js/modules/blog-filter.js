export const blogFilter = () => {
	const btnFilterOpen = document.querySelector('.js-blog-filter-btn-open')
	const filter = document.querySelector('.js-blog-filter')

	if (!btnFilterOpen || !filter) return

	console.log('Отработало')

	btnFilterOpen.addEventListener('click', () => {
		filter.classList.toggle('blog-filter-form--open')
		btnFilterOpen.classList.toggle('blog-filter__icon--active')
	})
}

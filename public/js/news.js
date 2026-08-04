const searchWrapper = document.getElementById('news-search');
const searchInput = document.getElementById('news-search-input');
const list = document.getElementById('news-list');

if (searchWrapper && searchInput && list) {
	const cards = [...list.querySelectorAll('.news-post-card')];
	const empty = document.getElementById('news-search__empty');
	const status = document.getElementById('news-search__status');

	searchInput.addEventListener('input', () => {
		const query = searchInput.value.trim().toLowerCase();
		let visible = 0;

		cards.forEach(card => {
			const match = !query || (card.dataset.search || '').includes(query);
			card.hidden = !match;
			if (match) visible++;
		});

		const noResults = query.length > 0 && visible === 0;
		if (empty) empty.hidden = !noResults;
		searchWrapper.classList.toggle('has-value', query.length > 0);

		if (status) status.textContent = !query ? '' : noResults ? 'Brak wyników dla podanej frazy.' : `Wyświetlono wyników: ${visible}.`;
	});
}

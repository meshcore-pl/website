module.exports = ({ domain, discordInviteUrl, breadcrumbs, article, faq }) => {
	const organizationId = `${domain}/#organization`;
	const websiteId = `${domain}/#website`;

	const graph = [
		{
			'@type': 'Organization',
			'@id': organizationId,
			name: 'MeshCore Polska',
			description: 'Pierwsza ogólnopolska społeczność skupiona wokół sieci MeshCore, czyli komunikacji radiowej LoRa działającej bez internetu i GSM.',
			url: `${domain}/`,
			logo: { '@type': 'ImageObject', url: `${domain}/images/brand/logo-3-192.jpg`, width: 192, height: 192 },
			email: 'contact@sefinek.net',
			sameAs: [discordInviteUrl, 'https://github.com/meshcore-pl'],
		},
		{
			'@type': 'WebSite',
			'@id': websiteId,
			name: 'MeshCore Polska',
			url: `${domain}/`,
			inLanguage: 'pl-PL',
			publisher: { '@id': organizationId },
		},
	];

	if (breadcrumbs) {
		graph.push({
			'@type': 'BreadcrumbList',
			itemListElement: breadcrumbs.map((item, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: item.name,
				item: `${domain}${item.url}`,
			})),
		});
	}

	if (faq && faq.length) {
		graph.push({
			'@type': 'FAQPage',
			mainEntity: faq.map(f => ({
				'@type': 'Question',
				name: f.question,
				acceptedAnswer: { '@type': 'Answer', text: f.answerHtml },
			})),
		});
	}

	if (article) {
		graph.push({
			'@type': article.type || 'TechArticle',
			headline: article.title,
			description: article.description,
			image: `${domain}/images/brand/banner-og.jpg`,
			datePublished: article.datePublished,
			dateModified: article.dateModified,
			inLanguage: 'pl-PL',
			url: `${domain}${article.url}`,
			author: { '@id': organizationId },
			publisher: { '@id': organizationId },
			mainEntityOfPage: { '@type': 'WebPage', '@id': `${domain}${article.url}` },
		});
	}

	return { '@context': 'https://schema.org', '@graph': graph };
};

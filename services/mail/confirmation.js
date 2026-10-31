const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' };
const escapeHtml = value => value.replace(/[&<>"']/g, char => ESCAPES[char]);

const getLinks = domain => [
	{ label: 'Dokumentacja MeshCore Polska', url: `${domain}/dokumentacja` },
	{ label: 'Dokumentacja techniczna MeshCore (PL)', url: 'https://docs.meshcorepolska.org' },
	{ label: 'Aktualności', url: `${domain}/aktualnosci` },
	{ label: 'Generator regionów', url: `${domain}/generator-regionow` },
	{ label: 'Mapa węzłów', url: 'https://mapa.meshcorepolska.org' },
	{ label: 'Flasher', url: 'https://flasher.meshcore.io' },
	{ label: 'Serwer Discord', url: `${domain}/discord` },
];

module.exports = (username, domain) => {
	const links = getLinks(domain);

	return {
		text: `Witaj ${username}!\n\nPomyślnie otrzymaliśmy Twoją wiadomość. Jeśli masz coś jeszcze do dodania, odpowiedz na tego maila.\n\nPrzydatne linki:\n${links.map(({ label, url }) => `- ${label}: ${url}`).join('\n')}\n\nPozdrawiamy,\nMeshCore Polska (${domain})`,
		html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6">
<p>Witaj ${escapeHtml(username)}!</p>
<p>Pomyślnie otrzymaliśmy Twoją wiadomość. Jeśli masz coś jeszcze do dodania, odpowiedz na tego maila.</p>
<p style="margin-bottom:4px">Przydatne linki:</p>
<ul style="margin:0;padding-left:20px">
${links.map(({ label, url }) => `<li><a href="${url}">${label}</a></li>`).join('\n')}
</ul>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;border-top:1px solid #cccccc">
<tr>
<td style="padding:16px 16px 0 0;vertical-align:middle"><img src="${domain}/images/brand/logo-1-512.jpg" width="80" height="80" alt="MeshCore Polska" style="display:block;border:0;border-radius:8px"></td>
<td style="padding-top:16px;vertical-align:middle">Pozdrawiamy,<br><strong>MeshCore Polska</strong><br><a href="${domain}">${domain.replace(/^https?:\/\//, '')}</a></td>
</tr>
</table>
</div>`,
	};
};

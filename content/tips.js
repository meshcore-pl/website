const tips = [
	'Czy wiesz, że aplikacja MeshCore jest dostępna także na komputery?',
	'Czy wiesz, że Meshtastic powstał już na początku 2020 roku, a konkurencyjny MeshCore dopiero pod koniec 2024 roku?',
	'Czy wiesz, że repeatery zwykle są zasilane ogniwami i panelami słonecznymi, niezależnie od dostawców energii?',
	'Czy wiesz, że ta strona jak i cała dokumentacja jest open source? Kod znajdziesz na GitHubie.',
	'Czy wiesz, że MeshCore Południe (Bielsko-Biała, Śląsk, Małopolska) używa SF6 zamiast SF8 jak reszta Polski?',
	'Czy wiesz, że MeshCore działa bez internetu i zasięgu sieci komórkowej? Wiadomości są przesyłane drogą radiową.',
	'Czy wiesz, że urządzenia klienckie MeshCore nie retransmitują pakietów? Za rozszerzanie zasięgu odpowiadają repeatery.',
	'Czy wiesz, że room serwer przechowuje historię wiadomości?',
	'Czy wiesz, że z MeshCore można korzystać bez telefonu? Obsługują to między innymi urządzenia T-Deck od LilyGO (standalone nodes).',
];

module.exports = {
	tips,
	getRandomTip: () => tips[Math.floor(Math.random() * tips.length)],
};

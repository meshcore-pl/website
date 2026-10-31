const tips = [
	'Czy wiesz, że aplikacja MeshCore jest dostępna także na komputery?',
	'Czy wiesz, że Meshtastic powstał na początku 2020 roku, a konkurencyjny MeshCore dopiero pod koniec 2024?',
	'Czy wiesz, że repeatery zwykle są zasilane ogniwami i panelami słonecznymi, niezależnie od dostawców energii?',
	'Czy wiesz, że kod tej strony jest publicznie dostępny na GitHubie?',
	'Czy wiesz, że MeshCore Południe (Bielsko-Biała, Śląsk, Małopolska) używa SF6 zamiast SF8 jak reszta Polski?',
	'Czy wiesz, że MeshCore działa bez internetu i zasięgu sieci komórkowej? Wiadomości są przesyłane drogą radiową.',
	'Czy wiesz, że domyślnie urządzenia klienckie MeshCore nie retransmitują pakietów? Za rozszerzanie zasięgu odpowiadają repeatery.',
	'Czy wiesz, że room serwer przechowuje historię wiadomości?',
	'Czy wiesz, że z MeshCore można korzystać bez telefonu? Obsługują to między innymi urządzenia T-Deck od LilyGO (standalone nodes).',
	'Czy wiesz, że ta strona działa także offline? Wcześniej odwiedzone podstrony możesz przeglądać bez internetu.',
	'Czy wiesz, że generator regionów przygotuje komendy CLI dla Twojego repeatera oraz zakresy kanałów dla companiona?',
	'Czy wiesz, że regionalizacja pozwala ograniczyć przekazywanie wiadomości kanałowych do wybranego obszaru?',
	'Czy wiesz, że w MeshCore Profiles możesz powiązać swój publiczny profil z urządzeniami i ułatwić innym kontakt?',
	'Czy wiesz, że kontakty i kanały MeshCore można udostępniać za pomocą kodów QR?',
];

module.exports = {
	tips,
	getRandomTip: () => tips[Math.floor(Math.random() * tips.length)],
};

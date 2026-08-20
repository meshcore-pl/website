module.exports = [
	{
		slug: 'meshcore',
		icon: '/images/meshcore/main-512.png',
		title: 'Wszystko o MeshCore',
		description: 'Sprzęt, anteny, konfiguracja. Buduj sieć mesh i wysyłaj wiadomości drogą radiową - bez internetu i zasięgu GSM. Dokumentacja w trakcie prac.',
		pages: [
			{ slug: 'wprowadzenie', title: 'Podstawy i słownik pojęć' },
			{ slug: 'aktualne-presety', title: 'Presety i ustawienia radia' },
			{ slug: 'regionalizacja-wiadomosci', title: 'Regionalizacja wiadomości', hidden: true },
			{ slug: 'noise-floor', title: 'Noise Floor (NF)' },
			{ slug: 'anteny', title: 'Anteny' },
			{ slug: 'profile-meshcore', title: 'Profile MeshCore' },
			{ slug: 'lista-analizatorow', title: 'Lista analizatorów' },
		],
	},
	{
		slug: 'schematy',
		icon: '/images/boards/rak_4631.svg',
		title: 'Schematy',
		description: 'Schematy, mapy pinów i noty katalogowe popularnych płytek oraz podzespołów używanych w sieci MeshCore.',
		pages: [
			{ slug: 'rak19001-rak19003-rak19007', title: 'RAK19001, RAK19003, RAK19007' },
			{ slug: 'heltec-wifi-lora-32-v4', title: 'Heltec WiFi LoRa 32 V4' },
			{ slug: 'heltec-wifi-lora-32-v3', title: 'Heltec WiFi LoRa 32 V3' },
			{ slug: 'xiao-nrf52840', title: 'XIAO nRF52840' },
			{ slug: 'sensecap-meshtracker-x1', title: 'SenseCAP MeshTracker X1' },
			{ slug: 'cn3791-mppt', title: 'Ładowarka solarna CN3791 MPPT' },
			{ slug: 'inr18650-35e', title: 'Ogniwo INR18650-35E' },
			{ slug: 'ebyte-e22p-868m30s', title: 'EBYTE E22P-868M30S' },
		],
	},
	{
		slug: 'discord',
		icon: '/images/brand/logo-1-80.jpg',
		title: 'Serwer Discord',
		description: 'Dokumentacja serwera społecznościowego - miejsce, w którym dzielimy się wiedzą, pomagamy w konfiguracji sprzętu i wspólnie rozwijamy sieć.',
		pages: [
			{ slug: 'wprowadzenie', title: 'O społeczności' },
			{ slug: 'regulamin', title: 'Regulamin serwera' },
		],
	},
	{
		slug: 'spolecznosc',
		icon: '/images/brand/logo-3-80.png',
		title: 'Społeczność',
		description: 'Materiały społeczności MeshCore Polska: loga, banery i inne zasoby graficzne do pobrania i swobodnego użycia.',
		pages: [
			{ slug: 'lista-zmian', title: 'Aktualizacje strony' },
			{ slug: 'nasze-logo', title: 'Materiały graficzne' },
		],
	},
];

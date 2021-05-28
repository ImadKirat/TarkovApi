# Escape From Tarkov Api
Dit is de repo van de projectopdracht van Cloud-APIs. Het onderwerp is de game genaamd Escape From Tarkov.
Deze opdracht bestaat uit een asp.net core API en een Angular client app.
**Naam**: Kirat

## Database model
Het onderwerp is Escape From Tarkov. Hierbij horen een paar entiteiten.
Je hebt Weapons, Attachements Caliber, Round en platform.
Weapons hebben exact 1 caliber en kunnen meerdere attachements hebben.
Een platform heeft exact 1 caliber en meerdere rounds

**Merk op** bij een GET request van alle rounds, kan je ook gebruik maken van searching en sorting.

## tarkov website
Voor je de website kan gebruiken, moet je inloggen. Indien je geen account hebt, kan je je makkelijk registeren.
Zonder ingelogd te zijn kan je ook geen requests doen naar de API die is volledig beveiligd d.m.v. JWT token.
Bij elk wapen krijg je ook een bijbehorende foto tezien. Deze komen van een 3rd party API.

Link naar de 3rd party api: https://developers.google.com/custom-search/v1/overview?hl=en_US

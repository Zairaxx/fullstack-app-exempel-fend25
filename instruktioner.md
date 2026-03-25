För att starta servern (kräver extension JSON Server):

npm install -g json-server (om du inte redan har det installerat)

json-server --watch db.json

API: http://localhost:3000/students

______________________________________________________________

Uppgift 1: HTTP-förfrågningar
Lägg till GET, POST, PUT och DELETE i koden med axios eller fetch.

Testa att hämta, skapa, uppdatera och ta bort elever.


Uppgift 2: Spara listvy

Spara vald listvy i localStorage.
Se till att samma vy visas vid omladdning, även efter att elever skapats, redigerats eller tagits bort.
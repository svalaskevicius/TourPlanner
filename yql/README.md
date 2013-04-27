Notes
=====

https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD

51.507222,-0.1275

&client_id=C3JDUEKQCTL0XS1OU5XCR5ZJ31H4VV15QDJQQMG5ROT3W5XP&client_secret=5AP20WBIZSJMFWRK1EAYKT1AWKFZJFDO1IFSSSELLSDXNARW&v=20130427

getraw 'https://api.foursquare.com/v2/venues/explore?ll=51.507222,-0.1275&client_id=C3JDUEKQCTL0XS1OU5XCR5ZJ31H4VV15QDJQQMG5ROT3W5XP&client_secret=5AP20WBIZSJMFWRK1EAYKT1AWKFZJFDO1IFSSSELLSDXNARW&v=20130427'

How to "Use the yql.storage.admin table to import the environment file"?

Google API Key (server): AIzaSyA5bjOTDsFwUfUXcfV3AJJzbhihYf6UuJI

https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.507222,-0.1275&radius=1000&sensor=false&key=AIzaSyA5bjOTDsFwUfUXcfV3AJJzbhihYf6UuJI

Installation
============

insert into yql.storage.admin (url) values ("http://beebo.org:8090/foursquare.venues.explore.xml");

insert into yql.storage.admin (url) values ("http://beebo.org:8090/env.xml");

-- Supposed to use the environment as defaults, but doesn't...

http://developer.yahoo.com/yql/console/?env=store://0yxbhEjulrECDzp1VZKBcr

use "store://4HF3l7H5liye4v88QSp11N" as foo; select * from foo where ll="51.507222,-0.1275" and client_id="C3JDUEKQCTL0XS1OU5XCR5ZJ31H4VV15QDJQQMG5ROT3W5XP" and client_secret="5AP20WBIZSJMFWRK1EAYKT1AWKFZJFDO1IFSSSELLSDXNARW" and v="20130427";

Set up the tunnel:

ssh mel.beebo.org -vNR '*:8090:localhost:8090'

php -S 0.0.0.0:8090

TODO
====

Figure out how to read the client_id 

Figure out how to get Google working...

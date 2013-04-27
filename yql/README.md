insert into yql.storage.admin (url) values ("http://beebo.org:8090/foursquare.venues.explore.xml");

insert into yql.storage.admin (url) values ("http://beebo.org:8090/env.xml");

-- Supposed to use the environment as defaults, but doesn't...

http://developer.yahoo.com/yql/console/?env=store://0yxbhEjulrECDzp1VZKBcr

use "store://4HF3l7H5liye4v88QSp11N" as foo; select * from foo where ll="51.507222,-0.1275" and client_id="C3JDUEKQCTL0XS1OU5XCR5ZJ31H4VV15QDJQQMG5ROT3W5XP" and client_secret="5AP20WBIZSJMFWRK1EAYKT1AWKFZJFDO1IFSSSELLSDXNARW" and v="20130427";

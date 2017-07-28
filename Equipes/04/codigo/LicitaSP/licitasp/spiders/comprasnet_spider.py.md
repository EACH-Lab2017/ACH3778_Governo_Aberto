# Spider: Comprasnet

This is a spider of [Compras Governamentais](http://www.comprasgovernamentais.gov.br/) (a.k.a. *Comprasnet*) website. It parses only the daily updates, so should run once each day.

## Imports

Regular expressions module.
```python
import re
```

Date manipulation module.
```python
from datetime import datetime
```

[Scrapy](https://scrapy.org/doc/) itself.
```python
import scrapy
```

A [Scrapy item](https://docs.scrapy.org/en/latest/topics/items.html) is used, among other things, to be processed by an [item pipeline](https://docs.scrapy.org/en/latest/topics/item-pipeline.html). `Acquisition` is a generic definition to be used by the different spiders.
```python
from licitasp.items import Acquisition
```

## Class header

Our class `ComprasNet` inherits from `scrapy.Spider`. In practice, it means that Scrapy will handle it auto-magically.
```python
class ComprasNet(scrapy.Spider):
```

This is our spider's unique name. It permits us to run the spider from terminal as `scrapy crawl comprasnet` on parent folder.
```python
    name = 'comprasnet'
```

## Starting the scrapper

The first page of daily updates is hard-coded. All the remaining pages will be generated recursively, as [seen below](#obtaining-links-recursively).
```python
    def start_requests(self):
        yield scrapy.Request(url='http://www.comprasnet.gov.br/ConsultaLicitacoes/ConsLicitacaoDia.asp?pagina=1')
```

After that, scrapy will call automatically `parse` callback, being `response` the `start_requests()` return.
```python
    def parse(self, response):
```

## Scrapping current page

Each page contains up to 20 forms. We'll handle each of them individually.
```python
        forms = response.css('form')
        for form in forms:
```

For better understanding the regular expressions below, it's needed to know [Latin-1 hexadecimal (`\x`) escapes](http://cs.stanford.edu/people/miles/iso8859.html#ISO).

Firstly, we'll capture the initial term for the proposals for each acquisition, and convert it to Python's `datetime` type. Here, `date_capture[0]` handles the date in `DD/MM/YYYY` format, while `date_capture[1]` handles the hour (on `00:00`-`23:59` interval).
```python
            date_capture = form.re('<b>Entrega da Proposta:</b>\\xa0(\d{2}/\d{2}/\d{4}) \\xe0s (\d{2}:\d{2})Hs')
            date = datetime.strptime(date_capture[0] + ' ' + date_capture[1], '%d/%m/%Y %H:%M')
```

This is a short description of acquisition, our main object of interest.
```python
            description = re.search('Objeto: (.*?)<br>', form.extract()).group(1).strip()
```

The acquisition modality will be captured by extensive search (i.e. *brute force*).
```python
            modality = form.re('((Convite|Tomada de (P|p)re\\xe7o|Concorr\\xeancia|Concurso|Preg\\xe3o|RDC)( SRP| Internacional| Eletr\\xf4nico| Presencial)*)')[0]
```

A government organization can be divided in sub-organizations, with many levels of hierarchy. We'll get only the first line, containing the more general organization.
```python
            organization = form.css('td')[1].re('<b>(.+?)<br>')[0]
```

This spider's name, for archival purposes.
```python
            source = self.name
```

A link for a page containing more details and downloadables about the acquisition. The URL parameters will be extracted from an original JavaScript call.
```python
            link = 'http://www.comprasnet.gov.br/ConsultaLicitacoes/download/download_editais_detalhe.asp' + form.css('[name="itens"]').re('\'(\?[^\']*)\'')[0].replace('&amp;', '&')
```

Submitting the scrapped informations to [item pipeline](https://docs.scrapy.org/en/latest/topics/item-pipeline.html).
```python
            yield Acquisition(date=date, description=description, modality=modality, organization=organization, source=source, link=link)
```

## Obtaining links recursively

It will only be called if there is signals of the existence of a next page.
```python
        has_next = response.css('[name="proxima"]')
        if has_next:
```

We'll rewrite current URL, replacing `current_page` number by `current_page + 1`.
```python
            current_page = re.search('(\\d+)$', response.url).group(0)
            next_url = response.url.replace(current_page, str(int(current_page) + 1))
```

Then we'll call `parse` callback recursively.
```python
            yield scrapy.Request(url=next_url, callback=self.parse)
```

## References

* [Interactive tutorial about regular expressions](https://regexone.com/)
* [Comprehensive references and test of regular expressions (including Python syntax)](https://regex101.com/)
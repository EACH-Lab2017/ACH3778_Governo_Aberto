# -*- coding: utf-8 -*-

import re
from datetime import datetime
import scrapy
from licitasp.items import Acquisition

# Parser of <comprasnet.gov.br> daily updates.
class ComprasNet(scrapy.Spider):

    name = 'comprasnet'

    def start_requests(self):
        yield scrapy.Request(url='http://www.comprasnet.gov.br/ConsultaLicitacoes/ConsLicitacaoDia.asp?pagina=1')

    def parse(self, response):
        forms = response.css('form')
        for form in forms:
            date_capture = form.re('<b>Entrega da Proposta:</b>\\xa0(\d{2}/\d{2}/\d{4}) \\xe0s (\d{2}:\d{2})Hs')
            date = datetime.strptime(date_capture[0] + ' ' + date_capture[1], '%d/%m/%Y %H:%M')
            description = re.search('Objeto: (.*?)<br>', form.extract()).group(1).strip()
            modality = form.re('((Convite|Tomada de (P|p)re\\xe7o|Concorr\\xeancia|Concurso|Preg\\xe3o|RDC)( SRP| Internacional| Eletr\\xf4nico| Presencial)*)')[0]
            organization = form.css('td')[1].re('<b>(.+?)<br>')[0]
            source = self.name
            link = 'http://www.comprasnet.gov.br/ConsultaLicitacoes/download/download_editais_detalhe.asp' + form.css('[name="itens"]').re('\'(\?[^\']*)\'')[0].replace('&amp;', '&')
            yield Acquisition(date=date, description=description, modality=modality, organization=organization, source=source, link=link)
        has_next = response.css('[name="proxima"]')
        if has_next:
            current_page = re.search('(\\d+)$', response.url).group(0)
            next_url = response.url.replace(current_page, str(int(current_page) + 1))
            yield scrapy.Request(url=next_url, callback=self.parse)

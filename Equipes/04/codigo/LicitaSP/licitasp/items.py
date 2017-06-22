# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy

class Acquisition(scrapy.Item):
    # Date and, if possible, hour of the acquisition
    date = scrapy.Field()
    # Description of acquisition
    description = scrapy.Field()
    # Link to URL containing full info
    link = scrapy.Field()
    # Modality of acquisition e.g. bidding, donation
    modality = scrapy.Field()
    # Organization trying to acquire some product
    organization = scrapy.Field()
    # Source website for the data contained in this class
    source = scrapy.Field()

# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import datetime
import pymongo

class AcquisitionsPipeline(object):

    def __init__(self):
        self.client = None
        self.base = None

    def open_spider(self, spider):
        self.client = pymongo.MongoClient()
        self.base = self.client.licitasp

    def process_item(self, item, spider):
        dict_item = dict(item)
        dict_item['timestamp'] = datetime.datetime.utcnow()
        self.base.acquisitions.insert_one(dict_item)
        print(dict_item)
        return item

    def close_spider(self, spider):
        self.client.close()
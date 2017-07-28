import StringIO
import zipfile
import csv
import urllib2
import pdb

curriculos = csv.DictReader(open('data/NomesDAS16_temLattes_extraido.csv', 'r'))

for curriculo in curriculos:
    # pdb.set_trace()
    id = curriculo['id10']
    name = curriculo['name'].split(' ')[0].lower()

    url = urllib2.urlopen('http://buscacv.cnpq.br/buscacv/rest/download/curriculo/%s' % id)
    zipFile = zipfile.ZipFile(StringIO.StringIO(url.read()))
    curriculoXML = zipFile.read('curriculo.xml')
    zipFile.close()

    file = open('data/cv_xml/%s-%s.xml' % (name,id), 'w')
    file.write(curriculoXML)
    file.close()

    print 'data/cv_xml/%s-%s.xml created!' % (name,id)

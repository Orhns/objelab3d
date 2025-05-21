# Objelab 3D - 3D Baskı Ürünleri

Bu proje, 3D baskı dekoratif ürünlerin sergilenmesi için tasarlanmış modern ve duyarlı bir web sitesidir.

## Özellikler

- Tamamen duyarlı tasarım (mobil uyumlu)
- Modern ve minimal arayüz
- Ürün filtreleme ve arama
- Detaylı ürün görüntüleme
- Kategori bazlı filtreleme
- Fiyat aralığı filtreleme

## Teknolojiler

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome ikonları

## Yönetim Paneli

Ürün yönetimi için Windows Forms uygulaması (`urun_yonetimi` klasöründe) kullanılmaktadır:

- Ürün ekleme/düzenleme/silme
- Kategori yönetimi
- Görsel yükleme
- JSON veri yönetimi

## Kurulum

1. Repository'yi klonlayın:
```bash
git clone https://github.com/kullaniciadi/objelab3d.git
```

2. Web sitesini görüntülemek için bir HTTP sunucusu kullanın:
```bash
python -m http.server 8000
```

3. Tarayıcıda açın:
```
http://localhost:8000
```

## Yönetim Paneli Kullanımı

1. Visual Studio ile `urun_yonetimi/UrunYonetimi.sln` dosyasını açın
2. Projeyi derleyin ve çalıştırın
3. Ürünleri yönetin - değişiklikler otomatik olarak web sitesine yansıyacaktır

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

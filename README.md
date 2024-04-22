
# Anketör

Kullancılar giriş yaparak veya kayıt olarak, uygulama içerisine tanımlanmış açık uçlu,klasik, ve puan vermeli soruları cevaplayarak,anket cevaplarlar.

# Teknik

React Native Context API'ın ne kadar güçlü olduğunu göstermek adına uygulama içerisinde 3. parti bir state management paketi kullanılmamıştır. Uygulama içerisinde bir endpointe istek atarak kullanıcıya giriş yaptıran, daha önce kullanılmamış bir nickname ile hesap oluşturmasını sağlayan bir sistem vardır. Çoklu dil desteği, cihazınızda hali hazırda bulunan dil ile uygulamanın dilini eşleyerek devam eder. Kullanıcı bunu kendi değiştirmek isterse profil sayfasının sağ üst kısmından yapabilir.


## Uygulamanın kurulumu

Uygulamayı cihazınıza klonladıktan sonra paketleri kurmanız gerekmekte.
```bash
# Npm
npm install

# Yarn
yarn install
```
### IOS
```bash

cd ios
pod-install
cd ..
```

### Android

Android tarafında uygulamayı build alırken bir vpn kullanmanız gerekmektedir. Bazı internet sağlayıcılarının limitlerinden dolayı uygulamada kullanılan paketleri indirirken sorun yaşanmaktadır.

## Eklenebilecekler

Kullanıcının cevapladığı testlere tekrardan giriş yaparak, kaç test içerisinde verdiği cevapları görmesi

"react-native" paketi içerisindeki color-scheme ile dark mode eklenmesi

Kullanıcının fotoğraf ekleyebilmesi
if ($ >= 26) {
    getElSamsung.innerHTML = samsungPrice;
    getElIphone.innerHTML = iphonePrice;
} else {
    document.getElementById('descIphone').innerHTML = '<b style="color:red;">Тавара нет в наличии</b>';
    document.getElementById('descSamsung').innerHTML = '<b style="color:red;">Тавара нет в наличии</b>';
}
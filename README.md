Класс XslxToJson принимает xslx файл, сохраненный как xml. Xslx должен содержать такие данные:<br/>
<pre>
    A           B              C       D       E                F<br/>
1   Адрес_г     Адрес_ул       Адрес_д Буква_д Долгота по карте Широта по карте<br/>
2   Владивосток Верхнепортовая 70<br/>
3   ...         ...            ...<br/>
</pre>
Метод convert читает файл и на выходе отдает json. В браузере выполняется javascript код. Создается объект GeocodeYandex, который принимает массив places(это есть json, полученный выше). 
После выполнения всех запросов по yandex api, на странице отображается массив places с заполненными координатами
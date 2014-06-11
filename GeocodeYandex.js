GeocodeYandex = (function($){         
    var GeocodeMapsYandexUrl = "http://geocode-maps.yandex.ru/1.x/";
    
    function GeocodeYandex() {
        this.init.apply(this, arguments);
    }
    
    $.extend(GeocodeYandex.prototype, {
        defaults: {
            interval: 1000
            , places: []
            , start: 1
            , end: 10
        }
        , init: function(options) {
            $.extend(this, this.defaults, options);
        
            this.queueObj = $("<a/>");
            
            this.getGeocodes();
        }
        , getGeocodeForPlace: function(i) {
            if (!this.places[i][0] || !this.places[i][1] || !this.places[i][2]) {
                return;
            }
            var gyObj = this;
            if (arguments.length <= 1) {
                gyObj.queueObj.queue(function() {
                    gyObj.getGeocodeForPlace(i, true);
                });
                return;
            }
            $.ajax({
                url: GeocodeMapsYandexUrl
                , type: "GET"
                , dataType: "json"
                , data: "geocode=" + this.places[i][0] + ",+" + this.places[i][1] + ",+дом+" + this.places[i][2] + (this.places[i][3] ? this.places[i][3] : "") + "&format=json"
                , success: function(json) {
                    var pos = json.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
                    gyObj.places[i][4] = pos.split(" ")[0];
                    gyObj.places[i][5] = pos.split(" ")[1];
                    gyObj.queueObj.dequeue();
                }
                , error: function() {
                    console.error("Произшла ошибка на сервере.");
                    gyObj.queueObj.dequeue();
                }
            })
        }
        , getGeocodes: function() {
            for (var i = 1; i < this.places.length; i++) {
                if (i >= this.start && i <= this.end) {
                    this.getGeocodeForPlace(i);
                }                
            }                
        }
    });
    return GeocodeYandex;
}($));

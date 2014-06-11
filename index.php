<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Получение координат дома.</title>
    </head>
    <body>
        <?php
        include "XslxToJson.php";
        $xtx = new XslxToJson("list.xml");
        $json = $xtx->convert();
        ?>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
        <script src="GeocodeYandex.js"></script>
        <script>
            var gyObj = new GeocodeYandex({
                places: <?php echo $json;?>
            });
            gyObj.queueObj.queue(function() {
                $("pre").append(JSON.stringify(gyObj.places));
            })
        </script>
        <pre></pre>
    </body>
</html>
